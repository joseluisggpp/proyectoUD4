// Así es como creamos un modelo en mongoose
const mongoose = require('mongoose')

const concesionarioSchema = new mongoose.Schema({
  nombre: { type: String },
  direccion: { type: String },
  // En mongoose, cada objeto tiene un id asociado. 'coches' es un array de referencias a cada cocheId.
  coches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coche' }]
})
const Concesionario = mongoose.model('Concesionario', concesionarioSchema)
module.exports = Concesionario
