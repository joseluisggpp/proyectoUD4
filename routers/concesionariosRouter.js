const express = require('express')
const router = express.Router()
const Concesionario = require('../modelos/modeloConcesionario')

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
    const concesionarioEncontrado = await Concesionario.findOne({ _id: req.params.id })
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
    const concesionarioBorrado = await Concesionario.findOneAndDelete({ _id: req.params.id })
    if (!concesionarioBorrado) {
      return res.status(404).json({ message: 'Concesionario no encontrado.' })
    }
    res.json({ message: 'Concesionario eliminado.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
