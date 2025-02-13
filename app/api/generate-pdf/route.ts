import { type NextRequest, NextResponse } from "next/server"
import puppeteer from "puppeteer"
import fs from "fs"
import path from "path"
import crypto from "crypto"

// Импортируем шаблоны
import modernResumeTemplate from "../../../templates/modern-resume"
import classicTemplate from "../../../templates/classic"
import modernCoralTemplate from "../../../templates/modern-coral"

// Объект с доступными шаблонами
const templates: { [key: string]: (data: any, headers: any, theme: any) => string } = {
  "modern-resume": modernResumeTemplate,
  "modern-coral": modernCoralTemplate,
  "classic": classicTemplate,
}

// Функция для генерации уникального имени файла
function generateUniqueFileName() {
  return crypto.randomBytes(16).toString("hex") + ".pdf"
}

// Добавляем функцию проверки авторизации
function checkAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false
  }

  const base64Credentials = authHeader.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
  const [username, password] = credentials.split(':')

  return username === 'ausleb' && password === 'r8nSI6XGoZ9iwX'
}

export async function POST(req: NextRequest) {
  // Проверяем авторизацию
  if (!checkAuth(req)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { 
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Protected"'
        }
      }
    )
  }

  try {
    const { data, headers, theme } = await req.json()

    // Проверяем наличие необходимых данных
    if (typeof data !== "object") {
      return NextResponse.json({ error: "Invalid data provided" }, { status: 400 })
    }

    // Проверяем наличие темы
    if (typeof theme !== "object" || !theme.name) {
      return NextResponse.json({ error: "Invalid theme or missing theme name" }, { status: 400 })
    }

    // Проверяем, существует ли запрошенный шаблон
    if (!templates[theme.name]) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    // Проверяем наличие заголовков
    if (headers && typeof headers !== "object") {
      return NextResponse.json({ error: "Invalid headers provided" }, { status: 400 })
    }

    // Если предоставлено полное имя, разделяем его на firstName и lastName
    if (data.name) {
      const nameParts = data.name.split(" ")
      data.firstName = nameParts[0]
      data.lastName = nameParts.slice(1).join(" ")
      delete data.name
    }

    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        '--disable-dev-shm-usage', 
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--font-render-hinting=none',
        '--disable-web-security'
      ],
      // executablePath: '/usr/bin/chromium-browser',
      // executablePath: process.env.CHROME_BIN || undefined,
      timeout: 60000,
    })
    const page = await browser.newPage()

    // Устанавливаем размер viewport как A4
    await page.setViewport({ width: 595, height: 842 })

    // Генерируем HTML-контент, используя выбранный шаблон
    const htmlContent = templates[theme.name](data, headers || {}, theme)

    // Устанавливаем HTML-контент страницы
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    // Ждем, пока Tailwind применит стили
    await page.waitForFunction(() => document.fonts.ready)

    // Дополнительное ожидание для применения стилей
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Генерируем PDF
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    })

    await browser.close()

    // Генерируем уникальное имя файла
    const fileName = generateUniqueFileName()

    // Определяем путь для сохранения файла
    const filePath = path.join(process.cwd(), "public", "pdfs", fileName)

    // Убеждаемся, что директория существует
    fs.mkdirSync(path.dirname(filePath), { recursive: true })

    // Сохраняем PDF-файл
    fs.writeFileSync(filePath, pdf)

    // Формируем URL для скачивания
    const downloadUrl = `/api/download/${fileName}`

    // Возвращаем ссылку на скачивание
    return NextResponse.json({ downloadUrl }, { status: 200 })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}

