const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./api/routes/routes.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Teste sim;paul",
        description: "Teste para Engenheiro de Software Backend."
    },
    host: "localhost:8080",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
}

swaggerAutogen(outputFile, endpointsFiles, doc)