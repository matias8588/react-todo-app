const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const { mongoose } = require('./database')

// Configuración
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Rutas
app.use('/api/tareas', require('./routes/task.routes'))

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

// Inicio de servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor en el puerto ${app.get('port')}`)
})
