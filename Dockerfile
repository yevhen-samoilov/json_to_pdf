FROM node:18-alpine

WORKDIR /app

# Установка необходимых зависимостей
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    ttf-liberation \
    font-noto-cjk \
    font-noto-emoji \
    fontconfig \
    dbus

# Установка переменных среды для Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    NODE_ENV=development

# Настройка шрифтов
RUN fc-cache -f

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Создаем директорию для PDF файлов и устанавливаем права
RUN mkdir -p public/pdfs && \
    chmod -R 777 public/pdfs

EXPOSE 3030

# Запускаем в режиме разработки
CMD ["npm", "run", "dev"] 