# Stock Trading Web App (React + Tailwind CSS)

This is a responsive stock trading web app built using **React** and **Tailwind CSS**. It includes a basic login system with hardcoded credentials and dynamic UI based on authentication state.

---

## ✨ Features

- 🔐 **Login Functionality**
    - Hardcoded credentials:  
        - Email: `admin@gmail.com`  
        - Password: `admin123`
    - UI elements update based on login status:
        - "Wallet" link and "Buy" button become visible when logged in
        - "Logout" button appears in the navigation bar
        - All are hidden or disabled when logged out

- 🌙 **Dark/Light Mode Toggle**
    - Toggle available in the top navigation
    - Applies theme globally across all routes
    - Fixed issues with dark mode (headings, hover states, etc.)

- 📈 **Top Gainers / Top Losers Section**
    - Displayed on the homepage
    - Fully responsive on **iPad** and **tablet** screen sizes

- 🖼️ **Image Optimization**
    - All images are optimized for fast loading and better performance

---

## 🛠️ Technologies Used

- React (with basic state management)
- Tailwind CSS
- JSX Components
- Responsive Design principles

---

## 🚀 Getting Started

1. Clone the repo:
     ```bash
     https://github.com/rojisharma1968/Stock-Trading-Project.git
     cd stock-trading-app
     ```

2. Install dependencies:
     ```bash
     npm install
     ```

3. Run the development server:
     ```bash
     npm run dev
     ```

4. Open in browser:
     ```
     http://localhost:5173
     ```

---

## 📷 Screenshots

_Add some screenshots here once the UI is ready._

---

## 📦 Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Login.jsx
│   ├── StockDetail.jsx
│   └── ...
├── pages/
│   ├── Home.jsx
│   └── ...
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📌 Notes

- No backend or API integration—only React state is used.
- Make sure to test on various screen sizes (especially tablets).
- Future improvements: API integration, real-time stock data, secure auth, persistent sessions.

---

## 📄 License

MIT ©
