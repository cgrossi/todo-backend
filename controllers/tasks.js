const tasksRouter = require('express').Router();
const Task = require('../models/task');

tasksRouter.get('/', (req, res) => {
  res.json({
    message: 'Hello from express'
  })
})

tasksRouter.post('/', (req, res) => {
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

module.exports = tasksRouter