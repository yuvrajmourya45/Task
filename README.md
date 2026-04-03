# 💰 Finance Dashboard

A clean and interactive finance dashboard built with **React + Vite**. Users can track their income, expenses and transactions with charts, filters, role-based access, dark mode and more.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open in browser → `http://localhost:5173`

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI framework |
| Vite | 8 | Dev server and build tool |
| Tailwind CSS | 4 | Styling |
| Recharts | 3 | Charts and graphs |
| React Router DOM | 7 | Page routing |
| Context API | built-in | Global state management |

---

## 📋 Assignment Requirements — What I Built

### 1. Dashboard Overview ✅

- **Total Balance Card** — live calculated (Income − Expense)
- **Total Income Card** — sum of all income transactions
- **Total Expenses Card** — sum of all expense transactions
- **Line Chart** — monthly income vs expense trend, grouped by month
- **Pie Chart** — expense breakdown by category

---

### 2. Transactions Section ✅

Assignment required fields: `Date`, `Category`, `Type`, `Amount`

➕ **My Own Addition — Name Field**
The assignment only asked for Date, Category, Type and Amount. I added a `Name` field on my own because without a name, a transaction like "₹500 - Food" tells you nothing. With a name like "Zomato" or "Grocery Store", the user instantly knows what it was. It also makes the **Search feature meaningful** — you can search by name to find any transaction quickly.

**Transaction fields:** Date · Name · Category · Type · Amount

**Features:**
- 🔍 Search by transaction name
- 🔽 Filter by type — Income / Expense
- 🔽 Filter by category — Food, Housing, Entertainment, Utilities, Health, Shopping, Income
- 🔃 Sort by Date (newest first) or Amount (highest first)
- 📱 Mobile view — card layout
- 🖥 Desktop view — table layout

---

### 3. Role Based UI ✅

| Role | What they can do |
|------|-----------------|
| 👁 Viewer | Only see data — no add/edit/delete |
| 🛠 Admin | Add, Edit and Delete transactions |

- Role switcher dropdown is in the **Navbar**
- Add/Edit form and Delete buttons are **hidden for Viewer**, visible only for Admin
- No backend needed — fully simulated on frontend

---

### 4. Insights Section ✅

- 🔥 **Top Spending Category** — which category had the highest total expense
- 📅 **This Month vs Last Month** — expense comparison between current and previous month
- 💰 **Saving Rate %** — calculated as `(income - expense) / income × 100` for the latest month
- 📊 **Total Records** — total number of transactions added

---

### 5. State Management ✅

Single `AppContext` handles all global state:

- Transaction list — add, edit, delete
- Active role — viewer or admin
- Dark mode — on or off
- Search text, type filter, category filter
- Computed values — income, expense, balance (calculated on every render)

Custom hook `useApp()` is used across all components to access context cleanly.

---

## ⭐ Extra Features I Added

These were **optional** in the assignment but I built them to make the dashboard more complete:

| Feature | Details |
|---------|---------|
| 🌙 **Dark Mode** | Toggle button in navbar, all components support `dark:` Tailwind classes |
| 💾 **Local Storage** | Transactions auto-save on every change, data persists on page refresh |
| 🌐 **Mock API** | `fetchTransactions()` in `api.js` simulates a real API call with 800ms delay |
| 📤 **Export CSV** | Downloads all transactions as a `.csv` file |
| 📤 **Export JSON** | Downloads all transactions as a `.json` file |
| 🔔 **Toast Notifications** | Green for success, red for error — auto-hides after 2.5 seconds |
| 📱 **Responsive Navbar** | Hamburger menu on mobile with full nav inside |
| 🚫 **Empty State Handling** | Charts and lists show "No data yet" when there are no transactions |
| ✅ **Form Validation** | Error toast shown if name, amount or date is missing while adding |

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx           — top nav, role switcher, dark mode toggle
│   ├── SummaryCards.jsx     — balance, income, expense cards
│   ├── LineChart.jsx        — monthly income vs expense line chart
│   ├── PieChart.jsx         — category wise spending pie chart
│   ├── TransactionList.jsx  — full list with CRUD, search, filter, sort, export
│   ├── Insights.jsx         — spending insight cards
│   └── Toast.jsx            — success and error notification popup
├── context/
│   └── AppContext.jsx       — global state for entire app
├── data/
│   ├── mockData.js          — mock transaction data
│   └── api.js               — fake async API using setTimeout
└── pages/
    ├── DashboardPage.jsx    — summary cards + charts
    ├── TransactionsPage.jsx — transaction count cards + transaction list
    └── InsightsPage.jsx     — spending insights
```

---

## 📝 Assumptions

- No backend or authentication — roles are frontend only
- All amounts are in Indian Rupees (₹)
- Data persists in browser via `localStorage`
- Mock data is used instead of a real API
