const mongoose = require('mongoose')

const cocheSchema = new mongoose.Schema({
  modelo: { type: String },
  cv: { type: Number },
  precio: { type: Number }
})
const Coche = mongoose.model('Coche', cocheSchema)
module.exports = Coche
