import type { OAS3Options } from "swagger-jsdoc"

const options: OAS3Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Resume to PDF API",
      version: "1.0.0",
      description: "API for generating PDF resumes from JSON data",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./app/api/**/*.ts"], // Путь к файлам с API-маршрутами
}

export default options

