module.exports = (app, db) => {
  app.post('/todos', (req, res) => {
    console.log(req.body)
    res.send('Hello')
  })
}
