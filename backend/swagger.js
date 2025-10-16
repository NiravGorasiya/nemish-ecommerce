// backend/swagger.js
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
      description: "E-commerce API documentation",
    },
    servers: [
      { url: "http://localhost:5000", description: "Development server" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/router/**/*.js"],
};


const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
