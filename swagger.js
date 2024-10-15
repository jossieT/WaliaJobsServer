const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Walia Job Portal Server',
      description: "API endpoints for Walia Job Portal Server",
      contact: {
        name: "Yosef Teshome",
        email: "joseteshe2017@gmail.com",
        url: "https://github.com/jossieT/WaliaJobsServer"
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:2016/",
        description: "Local server"
      },
      {
        url: "https://walia-jobs-server.onrender.com",
        description: "Live server"
      },
    ]
  },
  // looks for configuration in specified directories
  apis: ['./routes/content/*.js', './routes/user/*.js'],
}
const swaggerSpec = swaggerJsdoc(options)
const swaggerDocs = function (app, port) {
  // Swagger Page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Documentation in JSON format
  // app.get('/docs.json', (req, res) => {
  //   res.setHeader('Content-Type', 'application/json')
  //   res.send(swaggerSpec)
  // })
}
module.exports = {
     swaggerDocs,
}