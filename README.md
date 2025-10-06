# Simple Shopping Cart

This project is a minimal e-commerce / shopping cart application. Users can:  
- Browse products  
- Search / filter products  
- Add items to a cart  
- Update or remove items in the cart  
- Simulate a checkout / view order summary  

Backend is built using **Node.js + Express**, and the frontend uses **React**. The goal is to demonstrate full-stack CRUD, API integration, and state management.

---

## Features  
- View a list of products  
- Filter products by category or search keyword  
- Add / remove / update product quantities in cart  
- Checkout simulation with an order summary  

---

## Prerequisites  
- Node.js (v14+ or v16+)  
- npm or yarn  

---

## Setup & Running Locally

### Backend  
1. Go into the backend directory:  
   ```bash
   cd backend
2. Install dependencies
   ```bash
   npm install
3. Start the backend server (development mode):
    ```bash
    npm run dev
The backend should then run at http://localhost:5000 (or whichever port you configured).

### Frontend
1. In a separate terminal, go into the frontend directory:
   ```bash
   cd frontend

2. Install dependencies:
    ```bash
    npm install

3. Start the frontend application:
    ```bash
    npm run dev

The frontend will run (by default) at something like http://localhost:5173 (or whichever port your React setup uses).

Once both backend and frontend are running, you can browse your app, add products to cart, and simulate checkout.

### Assumptions & Design Choices

- This is primarily a demonstration / educational project rather than production-ready.

- No actual payments are processed — “checkout” is only a simulation.

- Data persistence may be in-memory or a simple store (depending on your implementation).

- CORS / proxy configuration may be needed since frontend and backend run on different ports.

- State management (for cart, product data) is handled on the client side (e.g. React state, Context, reducers).

- Error handling and validation are minimal for simplicity.
