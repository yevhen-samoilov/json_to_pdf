import type { ResumeData, ResumeHeaders, ResumeTheme } from "@/app/types/types"

export default function modernResumeTemplate(data: ResumeData, headers: ResumeHeaders, theme: ResumeTheme) {
  const {
    firstName = "",
    lastName = "",
    title = "",
    profileImage = "",
    personalInfo = "",
    contact = [],
    skills = [],
    languages = [],
    highlights = [],
    experiences = [],
    education = [],
    homecity = "",
    homecountry = "",
    currentcity = "",
    phone = "",
    email = "",
    birthdate = "",
    current_address = "",
    is_married = "",
  } = data

  const {
    personalData = "",
    contact: contactHeader = "",
    skillset = "",
    languages: languagesHeader = "",
    experience = "",
    education: educationHeader = "",
  } = headers

  const { primaryColor = "#2A7B8B", fontFamily = "Inter, sans-serif" } = theme

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Modern Resume</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
        body {
          font-family: ${fontFamily};
        }
      </style>
      <script>
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                primary: '${primaryColor}',
              },
              fontFamily: {
                sans: ['${fontFamily.split(",")[0]}', 'sans-serif'],
              },
            },
          },
        }
      </script>
    </head>
    <body class="bg-white">
      <div class="max-w-[210mm] mx-auto bg-white min-h-[297mm] flex shadow-lg">
        <div class="w-[35%] bg-gray-50 p-8 relative">
          ${profileImage ? `<img src="${profileImage}" alt="Profile" class="w-48 h-48 rounded-full mx-auto object-cover mb-8">` : ""}

          ${
            personalInfo || birthdate || homecity || homecountry || is_married
              ? `
          <div class="mb-8">
            <h3 class="font-bold text-lg mb-2">${personalData}</h3>
            <p class="text-sm text-gray-600">
              ${[birthdate, homecity, homecountry, is_married, personalInfo].filter(Boolean).join(", ")}
            </p>
          </div>
          `
              : ""
          }

          ${
            contact.length > 0 || current_address || currentcity || email || phone
              ? `
          <div class="mb-8">
            <h3 class="font-bold text-lg mb-2">${contactHeader}</h3>
            <div class="text-sm text-gray-600">
              <p>${[current_address, currentcity, email, phone, ...contact].filter(Boolean).join(", ")}</p>
            </div>
          </div>
          `
              : ""
          }

          ${
            skills.length > 0
              ? `
          <div class="mb-8">
            <h3 class="font-bold text-lg mb-2">${skillset}</h3>
            <div class="space-y-2">
              ${skills
                .map(
                  (skill: { name: string; level: number }) => `
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">${skill.name}</span>
                  <div class="flex gap-1">
                    ${[...Array(4)]
                      .map(
                        (_, i) => `
                      <div class="w-3 h-3 rounded-full ${i < skill.level ? "bg-primary" : "bg-gray-300"}"></div>
                    `,
                      )
                      .join("")}
                  </div>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
          `
              : ""
          }

          ${
            languages.length > 0
              ? `
          <div>
            <h3 class="font-bold text-lg mb-2">${languagesHeader}</h3>
            <div class="text-sm text-gray-600">
              ${languages.map((lang: string) => `<p>${lang}</p>`).join("")}
            </div>
          </div>
          `
              : ""
          }

          <div class="absolute top-0 right-0 h-full">
            <div class="h-full w-2 bg-primary"></div>
          </div>
        </div>

        <div class="w-[65%] p-8 pl-16">
          ${
            firstName || lastName
              ? `
          <header class="mb-12">
            <h1 class="text-4xl font-bold mb-2">${firstName} ${lastName}</h1>
            ${title ? `<h2 class="text-2xl italic">${title}</h2>` : ""}
          </header>
          `
              : ""
          }

          ${
            highlights.length > 0
              ? `
          <div class="mb-12">
            <ul class="space-y-3 text-sm">
              ${highlights.map((item: string) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          `
              : ""
          }

          ${
            experiences.length > 0 || education.length > 0
              ? `
          <div>
            <h2 class="text-2xl font-bold mb-6">LEBENSLAUF</h2>

            ${
              experiences.length > 0
                ? `
            <div class="mb-8">
              <h3 class="text-lg font-bold mb-4">${experience}</h3>
              ${experiences
                .map(
                  (exp: { period: string; title: string; responsibilities: string[] }) => `
                <div class="mb-4">
                  <div class="grid grid-cols-[120px_1fr] mb-2">
                    <span class="text-xs text-gray-600">${exp.period}</span>
                    <div class="text-sm font-bold">
                      ${exp.title}
                    </div>
                  </div>
                  <ul class="list-disc list-inside text-sm pl-4">
                    ${exp.responsibilities.map((resp: string) => `<li>${resp}</li>`).join("")}
                  </ul>
                </div>
              `,
                )
                .join("")}
            </div>
            `
                : ""
            }

            ${
              education.length > 0
                ? `
            <div>
              <h3 class="text-lg font-bold mb-4">${educationHeader}</h3>
              <div class="space-y-4">
                ${education
                  .map(
                    (edu: { period: string; institution: string; degree?: string }) => `
                  <div class="flex justify-between text-sm">
                    <span>${edu.period}</span>
                    <div>
                      <p class="font-bold">${edu.institution}</p>
                      ${edu.degree ? `<p class="text-primary">${edu.degree}</p>` : ""}
                    </div>
                  </div>
                `,
                  )
                  .join("")}
              </div>
            </div>
            `
                : ""
            }
          </div>
          `
              : ""
          }

          <footer class="text-right text-sm text-gray-500 mt-8">Seite 1 von 1</footer>
        </div>
      </div>
    </body>
    </html>
  `
}

