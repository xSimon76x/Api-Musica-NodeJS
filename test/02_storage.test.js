//*Pruebas de Integración de Storage

const request = require("supertest");
const app = require("../app");
const { tokenSing } = require("../utils/handleJwt");
const { testAuthRegister } = require("./helper/helperData");
const { usersModel, storageModel } = require("../models");

let JWT_TOKEN = "";

const filePath = `${__dirname}/dump/track.mp3`;

beforeAll(async () => {
  await usersModel.deleteMany({});
  await storageModel.deleteMany({});
  const user = await usersModel.create(testAuthRegister);
  JWT_TOKEN = await tokenSing(user);
});

//*? POST STORAGE ITEM - Test post default item
test("[STORAGE] Deberia subir un archivo", async () => {
  const res = await request(app)
    .post("/api/storage")
    .set("Authorization", `Bearer ${JWT_TOKEN}`)
    .attach("myfile", filePath);

  const { body } = res;

  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
  expect(body).toHaveProperty("data.url");
});

//*? GET STORAGE ITEM - Test get detail item
test("[STORAGE] Deberia crear un retorno de todos los archivos", async () => {
  const res = await request(app)
    .get("/api/storage")
    .set("Authorization", `Bearer ${JWT_TOKEN}`);

  const { body } = res;
  expect(res.statusCode).toEqual(200);

  const { data } = body;
  expect(body).toHaveProperty("data");
});

//? GET ONE STORAGE ITEM - Test get detail item
test("debe retornar todo el detalle del item", async () => {
  const { _id } = await storageModel.findOne();
  id = _id.toString();

  const res = await request(app)
    .get(`/api/storage/${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`);

  const { body } = res;

  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
});
