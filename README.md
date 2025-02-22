Here’s a detailed **README** for your project, combining the project setup, architecture, and launch instructions.  

---

# **🏗️ 21Yard ReactJS TypeScript Project**  

## **📌 Project Overview**  
This project is a **React-based frontend application** built with **TypeScript**. It includes user authentication, profile management, and listing functionality using API endpoints.  

### **🔹 Features**  
✅ **User Registration & Login**  
✅ **Profile Management** (Fetching user details)  
✅ **Listing Page** (Fetching and displaying listings)  
✅ **Pagination & API Integration**  
✅ **React Router for Navigation**  
✅ **Form Handling & Validation**  

---

## **🛠️ Tech Stack**  
- **React 19 + TypeScript** → Core framework  
- **Vite** → Fast development & build tool  
- **React Router v7** → Client-side navigation  
- **Axios** → API requests  
- **React Hook Form + Yup** → Form validation  
- **Tailwind CSS** → Styling  
- **Lucide React & React Icons** → UI Icons  
- **ESLint + TypeScript ESLint** → Code quality  

---

## **📂 Project Structure**  
```
/src
 ├── components/    # Reusable UI components
 ├── pages/         # Application pages (Home, Login, Register, Profile, Listings)
 ├── api/           # API service functions
 ├── utils/         # Utility functions
 ├── App.tsx        # Main application component
 ├── main.tsx       # React entry point
```

---

## **🚀 How to Run the Project**  

### **🔹 1. Install Dependencies**  
```sh
npm install
```

### **🔹 2. Start the Development Server**  
```sh
npm run dev
```
_Open `http://localhost:5173` in the browser._  

### **🔹 3. Build for Production**  
```sh
npm run build
```

### **🔹 4. Preview Production Build**  
```sh
npm run preview
```

---

## **🔗 API Endpoints**  
| Functionality  | Method | Endpoint |
|---------------|--------|----------|
| Register User | `POST` | `/auth/users` |
| Login User    | `POST` | `/auth/users/tokens` |
| Get Profile   | `GET`  | `/auth/users/me` |
| Get Listings  | `GET`  | `/applications/listing` |

---

## **📌 Scripts in `package.json`**  
- **`npm run dev`** → Start development server  
- **`npm run build`** → Build production-ready code  
- **`npm run lint`** → Check code for errors  
- **`npm run preview`** → Preview the production build  

---

# **📖 Описание проекта (На русском 🇷🇺)**  

## **📌 Обзор проекта**  
Этот проект – **фронтенд-приложение на React с TypeScript**. Он включает авторизацию пользователей, управление профилем и отображение списка объектов через API.  

### **🔹 Основные функции**  
✅ **Регистрация и вход пользователей**  
✅ **Отображение профиля пользователя**  
✅ **Страница списка объектов**  
✅ **Пагинация и взаимодействие с API**  
✅ **Навигация через React Router**  
✅ **Валидация форм**  

---

## **🛠️ Используемые технологии**  
- **React 19 + TypeScript** → Основной фреймворк  
- **Vite** → Инструмент сборки  
- **React Router v7** → Маршрутизация  
- **Axios** → Запросы к API  
- **React Hook Form + Yup** → Валидация форм  
- **Tailwind CSS** → Стилизация  
- **Lucide React & React Icons** → Иконки  
- **ESLint + TypeScript ESLint** → Проверка качества кода  

---

## **📂 Структура проекта**  
```
/src
 ├── components/    # UI-компоненты
 ├── pages/         # Страницы приложения (Главная, Вход, Регистрация, Профиль, Объявления)
 ├── api/           # Запросы к API
 ├── utils/         # Утилиты
 ├── App.tsx        # Главный компонент
 ├── main.tsx       # Точка входа React
```

---

## **🚀 Как запустить проект**  

### **🔹 1. Установка зависимостей**  
```sh
npm install
```

### **🔹 2. Запуск сервера разработки**  
```sh
npm run dev
```
_Открыть `http://localhost:5173` в браузере._  

### **🔹 3. Сборка проекта**  
```sh
npm run build
```

### **🔹 4. Предпросмотр продакшен-версии**  
```sh
npm run preview
```

---

## **🔗 API Эндпоинты**  
| Функция  | Метод | Эндпоинт |
|----------|--------|----------|
| Регистрация | `POST` | `/auth/users` |
| Вход       | `POST` | `/auth/users/tokens` |
| Получение профиля | `GET` | `/auth/users/me` |
| Получение списка объявлений | `GET` | `/applications/listing` |

---

## **📌 Скрипты `package.json`**  
- **`npm run dev`** → Запуск сервера разработки  
- **`npm run build`** → Сборка проекта  
- **`npm run lint`** → Проверка кода  
- **`npm run preview`** → Просмотр продакшен-версии  

---
