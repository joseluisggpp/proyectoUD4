const express = require('express')
const router = express.Router()
const Concesionario = require('../modelos/modeloConcesionario')
router.use(express.json())

// Obtener todos los concesionarios
router.get('/', async (req, res) => {
  try {
    const concesionarios = await Concesionario.find()
    res.json(concesionarios)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Crear un nuevo concesionario
router.post('/', async (req, res) => {
  console.log(req.body.nombre)
  const concesionarioCreado = new Concesionario({
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    coches: req.body.coches
  })
  await concesionarioCreado.save()
  res.send(concesionarioCreado)
})

// Obtener un concesionario por ID
router.get('/:id', async (req, res) => {
  try {
    const concesionarioEncontrado = await Concesionario.findOne({
      _id: req.params.id
    })
    if (!concesionarioEncontrado) {
      return res.status(404).json({ message: 'Concesionario no encontrado.' })
    }
    res.json(concesionarioEncontrado)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Actualizar un concesionario por ID
router.put('/:id', async (req, res) => {
  try {
    const concesionarioModificado = await Concesionario.findOneAndUpdate(
      { _id: req.params.id },
      req.body, // Los datos actualizados provienen del cuerpo de la solicitud
      { new: true, runValidators: true }
    )

    if (!concesionarioModificado) {
      return res.status(404).json({ message: 'Concesionario no encontrado.' })
    }

    res.json(concesionarioModificado)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Borrar un concesionario por ID
router.delete('/:id', async (req, res) => {
  try {
    const concesionarioBorrado = await Concesionario.findOneAndDelete({
      _id: req.params.id
    })
    if (!concesionarioBorrado) {
      return res.status(404).json({ message: 'Concesionario no encontrado.' })
    }
    res.json({ message: 'Concesionario eliminado.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
// <-----------------------------------------------------Coches---------------------------------------------------->
// Obtener todos los coches
router.get('/:id/coches', async (req, res) => {
  try {
    const concesionario = await Concesionario.findOne({
      _id: req.params.id
    })
    res.json(concesionario.coches)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Crear un nuevo coche
router.post('/:id/coches', async (req, res) => {
  const concesionario = await Concesionario.findOne({
    _id: req.params.id
  })
  concesionario.coches.push(req.body)
  await concesionario.save()
  res.send(concesionario)
})

// Obtener un coche por ID
router.get('/:id/coches/:idCoche', async (req, res) => {
  try {
    const cocheEncontrado = await Concesionario.findOne({ _id: req.params.id })
    if (!cocheEncontrado) {
      return res.status(404).json({ message: 'Coche no encontrado.' })
    }
    res.json(cocheEncontrado)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Actualizar un coche por ID
router.put('/:id/coches/:idCoche', async (req, res) => {
  try {
    const cocheModificado = await Concesionario.findOneAndUpdate(
      { _id: req.params.id },
      req.body, // Los datos actualizados provienen del cuerpo de la solicitud
      { new: true, runValidators: true }
    )

    if (!cocheModificado) {
      return res.status(404).json({ message: 'Coche no encontrado.' })
    }

    res.json(cocheModificado)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Borrar un coche por ID
router.delete('/:id/coches/:cocheId', async (req, res) => {
  try {
    const cocheBorrado = await Concesionario.findOneAndDelete({
      _id: req.params.id
    })
    if (!cocheBorrado) {
      return res.status(404).json({ message: 'Coche no encontrado.' })
    }
    res.json({ message: 'Coche eliminado.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
