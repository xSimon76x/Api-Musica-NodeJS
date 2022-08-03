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

const testAuthRegisterAdmin = {
  name: "User test",
  age: 20,
  email: "test@test.com",
  role: ["admin"],
  password: "12345678",
};

const testStorageRegister = {
  url: "http://localhost:3001/file-test.mp3",
  filename: "file-test.mp3",
};

const testDataTrack = {
  name: "Ejemplo",
  album: "Ejemplo",
  cover: "http://image.com",
  artist: {
    name: "Ejemplo",
    nickname: "Ejemplo",
    nationality: "VE",
  },
  duration: {
    start: 1,
    end: 3,
  },
  mediaId: "",
};

module.exports = {
  testAuthRegister,
  testAuthLogin,
  testAuthRegisterAdmin,
  testStorageRegister,
  testDataTrack,
};
