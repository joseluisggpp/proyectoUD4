const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});
let coches = [{ marca: "Opel", modelo: "Corsa" }];
//Mensaje en la URL Raíz
app.get("/", (request, response) => {
  response.send("¡Hola! Este es el servidor de la API REST.");
});
//CRUD
app.get("/coches", (request, response) => {
  response.json(coches);
});
app.post("/coches", (request, response) => {
  coches.push(request.body);
  response.json({ message: "ok" });
});
app.get("/coches/:id", (request, response) => {
  const id = request.params.id;
  const result = coches[id];
  response.json({ result });
});
app.put("/coches/:id", (request, response) => {
  const id = request.params.id;
  coches[id] = request.body;
  response.json({ message: "ok" });
});
app.delete("/coches/:id", (request, response) => {
  const id = request.params.id;
  coches = coches.filter((item) => coches.indexOf(item) !== parseInt(id));

  response.json({ message: "ok" });
});
// Tenemos una variable concesionarios, que es un array de concesionarios. Cada concesionario tiene los atributos nombre,
// dirección y un listado de coches.
// Cada coche del listado tiene los atributos: el modelo de coche, cv que es la potencia del coche y precio.
// let concesionarios = [{ nombre: "", direccion: "", listCoches: [{modelo:,}] }];
