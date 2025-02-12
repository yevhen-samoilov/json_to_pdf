import { ResumeData, ResumeHeaders, ResumeTheme } from "@/app/types/types"

export default function classicTemplate(data: ResumeData, headers: ResumeHeaders, theme: ResumeTheme) {
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
        personalData = "Personal Information",
        skillset = "Professional Skills",
        languages: languagesHeader = "Languages",
        experience = "Professional Experience",
        education: educationHeader = "Education",
    } = headers

    const { primaryColor = "#2C3E50", fontFamily = "Georgia, serif" } = theme

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Classic Resume</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');
          body {
            font-family: ${fontFamily};
          }
          .section-title {
            position: relative;
            padding-bottom: 0.5rem;
          }
          .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: ${primaryColor};
            opacity: 0.2;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .page {
              page-break-after: always;
            }
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
                  sans: ['${fontFamily.split(",")[0]}', 'serif'],
                },
              },
            },
          }
        </script>
      </head>
      <body class="bg-white">
        <div id="resume" class="w-[210mm] h-[297mm] mx-auto bg-white p-8 leading-relaxed text-sm">
          <!-- Header Section -->
          <header class="text-center mb-6">
            ${firstName || lastName
            ? `
              <h1 class="text-3xl font-bold text-primary mb-1">${firstName} ${lastName}</h1>
            `
            : ""
        }
            ${title
            ? `
              <h2 class="text-xl text-gray-600 mb-2">${title}</h2>
            `
            : ""
        }
            ${contact.length > 0
            ? `
              <div class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
                ${contact.map((item) => `<span>${item}</span>`).join(" • ")}
              </div>
            `
            : ""
        }
          </header>
  
          <!-- Two-column layout for main content -->
          <div class="flex flex-wrap -mx-4">
            <!-- Left column -->
            <div class="w-full md:w-2/3 px-4">
              <!-- Profile Image and Personal Info -->
              <div class="mb-6 flex items-start gap-4">
                ${profileImage
            ? `
                  <img src="${profileImage}" alt="Profile" class="w-24 h-24 rounded-full object-cover shadow-md">
                `
            : ""
        }
                ${personalInfo
            ? `
                  <div class="flex-1">
                    <h3 class="text-base font-bold text-primary mb-2 section-title">${personalData}</h3>
                    <p class="text-gray-700 leading-snug">${personalInfo}</p>
                  </div>
                `
            : ""
        }
              </div>
  
              <!-- Professional Summary -->
              ${highlights.length > 0
            ? `
                <section class="mb-6">
                  <h3 class="text-base font-bold text-primary mb-2 section-title">Professional Summary</h3>
                  <ul class="list-disc list-inside space-y-1 text-gray-700">
                    ${highlights.map((item) => `<li>${item}</li>`).join("")}
                  </ul>
                </section>
              `
            : ""
        }
  
              <!-- Experience Section -->
              ${experiences.length > 0
            ? `
                <section class="mb-6">
                  <h3 class="text-base font-bold text-primary mb-2 section-title">${experience}</h3>
                  <div class="space-y-4">
                    ${experiences
                .map(
                    (exp) => `
                      <div>
                        <div class="flex justify-between items-baseline mb-1">
                          <h4 class="font-bold text-gray-800">${exp.title}</h4>
                          <span class="text-sm text-gray-600">${exp.period}</span>
                        </div>
                        <ul class="list-disc list-inside text-gray-700 space-y-1">
                          ${exp.responsibilities.map((resp) => `<li>${resp}</li>`).join("")}
                        </ul>
                      </div>
                    `,
                )
                .join("")}
                  </div>
                </section>
              `
            : ""
        }
            </div>
  
            <!-- Right column -->
            <div class="w-full md:w-1/3 px-4">
              <!-- Education Section -->
              ${education.length > 0
            ? `
                <section class="mb-6">
                  <h3 class="text-base font-bold text-primary mb-2 section-title">${educationHeader}</h3>
                  <div class="space-y-3">
                    ${education
                .map(
                    (edu) => `
                      <div>
                        <div class="flex justify-between items-baseline mb-1">
                          <h4 class="font-bold text-gray-800">${edu.institution}</h4>
                          <span class="text-sm text-gray-600">${edu.period}</span>
                        </div>
                        ${edu.degree ? `<p class="text-gray-700">${edu.degree}</p>` : ""}
                      </div>
                    `,
                )
                .join("")}
                  </div>
                </section>
              `
            : ""
        }
  
              <!-- Skills Section -->
              ${skills.length > 0
            ? `
                <section class="mb-6">
                  <h3 class="text-base font-bold text-primary mb-2 section-title">${skillset}</h3>
                  <div class="space-y-2">
                    ${skills
                .map(
                    (skill) => `
                      <div>
                        <div class="flex justify-between mb-1">
                          <span class="text-gray-700">${skill.name}</span>
                          <span class="text-gray-600">
                            ${"★".repeat(skill.level)}${"☆".repeat(4 - skill.level)}
                          </span>
                        </div>
                      </div>
                    `,
                )
                .join("")}
                  </div>
                </section>
              `
            : ""
        }
  
              <!-- Languages Section -->
              ${languages.length > 0
            ? `
                <section class="mb-6">
                  <h3 class="text-base font-bold text-primary mb-2 section-title">${languagesHeader}</h3>
                  <ul class="list-inside text-gray-700 space-y-1">
                    ${languages.map((lang) => `<li>${lang}</li>`).join("")}
                  </ul>
                </section>
              `
            : ""
        }
            </div>
          </div>
        </div>
      </body>
      </html>
    `
}

