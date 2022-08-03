const request = require("supertest");
const app = require("../app");
const { usersModel } = require("../models");
const { testAuthLogin, testAuthRegister } = require("./helper/helperData");

//*Pruebas de Integración de Auth (Users)
//Son pruebas que necesitan de un "ente" externo para funcionar, en este caso la base de datos

//*Esto se va a ejecutar antes de las pruebas
//Se borrara o limpiara la data en el modelo de Users, para efectos de pruebas.
beforeAll(async () => {
  await usersModel.deleteMany({});
});

//Borrar los datos del modelo de usuarios, ya que de momento beforeAll, no lo esta haciendo
test("Esto debería retornar 404", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send(testAuthLogin);

  expect(response.statusCode).toEqual(404);
});

test("Esto debería retornar 201", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send(testAuthRegister);

  expect(response.statusCode).toEqual(201);
  expect(response.body).toHaveProperty("data");
  expect(response.body).toHaveProperty("data.token");
  expect(response.body).toHaveProperty("data.user");
});

test("esto deberia de retornar password no valido 401", async () => {
  const newTestAuthLogin = { ...testAuthLogin, password: "22222222" };
  const response = await request(app)
    .post("/api/auth/login")
    .send(newTestAuthLogin);

  expect(response.statusCode).toEqual(401);
});

test("esto deberia de retornar 200 login exitoso", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send(testAuthRegister);

  expect(response.statusCode).toEqual(200);
});
