const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const todoRoutes = express.Router()
const PORT = 4000
const URI = 'mongodb://127.0.0.1:27017/todos'
let Todo = require('./todo.model')

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(URI, { useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', function () {
  console.log('Base de datos MongoDb conectada')
})

todoRoutes.route('/').get(function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err)
    } else {
      res.json(todos)
    }
  })
})

todoRoutes.route('/:id').get(function (req, res) {
  let id = req.params.id
  Todo.findById(id, function (err, todos) {
    if (err) {
      console.log(err)
    } else {
      res.json(todos)
    }
  })
})

todoRoutes.route('/add').post(function (req, res) {
  let todo = new Todo(req.body)
  todo.save()
    .then(todo => {
      res.status(200).json({ 'todo': 'Tarea agregada correctamente' })
    })
    .catch(err => {
      res.status(400).send('Error al agregar tarea', err)
    })
})

todoRoutes.route('/update:id').put(function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) {
      console.log(err)
    } else if (!todo) {
      res.status(404).send('Datos no encontrados')
    } else {
      todo.todo_description = req.body.todo_description
      todo.todo_responsible = req.body.todo_responsible
      todo.todo_priority = req.body.todo_priority
      todo.todo_completed = req.body.todo_completed

      todo.save().then(todo => {
        res.json('Tarea actualizada')
      })
        .catch(err => {
          res.status(400).send('No se pudo actualizar' + err)
        })
    }
  })
})

app.use('/todos', todoRoutes)

app.listen(PORT, function () {
  console.log(`Servidor en puerto: ${PORT}`)
})
