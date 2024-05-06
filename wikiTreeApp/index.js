const express = require('express');
const { readFile } = require('fs').promises;
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// const MAX_LINKS = 1463; // Maximum number of links to send back to the client
const MAX_LINKS = 10000; // Maximum number of links to send back to the client
const FETCH_EXISTING_ARTICLES = false; // Set to true to fetch links for existing articles

// Create a database connection
let db = new sqlite3.Database('./db/nodes.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the nodes database.');
});

// Create the nodes table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS nodes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  article TEXT NOT NULL,
  UNIQUE(name, article)
)`);

app.use(express.static('public'));

app.get('/', async (req, res) => {
    res.send( await readFile( 'routes/index.html', 'utf8' ) )
});

app.get('/text', async (req, res) => {
    res.send( await readFile( 'routes/text.html', 'utf8' ) )
});

// Add a new route to fetch and store links from a Wikipedia article
app.get('/fetch/:article', async (req, res) => {
  const article = req.params.article;

  // Check if the article already exists in the database
  const existingArticle = await new Promise((resolve, reject) => {
    db.get('SELECT * FROM nodes WHERE article = ?', [article], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });

  if (existingArticle && !FETCH_EXISTING_ARTICLES) {
    console.log(`Article ${article} already exists in the database, skipping fetch.`);
  } else {
    let continueParam;
    do {
      // Fetch data from the Wikipedia API
      const response = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          titles: article,
          prop: 'links',
          format: 'json',
          pllimit: 'max',
          plcontinue: continueParam
        }
      });

      const pages = response.data.query.pages;
      const pageId = Object.keys(pages)[0];
      const links = pages[pageId].links;

      if (!links) {
        res.json([]);
        return;
      }

      // Insert the links into the database
      const insertPromises = links.map(link => {
        return new Promise((resolve, reject) => {
          db.run(`INSERT OR IGNORE INTO nodes(name, article) VALUES(?, ?)`, [link.title, article], function(err) {
            if (err) {
              reject(err);
            } else {
              if (this.changes > 0) {
                console.log(`A row has been inserted with [rowid: ${this.lastID}, name: ${link.title}, article: ${article}]`);
              } else {
                console.log(`A row with [name: ${link.title}, article: ${article}] already exists in the database.`);
              }
              resolve();
            }
          });
        });
      });

      await Promise.all(insertPromises);

      continueParam = response.data.continue?.plcontinue;
    } while (continueParam);
  }

  // Retrieve the first MAX_LINKS number of links for the specified article
  db.all('SELECT * FROM nodes WHERE article = ? LIMIT ?', [article, MAX_LINKS], (err, rows) => {
    if (err) {
      throw err;
    }
    const nodes = rows.map(row => ({
      data: {
        id: row.id,
        name: row.name
      }
    }));
    res.json(nodes);
  });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
});

// Don't forget to close the database connection when your app shuts down
process.on('exit', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});