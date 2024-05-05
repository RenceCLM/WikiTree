const express = require('express')
const { readFile } = require('fs').promises
const browserSync = require('browser-sync') //remove this later


const app = express()
const bs = browserSync.create() //remove this later

app.use(express.static('public'))

app.get('/', async (req, res) => {

    res.send( await readFile( 'routes/index.html', 'utf8' ) )

});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})

// Run Browsersync as a middleware
bs.init({
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*', 'routes/**/*.*'],
    port: 5000,
});