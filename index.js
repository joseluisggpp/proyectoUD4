const express = require('express')
const app = express()
// middleware
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
// Tenemos una variable concesionarios, que es un array de concesionarios. Cada concesionario tiene los atributos nombre,
// dirección y un listado deconcesionarios.
// Cada coche del listado tiene los atributos: el modelo de coche, cv que es la potencia del coche y precio.
// let concesionarios = [{ nombre: "", direccion: "", listCoches: [{modelo:,}] }];
// Creamos el modelo de datos:
let concesionarios = [
  {
    nombre: 'concesionario1',
    direccion: 'Av/Príncipes de España, 23',
    concesionarios: [
      { modelo: 'Toyota', cv: 100, precio: 10000 },
      { modelo: 'Nissan', cv: 120, precio: 15000 }
    ]
  },
  {
    nombre: 'concesionario2',
    direccion: 'Av/Reina Sofía, 22',
    concesionarios: [
      { modelo: 'Golf', cv: 110, precio: 18000 },
      { modelo: 'Passat', cv: 130, precio: 22000 }
    ]
  }
]
// CRUD
app.get('/concesionarios', (request, response) => {
  response.json(concesionarios)
})
app.post('/concesionarios', (request, response) => {
  concesionarios.push(request.body)
  response.json({ message: 'ok' })
})
app.get('/concesionarios/:id', (request, response) => {
  const id = request.params.id
  const result = concesionarios[id]
  response.json({ result })
})
app.put('/concesionarios/:id', (request, response) => {
  const id = request.params.id
  concesionarios[id] = request.body
  response.json({ message: 'ok' })
})
app.delete('/concesionarios/:id', (request, response) => {
  const id = request.params.id
  concesionarios = concesionarios.filter(
    (item, index) => index !== parseInt(id)
  )

  response.json({ message: 'ok' })
})
