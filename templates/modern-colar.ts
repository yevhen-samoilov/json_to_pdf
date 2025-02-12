import { ResumeData, ResumeHeaders, ResumeTheme } from "@/app/types/types"

export default function modernCoralTemplate(data: ResumeData, headers: ResumeHeaders, theme: ResumeTheme) {
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
    } = data

    const {
        contact: contactHeader = "",
        skillset = "",
        languages: languagesHeader = "",
        experience = "",
        education: educationHeader = "",
    } = headers

    const { primaryColor = "#FF4D37", fontFamily = "Inter, sans-serif" } = theme

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Modern Coral Resume</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
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
        <div class="max-w-[210mm] mx-auto bg-white min-h-[297mm] flex">
          <div class="w-[35%] bg-primary/10 p-8">
            ${profileImage
            ? `
              <div class="mb-8">
                <img src="${profileImage}" alt="Profile" class="w-48 h-48 rounded-lg mx-auto object-cover shadow-lg">
              </div>
            `
            : ""
        }
  
            <div class="space-y-8">
              <div class="border-b-2 border-primary pb-2">
                <h2 class="text-xl font-bold text-primary uppercase">${contactHeader}</h2>
                <div class="mt-4 space-y-2">
                  ${contact.map((item) => `<p class="text-gray-700">${item}</p>`).join("")}
                </div>
              </div>
  
              ${skills.length > 0
            ? `
                <div class="border-b-2 border-primary pb-2">
                  <h2 class="text-xl font-bold text-primary uppercase">${skillset}</h2>
                  <div class="mt-4 space-y-3">
                    ${skills
                .map(
                    (skill) => `
                      <div>
                        <div class="flex justify-between mb-1">
                          <span class="text-gray-700">${skill.name}</span>
                        </div>
                        <div class="h-2 bg-gray-200 rounded">
                          <div class="h-full bg-primary rounded" style="width: ${(skill.level / 4) * 100}%"></div>
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
  
              ${languages.length > 0
            ? `
                <div class="border-b-2 border-primary pb-2">
                  <h2 class="text-xl font-bold text-primary uppercase">${languagesHeader}</h2>
                  <div class="mt-4 space-y-2">
                    ${languages.map((lang) => `<p class="text-gray-700">${lang}</p>`).join("")}
                  </div>
                </div>
              `
            : ""
        }
            </div>
          </div>
  
          <div class="w-[65%] p-8 pl-12">
            ${firstName || lastName
            ? `
              <header class="mb-8">
                <h1 class="text-5xl font-bold text-primary mb-2">${firstName}<br/>${lastName}</h1>
                ${title
                ? `
                  <div class="relative">
                    <div class="flex items-center gap-4">
                      <span class="text-xl text-gray-600 uppercase">${title}</span>
                      <div class="flex-1 h-px bg-primary/20"></div>
                    </div>
                  </div>
                `
                : ""
            }
              </header>
            `
            : ""
        }
  
            ${personalInfo
            ? `
              <div class="mb-8">
                <p class="text-gray-600">${personalInfo}</p>
              </div>
            `
            : ""
        }
  
            ${highlights.length > 0
            ? `
              <div class="mb-12">
                <h2 class="text-xl font-bold text-primary uppercase mb-4">HIGHLIGHTS</h2>
                <ul class="list-disc list-inside space-y-2">
                  ${highlights.map((item) => `<li class="text-gray-700">${item}</li>`).join("")}
                </ul>
              </div>
            `
            : ""
        }
  
            ${experiences.length > 0
            ? `
              <div class="mb-12">
                <h2 class="text-xl font-bold text-primary uppercase mb-4">${experience}</h2>
                <div class="space-y-6">
                  ${experiences
                .map(
                    (exp) => `
                    <div>
                      <div class="flex items-center gap-4 mb-2">
                        <span class="text-sm text-gray-500">${exp.period}</span>
                        <div class="flex-1 h-px bg-primary/20"></div>
                      </div>
                      <h3 class="font-bold text-gray-800 mb-2">${exp.title}</h3>
                      <ul class="list-disc list-inside text-gray-600">
                        ${exp.responsibilities.map((resp) => `<li>${resp}</li>`).join("")}
                      </ul>
                    </div>
                  `,
                )
                .join("")}
                </div>
              </div>
            `
            : ""
        }
  
            ${education.length > 0
            ? `
              <div>
                <h2 class="text-xl font-bold text-primary uppercase mb-4">${educationHeader}</h2>
                <div class="space-y-4">
                  ${education
                .map(
                    (edu) => `
                    <div>
                      <div class="flex items-center gap-4 mb-2">
                        <span class="text-sm text-gray-500">${edu.period}</span>
                        <div class="flex-1 h-px bg-primary/20"></div>
                      </div>
                      <h3 class="font-bold text-gray-800">${edu.institution}</h3>
                      ${edu.degree ? `<p class="text-gray-600">${edu.degree}</p>` : ""}
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
        </div>
      </body>
      </html>
    `
}

