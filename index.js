require('dotenv').config()
const express = require('express')
const app = express()

const Task = require('./models/task')

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from express'
  })
})

app.post('/api/tasks', (req, res) => {
  const body = req.body
  if(body.content) {
    const task = new Task({
      content: req.body.content,
      important: req.body.important || false,
      date: new Date()
    })

    task.save().then(result => {
      return res.json(result)
    })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`)
})
