# Интернет-магазин канцтоваров

Веб-приложение для продажи канцелярских товаров с каталогом, корзиной, личным кабинетом и админ-панелью.

## Технологии

| Часть | Стек |
|-------|------|
| Клиент | React 19, Vite, React Router, Axios |
| Сервер | Node.js, Express 5, Mongoose |
| База данных | MongoDB |

## Структура проекта

```
stationery-store/
├── client/     — фронтенд (React)
└── server/     — бэкенд (Express + MongoDB)
```

## Функциональность

**Для пользователя:**
- Главная страница, каталог товаров с фильтрацией
- Корзина и оформление заказа
- Регистрация и авторизация, личный профиль
- Статьи, акции, отзывы, контакты

**Админ-панель** (`/admin`):
- Управление товарами и категориями
- Заказы, отзывы, контент (статьи и акции)
- Настройки магазина, статистика

## Запуск проекта

### Требования

- [Node.js](https://nodejs.org/) (версия 18+)
- [MongoDB](https://www.mongodb.com/) (локально на `mongodb://127.0.0.1:27017`)

### 1. Установка зависимостей

```bash
cd client
npm install

cd ../server
npm install
```

### 2. Запуск MongoDB

Убедитесь, что MongoDB запущена. При первом старте сервер автоматически заполнит базу тестовыми данными.

### 3. Запуск сервера

```bash
cd server
node server.js
```

Сервер: `http://localhost:5000`

### 4. Запуск клиента

```bash
cd client
npm run dev
```

Сайт: `http://localhost:5173`

## API

REST API на порту `5000`:

- `GET/POST/PUT/DELETE /api/products`
- `GET/POST/DELETE /api/categories`
- `GET/POST/PUT/DELETE /api/orders`
- `GET/POST/PUT/DELETE /api/reviews`
- `GET/POST/PUT/DELETE /api/articles`
- `GET/POST/PUT/DELETE /api/promos`
- `GET/PUT /api/settings`
