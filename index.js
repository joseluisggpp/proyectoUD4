const express = require('express')
const helmet = require('helmet')
// const swaggerUi = require('swagger-ui-express')
// const swaggerDocument = require('./swagger.json')

const app = express()
// Configuración de swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// Middleware de Helmet
app.use(helmet())
// Incluimos mongoose.
const mongoose = require('mongoose')
// Importamos los modelos en la aplicación.
const Concesionario = require('./modelos/modeloConcesionario')

// Importamos los routers en la aplicación
const concesionariosRouter = require('./routers/concesionariosRouter')
const cochesRouter = require('./routers/cochesRouter')

// Conexión a la base de datos de mongodb.
mongoose
  .connect('mongodb://127.0.0.1:27017/concesionarios-cochesDB')
  .then(() => console.log('Connected!'))
// Utilizamos los routers.
app.use('/concesionarios', concesionariosRouter)
app.use('/concesionarios/:id/coches', cochesRouter)

// middleware de Express
app.use(express.json())
// Iniciar el servidor en el puerto definido como variable de entorno o el 8080
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`)
})
// Mensaje en la URL Raíz
app.get('/', (request, response) => {
  response.send('¡Hola! Este es el servidor de la API REST.')
})
