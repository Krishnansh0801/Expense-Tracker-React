# 💰 Expense Tracker (React.js)

A modern, responsive Expense Tracking application built with **React.js**. This tool helps users manage their daily finances by tracking expenditures with real-time calculations and data persistence.

## 🚀 Key Features
- **Dynamic Expense Management:** Add and delete expenses with details like Name, Amount, and Category.
- **Data Persistence:** Integrated with **LocalStorage** to ensure data remains saved even after page refreshes.
- **Real-time Calculations:** Automatically calculates the total expenditure using optimized JavaScript array methods (`.reduce()`).
- **Responsive UI:** A clean, user-friendly interface styled with a modern purple theme, fully optimized for all screen sizes.

## 🛠️ Tech Stack
- **Framework:** React.js (Vite)
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Styling:** CSS3 (Flexbox, Responsive Design, Custom Variables)
- **Logic:** ES6+ JavaScript (Map, Filter, Reduce, Spread Operator)
- **Storage:** Browser LocalStorage API

## 💡 How It Works
1. **Input:** User provides the expense name, amount, and selects a category.
2. **State Update:** Upon clicking 'Add', the app updates the state using the Spread Operator to maintain immutability.
3. **Persistence:** The `useEffect` hook monitors changes in the expense list and syncs them with LocalStorage.
4. **Calculations:** The total amount is derived dynamically from the current state, ensuring data accuracy. 
