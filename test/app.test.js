//*Prueba Unitaria
//No necesita de un ente externo para generar esta prueba.
describe("[APP] Esto es una prueba general", () => {
  test("Esto debería retornar 8", () => {
    const a = 4;
    const b = 4;
    const total = 8;

    expect(total).toEqual(8);
  });
});
