const express = require('express')
const { readFile } = require('fs')

const app = express()

app.get('/', (req, res) => {

    readFile('routes/index.html', 'utf8', (err, html) => {
        if (err) {
            res.status(500).send('Sorry, out of order')
        }

        res.send(html)
    })

});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})