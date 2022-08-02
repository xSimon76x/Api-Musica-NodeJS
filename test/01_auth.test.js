const request = require("supertest");
const app = require("../app");
const { usersModel } = require("../models");

//*Pruebas de Integración de Auth (Users)
//Son pruebas que necesitan de un "ente" externo para funcionar, en este caso la base de datos

const testAuthLogin = {
  email: "test123@test.net",
  password: "123456",
};

const testAuthRegister = {
  name: "userTest",
  age: "24",
  email: "testuser@test.cl",
  password: "test123",
};

//*Esto se va a ejecutar antes de las pruebas
//Se borrara o limpiara la data en el modelo de Users, para efectos de pruebas.
beforeAll(async () => {
  await usersModel.deleteMany();
});

describe("[AUTH] Primeras pruebas de /api/auth", () => {
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
});
