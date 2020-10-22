const tasksRouter = require('express').Router();
const Task = require('../models/task');

tasksRouter.get('/', (req, res) => {
  Task.find({})
    .then(tasks => {
      res.json(tasks)
    })
})

tasksRouter.put('/:id', (req, res, next) => {
  const body = req.body
  const task = {
    content: body.content,
    important: body.important
  }

  Task.findByIdAndUpdate(req.params.id, task, {new: true})
    .then(updatedTask => {
      res.json(updatedTask)
    })
    .catch(e => next(e))

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

tasksRouter.delete('/:id', (req, res, next) => {
  Task.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(e => next(e))
})

module.exports = tasksRouter