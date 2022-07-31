const swaggerJsdoc = require("swagger-jsdoc");

/**
 * API Config Info
 */
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Documentacion de mi API, del Curso de Node JS",
    version: "1.0.1",
  },
  servers: [
    {
      url: "http://localhost:3001/api",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      track: {
        type: "object",
        required: ["name", "album", "cover"],
        properties: {
          name: {
            type: "string",
          },
          album: {
            type: "string",
          },
          cover: {
            type: "string",
          },
          artist: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              nickname: {
                type: "string",
              },
              nationality: {
                type: "string",
              },
            },
          },
          duration: {
            type: "object",
            properties: {
              start: {
                type: "interger",
              },
              end: {
                type: "interger",
              },
            },
          },
          mediaId: {
            type: "string",
          },
        },
      },
      storage: {
        type: "object",
        required: ["url", "filenma"],
        properties: {
          url: {
            type: "string",
          },
          filenma: {
            type: "string",
          },
        },
      },
      authRegister: {
        type: "object",
        required: ["name", "age", "email, password"],
        properties: {
          name: {
            type: "string",
          },
          age: {
            type: "string",
          },
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      authLogin: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
    },
  },
};

/**
 * Opciones de configuración
 */
const option = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./routes/*.js"],
};

const openApiConfiguration = swaggerJsdoc(option);

module.exports = openApiConfiguration;
