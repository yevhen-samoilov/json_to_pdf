import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
  const filename = params.filename
  const filePath = path.join(process.cwd(), "public", "pdfs", filename)

  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath)
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": "application/pdf",
      },
    })
  } else {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }
}

