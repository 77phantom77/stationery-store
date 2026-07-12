# Интернет-магазин канцтоваров

Веб-приложение для продажи канцелярских товаров с каталогом, корзиной, личным кабинетом и админ-панелью.

## Технологии

| Часть | Стек |
|-------|------|
| Клиент | React 19, Vite, React Router |
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

## Требования

- [Node.js](https://nodejs.org/) 18+
- [MongoDB Community](https://www.mongodb.com/try/download/community) — локально на `mongodb://127.0.0.1:27017`

## Установка

```bash
cd client
npm install

cd ../server
npm install
```

## Запуск

Нужны **два терминала** и **запущенная MongoDB**.

### Терминал 1 — сервер

```bash
cd server
npm start
```

Ожидаемый вывод:
```
Server running on port 5000
MongoDB Connected to stationery_store
```

При первом запуске база автоматически заполняется тестовыми данными.

### Терминал 2 — клиент

```bash
cd client
npm run dev
```

Сайт: **http://127.0.0.1:5173**

### Windows (PowerShell)

Если `npm` не запускается из-за политики выполнения скриптов, используйте:

```powershell
npm.cmd run dev
npm.cmd start
```

## API

REST API на порту `5000`:

- `GET/POST/PUT/DELETE /api/products`
- `GET/POST/DELETE /api/categories`
- `GET/POST/PUT/DELETE /api/orders`
- `GET/POST/PUT/DELETE /api/reviews`
- `GET/POST/PUT/DELETE /api/articles`
- `GET/POST/PUT/DELETE /api/promos`
- `GET/PUT /api/settings`

## Что хранится в MongoDB

Товары, категории, заказы, отзывы, статьи, акции, настройки магазина.

Корзина и данные входа хранятся локально в браузере.
