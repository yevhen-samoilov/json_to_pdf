import { NextResponse } from "next/server"
import swaggerJsdoc from "swagger-jsdoc"
import options from "../../../swagger"

export async function GET() {
  const specs = swaggerJsdoc(options)
  return NextResponse.json(specs)
}

/**
 * @swagger
 * /api/generate-pdf:
 *   post:
 *     summary: Generate a PDF resume
 *     description: Generates a PDF resume based on the provided data, headers, and theme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     example: "Yevhen"
 *                   lastName:
 *                     type: string
 *                     example: "Samoilov"
 *                   title:
 *                     type: string
 *                     example: "Verkäuferin"
 *                   personalInfo:
 *                     type: string
 *                     example: "01.01.1965 in Charkiw, ukrainisch, verheiratet, keine Kinder"
 *                   profileImage:
 *                     type: string
 *                     format: uri
 *                     example: "https://media.istockphoto.com/id/843408508/photo/photography-camera-lens-concept.jpg?s=612x612&w=0&k=20&c=-tm5TKrPDMakrT1vcOE-4Rlyj-iBVdzKuX4viFkd7Vo="
 *                   contact:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Haslacherstr. 123", "79115 Freiburg im Breisgau", "shapkanatali0407@gmail.com", "+380506969967"]
 *                   skills:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         level:
 *                           type: integer
 *                           minimum: 1
 *                           maximum: 4
 *                     example: [{ "name": "Marketingkenntnisse", "level": 3 }, { "name": "Produktpräsentation", "level": 4 }]
 *                   languages:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Deutsch A2-B1", "Ukrainisch Muttersprache", "Russisch Muttersprache"]
 *                   highlights:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Fundierte Kenntnisse in der strategischen und operativen Steuerung", "Qualitätsmanagement und vertriebliche Aufgaben"]
 *                   experiences:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         period:
 *                           type: string
 *                         title:
 *                           type: string
 *                         responsibilities:
 *                           type: array
 *                           items:
 *                             type: string
 *                     example: [{ "period": "Von 1986 bis 2021", "title": "Verkäuferin, Kauffrau und Kassiererin in einem Einkaufszentrum in Charkiw, Ukraine", "responsibilities": ["Kundenberatung", "Produktpräsentation", "Qualitätsmanagement"] }]
 *                   education:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         period:
 *                           type: string
 *                         institution:
 *                           type: string
 *                         degree:
 *                           type: string
 *                     example: [{ "period": "1982 - 1986", "institution": "Diplomkauffrau in Donetsker Institut, Donetsk" }, { "period": "1972 - 1982", "institution": "Realschule in Charkiw, Ukraine", "degree": "Abschluss: Mittlere Reife" }]
 *               headers:
 *                 type: object
 *                 properties:
 *                   personalData:
 *                     type: string
 *                     example: "ПЕРСОНАЛЬНЫЕ ДАННЫЕ"
 *                   contact:
 *                     type: string
 *                     example: "КОНТАКТЫ"
 *                   skillset:
 *                     type: string
 *                     example: "НАВЫКИ"
 *                   languages:
 *                     type: string
 *                     example: "ЯЗЫКИ"
 *                   experience:
 *                     type: string
 *                     example: "ОПЫТ РАБОТЫ"
 *                   education:
 *                     type: string
 *                     example: "ОБРАЗОВАНИЕ"
 *               theme:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "modern-coral"
 *                   primaryColor:
 *                     type: string
 *                     example: "#2A7B8B"
 *                   fontFamily:
 *                     type: string
 *                     example: "Montserrat, sans-serif"
 *     responses:
 *       200:
 *         description: Successfully generated PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 downloadUrl:
 *                   type: string
 *                   example: "/api/download/abcdef1234567890.pdf"
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Template not found
 *       500:
 *         description: Internal server error
 */