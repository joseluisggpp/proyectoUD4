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
// dirección y un listado de concesionarios.
// Cada coche del listado tiene los atributos: el modelo de coche, cv que es la potencia del coche y precio.

// let concesionarios = [{ nombre: "", direccion: "", listCoches: [{modelo:,}],{concesionario2},{concesionario...} }];

// Creamos el modelo de datos:
let concesionarios = [
  {
    nombre: 'concesionario1',
    direccion: 'Av/Príncipes de España, 23',
    coches: [
      { modelo: 'Toyota', cv: 100, precio: 10000 },
      { modelo: 'Nissan', cv: 120, precio: 15000 }
    ]
  },
  {
    nombre: 'concesionario2',
    direccion: 'Av/Reina Sofía, 22',
    coches: [
      { modelo: 'Golf', cv: 110, precio: 18000 },
      { modelo: 'Passat', cv: 130, precio: 22000 }
    ]
  }
]
// <-------------------------------------------------------------------CRUD de Concesionarios------------------------------------------------------------------->
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
  concesionarios = concesionarios.filter((item, index) => index !== parseInt(id))

  response.json({ message: 'ok' })
})
// <----------------------------------------------------------------------CRUD con Coches---------------------------------------------------------------------->

// Devuelve todos los coches del concesionario pasado por id (solo los coches)

app.get('/concesionarios/:id/coches', (request, response) => {
  const id = request.params.id
  const concesionario = concesionarios[id]
  // Si no se encuentra el concesionario especificado por id, devuelve un mensaje de error informando
  // al usuario.
  if (!concesionario) {
    return response.status(404).json({ error: 'Concesionario no encontrado.' })
  }
  // Añadimos al array los coches del concesionario.
  const coches = concesionario.coches
  response.json(coches)
})

// Añade un nuevo coche al concesionario pasado por id.

app.post('/concesionarios/:id/coches', (request, response) => {
  const id = request.params.id
  // Almacenamos en una variable el coche introducido en formato json por el usuario.
  const nuevoCoche = request.body
  // Si no existe el concesionario pasado como parámetro, lanzamos mensaje de error.
  if (!concesionarios[id]) {
    return response.status(404).json({ error: 'Concesionario no encontrado.' })
  }
  // Agrega el nuevo coche al array de coches del concesionario pasado por id usando push().
  concesionarios[id].coches.push(nuevoCoche)
  response.json({ message: 'El coche ha sido añadido al concesionario.' })
})

// Obtiene el coche cuyo id sea cocheId, del concesionario pasado por id

app.get('/concesionarios/:id/coches/:cocheId', (request, response) => {
  const id = request.params.id
  const cocheId = request.params.cocheId
  // Si no existe el concesionario, o no tiene coches, o el coche pasado como parámetro no existe, lanzamos mensaje de error.
  if (!concesionarios[id] || !concesionarios[id].coches || !concesionarios[id].coches[cocheId]) {
    return response.status(404).json({ error: 'Recurso no encontrado.' })
  }
  const coche = concesionarios[id].coches[cocheId]
  response.json({ coche })
})

// Actualiza el coche cuyo id sea cocheId, del concesionario pasado por id

app.put('/concesionarios/:id/coches/:cocheId', (request, response) => {
  const id = request.params.id
  const cocheId = request.params.cocheId
  if (!concesionarios[id] || !concesionarios[id].coches || !concesionarios[id].coches[cocheId]) {
    return response.status(404).json({ error: 'Recurso no encontrado.' })
  }
  concesionarios[id].coches[cocheId] = request.body

  response.json({ message: 'Coche actualizado correctamente.' })
})

// Borra el coche cuyo id sea cocheId, del concesionario pasado por id

app.delete('/concesionarios/:id/coches/:cocheId', (request, response) => {
  const id = request.params.id
  const cocheId = request.params.cocheId
  if (!concesionarios[id] || !concesionarios[id].coches || !concesionarios[id].coches[cocheId]) {
    return response.status(404).json({ error: 'Recurso no encontrado.' })
  }
  // concesionarios = concesionarios.filter((item, index) => index !== parseInt(id))
  concesionarios[id].coches = concesionarios[id].coches.filter((item, index) => index !== parseInt(cocheId))
  response.json({ message: 'Coche eliminado correctamente' })
})
