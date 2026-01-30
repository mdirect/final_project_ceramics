# Build stage
FROM node:22.0.0-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем все зависимости (включая devDependencies для TypeScript)
RUN npm ci

# Копируем исходный код
COPY . .

# Компилируем TypeScript в JavaScript
RUN npm run build

# Копируем database.json в dist папку (TypeScript не копирует JSON файлы автоматически)
RUN mkdir -p dist/db/config && \
    cp src/db/config/database.json dist/db/config/database.json

# Production stage
FROM node:22.0.0-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production

# Копируем скомпилированный код и необходимые файлы из builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist/db/config/database.json ./dist/db/config/database.json

# Открываем порты для API и WebSocket
EXPOSE 3000 3001

# Запускаем приложение
CMD ["npm", "start"]