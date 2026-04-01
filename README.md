# Food Delivery App

## Overview

This is a food delivery web application consisting of two main pages:

- Shops page
- Shopping Cart page

The user can browse products, filter them by shop, add items to the cart, manage cart items, and place an order.

---

## Features

### Shops Page

- View list of products
- Filter products by shop:
  - Mc Donny
  - CFK
  - All
- Add products to cart
- Notification when a product is added

### Shopping Cart Page

- View all added products
- Change quantity of each product
- Remove products from cart
- See total price
- Fill checkout form:
  - Name
  - Email
  - Phone
  - Address
- Form validation:
  - All fields are required
  - Email must be valid
- Submit order

---

## Order Flow

1. User adds products to cart
2. Goes to the cart page
3. Fills out the checkout form
4. Clicks "Submit"
5. Order is sent to the backend
6. Order is saved in the database
7. Cart is cleared after successful submission

---

## Tech Stack

### Frontend

- React
- React Router
- JavaScript (ES6)
- HTML / CSS

### Backend

- Node.js
- Express

### Database

- MongoDB

---

## Project Structure

client/
server/

---

## API

### POST /api/order

Saves a new order in the database.

**Request body:**

```json
{
  "customer": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "address": "string"
  },
  "items": [],
  "total": 0
}


How to Run the Project
Backend

cd server
npm install
node server.js

Server runs on:
http://localhost:5000

Frontend
cd client
npm install
npm run dev

Frontend runs on:
http://localhost:5173



Level Completed

Base level requirements are fully implemented:

Two pages (Shops + Cart)
Product listing and filtering
Cart functionality
Quantity management
Product removal
Checkout form with validation
Order submission
Data stored in MongoDB


Notes
Cart data is stored in localStorage
Orders are stored in MongoDB
No admin panel is implemented (not required by base level)
```
