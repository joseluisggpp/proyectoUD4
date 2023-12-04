// Así es como creamos un modelo en mongoose
const mongoose = require('mongoose')

const concesionarioSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  direccion: { type: String, require: true },
  // En mongoose, cada objeto tiene un id asociado. 'coches' es un array de referencias a cada cocheId.
  coches: {
    type: [
      {
        modelo: { type: String, require: true },
        cv: { type: Number, require: true },
        precio: { type: Number, require: true }
      }
    ],
    require: true
  }
})
const Concesionario = mongoose.model('Concesionario', concesionarioSchema)
module.exports = Concesionario
