const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000
app.use(bodyParser.json({ extended: true }))
require('./app/routes')(app, {})

app.listen(port, () => console.log(`Backend work on port ${port}`))
