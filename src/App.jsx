import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppProvider, useApp } from "./context/AppContext"
import Navbar from "./components/Navbar"
import DashboardPage from "./pages/DashboardPage"
import TransactionsPage from "./pages/TransactionsPage"
import InsightsPage from "./pages/InsightsPage"

function Layout() {
  const { darkMode } = useApp()

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
