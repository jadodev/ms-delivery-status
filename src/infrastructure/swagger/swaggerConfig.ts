import { Application } from 'express';
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Delivery Status Service API',
      version: '1.0.0',
      description: 'Documentación de la API para el microservicio Delivery Status',
    },
  },
  apis: ['./src/infrastructure/controller/*.ts'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export function setupSwagger(app: Application): void {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
