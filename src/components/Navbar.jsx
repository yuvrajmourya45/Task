import { Link, useLocation } from "react-router-dom"
import { useApp } from "../context/AppContext"
import { useState } from "react"

function Navbar() {

  const { role, setRole, darkMode, setDarkMode } = useApp()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  function navClass(path) {
    if (location.pathname === path) {
      return "text-sm text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
    }
    return "text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600"
  }

  return (
    <div className="bg-white dark:bg-gray-900 shadow px-4 py-3">

      <div className="flex items-center justify-between">
        <h1 className="text-blue-600 font-bold text-lg">💰 FinDash</h1>

        {/* hamburger button for mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden text-gray-600 dark:text-white text-xl">
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* desktop nav */}
        <div className="hidden sm:flex gap-4">
          <Link to="/" className={navClass("/")}>Dashboard</Link>
          <Link to="/transactions" className={navClass("/transactions")}>Transactions</Link>
          <Link to="/insights" className={navClass("/insights")}>Insights</Link>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <select value={role} onChange={e => setRole(e.target.value)} className="text-sm border rounded px-2 py-1 dark:bg-gray-800 dark:text-white">
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={() => setDarkMode(!darkMode)} className="text-sm border rounded px-2 py-1 dark:text-white">
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div className="sm:hidden mt-3 border-t dark:border-gray-700 pt-3 flex flex-col gap-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className={navClass("/")}>🏠 Dashboard</Link>
          <Link to="/transactions" onClick={() => setMenuOpen(false)} className={navClass("/transactions")}>💳 Transactions</Link>
          <Link to="/insights" onClick={() => setMenuOpen(false)} className={navClass("/insights")}>📊 Insights</Link>
          <div className="flex gap-2 mt-1">
            <select value={role} onChange={e => setRole(e.target.value)} className="text-sm border rounded px-2 py-1.5 dark:bg-gray-800 dark:text-white flex-1">
              <option value="viewer">👁 Viewer</option>
              <option value="admin">🛠 Admin</option>
            </select>
            <button onClick={() => setDarkMode(!darkMode)} className="text-sm border rounded px-3 py-1.5 dark:text-white flex-1">
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Navbar
