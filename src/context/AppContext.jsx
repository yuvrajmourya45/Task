import { createContext, useContext, useState, useEffect } from "react"
import { allTransactions } from "../data/mockData"

const MyContext = createContext()

export function AppProvider({ children }) {

  const [role, setRole] = useState("viewer")
  const [darkMode, setDarkMode] = useState(false)
  const [list, setList] = useState(() => {
    const saved = localStorage.getItem("myTransactions")
    if (saved) return JSON.parse(saved)
    return allTransactions
  })
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [catFilter, setCatFilter] = useState("all")

  useEffect(() => {
    localStorage.setItem("myTransactions", JSON.stringify(list))
  }, [list])

  function addItem(item) {
    setList([...list, item])
  }

  function removeItem(id) {
    const newList = list.filter(item => item.id !== id)
    setList(newList)
  }

  function updateItem(id, newItem) {
    const newList = list.map(item => item.id === id ? newItem : item)
    setList(newList)
  }

  let income = 0
  let expense = 0

  for (let item of list) {
    if (item.type === "income") {
      income = income + item.amount
    } else {
      expense = expense + item.amount
    }
  }

  const balance = income - expense

  return (
    <MyContext.Provider value={{
      role, setRole,
      darkMode, setDarkMode,
      list, addItem, removeItem, updateItem,
      search, setSearch,
      typeFilter, setTypeFilter,
      catFilter, setCatFilter,
      income, expense, balance
    }}>
      {children}
    </MyContext.Provider>
  )
}

export function useApp() {
  return useContext(MyContext)
}
