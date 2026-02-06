# 💰 Expense Tracker API

A robust, RESTful backend API built with **Node.js** and **Express.js**. This project was developed as part of the **BeTechified Backend Development Track** to master the fundamentals of backend engineering, including the Request-Response cycle, file system persistence, and CRUD operations.

---

## 🚀 Features
- **Full CRUD Functionality:** Create, Read, Update, and Delete expenses.
- **Data Persistence:** Uses a JSON-based local storage system.
- **JSend Specification:** All API responses follow the JSend standard for consistent data delivery.
- **Input Parsing:** Built-in middleware for handling JSON payloads.
- **Environment Configuration:** Secure port management using `dotenv`.

---

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Data Format:** JSON
* **Development Tools:** Nodemon, Postman, Dotenv

---

## 📖 API Documentation

### 1. Get All Expenses
* **URL:** `/api/v1/expenses`
* **Method:** `GET`
* **Response:** `200 OK`

### 2. Get Single Expense
* **URL:** `/api/v1/expenses/:id`
* **Method:** `GET`
* **Response:** `200 OK` or `404 Not Found`

### 3. Add New Expense
* **URL:** `/api/v1/expenses`
* **Method:** `POST`
* **Body:**
```json
{
  "amount": 5000,
  "date": "2026-02-06",
  "category": "Education"
}