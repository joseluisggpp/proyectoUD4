const express = require('express')
const router = express.Router()
router.use(express.json())

// Obtener todos los coches
router.get('/', async (req, res) => {
  try {
    const coches = await Coche.find()
    res.json(coches)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Crear un nuevo coche
router.post('/', async (req, res) => {
  const cocheCreado = new Coche({
    modelo: req.body.modelo,
    cv: req.body.cv,
    precio: req.body.precio
  })
  await cocheCreado.save()
  res.send(cocheCreado)
})

// Obtener un coche por ID
router.get('/:id', async (req, res) => {
  try {
    const cocheEncontrado = await Coche.findOne({ _id: req.params.id })
    if (!cocheEncontrado) {
      return res.status(404).json({ message: 'Coche no encontrado.' })
    }
    res.json(cocheEncontrado)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Actualizar un coche por ID
router.put('/:id', async (req, res) => {
  try {
    const cocheModificado = await Coche.findOneAndUpdate(
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
router.delete('/:id', async (req, res) => {
  try {
    const cocheBorrado = await Coche.findOneAndDelete({ _id: req.params.id })
    if (!cocheBorrado) {
      return res.status(404).json({ message: 'Coche no encontrado.' })
    }
    res.json({ message: 'Coche eliminado.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
