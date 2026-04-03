import { useState } from "react"
import { useApp } from "../context/AppContext"
import Toast from "./Toast"

function TransactionList() {

  const { list, role, addItem, removeItem, updateItem, search, setSearch, typeFilter, setTypeFilter, catFilter, setCatFilter } = useApp()

  const [sortBy, setSortBy] = useState("date")
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [category, setCategory] = useState("Food")
  const [type, setType] = useState("expense")
  const [msg, setMsg] = useState("")
  const [msgType, setMsgType] = useState("success")

  function showToast(text, t = "success") {
    setMsg(text)
    setMsgType(t)
    setTimeout(() => setMsg(""), 2500)
  }

  function exportCSV() {
    let rows = [["Date", "Name", "Category", "Type", "Amount"]]
    for (let item of list) {
      rows.push([item.date, item.name, item.category, item.type, item.amount])
    }
    let csv = ""
    for (let row of rows) {
      csv = csv + row.join(",") + "\n"
    }
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transactions.csv"
    a.click()
  }

  function exportJSON() {
    const json = JSON.stringify(list, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transactions.json"
    a.click()
  }

  function handleSave(e) {
    e.preventDefault()

    if (!name) { showToast("Please enter a name", "error"); return }
    if (!amount) { showToast("Please enter an amount", "error"); return }
    if (!date) { showToast("Please select a date", "error"); return }

    const newItem = {
      id: Date.now(),
      name: name,
      amount: Number(amount),
      date: date,
      category: category,
      type: type
    }

    if (editId) {
      updateItem(editId, { ...newItem, id: editId })
      setEditId(null)
      showToast("Transaction updated!")
    } else {
      addItem(newItem)
      showToast("Transaction added!")
    }

    setName("")
    setAmount("")
    setDate("")
    setCategory("Food")
    setType("expense")
    setShowForm(false)
  }

  function handleEdit(item) {
    setEditId(item.id)
    setName(item.name)
    setAmount(item.amount)
    setDate(item.date)
    setCategory(item.category)
    setType(item.type)
    setShowForm(true)
  }

  // filter list
  let showList = []
  for (let item of list) {
    const matchName = item.name.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === "all" || item.type === typeFilter
    const matchCat = catFilter === "all" || item.category === catFilter
    if (matchName && matchType && matchCat) {
      showList.push(item)
    }
  }

  // sort list
  if (sortBy === "date") {
    showList.sort((a, b) => new Date(b.date) - new Date(a.date))
  } else if (sortBy === "amount") {
    showList.sort((a, b) => b.amount - a.amount)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">

      <Toast msg={msg} type={msgType} />

      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-gray-700 dark:text-white font-semibold text-base">Transactions</h2>
        <div className="flex flex-wrap gap-2">
          <button onClick={exportCSV} className="bg-green-600 text-white text-xs px-3 py-1.5 rounded hover:bg-green-700">Export CSV</button>
          <button onClick={exportJSON} className="bg-yellow-500 text-white text-xs px-3 py-1.5 rounded hover:bg-yellow-600">Export JSON</button>
          {role === "admin" && (
            <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700">
              {showForm ? "Cancel" : "+ Add"}
            </button>
          )}
        </div>
      </div>

      {/* add/edit form */}
      {showForm && role === "admin" && (
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border rounded px-2 py-1.5 text-sm dark:bg-gray-800 dark:text-white w-full" />
          <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} className="border rounded px-2 py-1.5 text-sm dark:bg-gray-800 dark:text-white w-full" />
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border rounded px-2 py-1.5 text-sm dark:bg-gray-800 dark:text-white w-full" />
          <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded px-2 py-1.5 text-sm dark:bg-gray-800 dark:text-white w-full">
            <option>Food</option>
            <option>Housing</option>
            <option>Entertainment</option>
            <option>Utilities</option>
            <option>Health</option>
            <option>Shopping</option>
            <option>Income</option>
          </select>
          <select value={type} onChange={e => setType(e.target.value)} className="border rounded px-2 py-1.5 text-sm dark:bg-gray-800 dark:text-white w-full">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button type="submit" className="bg-green-600 text-white text-sm px-3 py-1.5 rounded hover:bg-green-700 w-full">
            {editId ? "Update" : "Save"}
          </button>
        </form>
      )}

      {/* filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="border rounded px-2 py-1.5 text-sm dark:bg-gray-800 dark:text-white w-full sm:w-36" />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border rounded px-2 py-1.5 text-sm dark:bg-gray-800 dark:text-white flex-1 sm:flex-none">
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="border rounded px-2 py-1.5 text-sm dark:bg-gray-800 dark:text-white flex-1 sm:flex-none">
          <option value="all">All Categories</option>
          <option>Food</option>
          <option>Housing</option>
          <option>Entertainment</option>
          <option>Utilities</option>
          <option>Health</option>
          <option>Shopping</option>
          <option>Income</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border rounded px-2 py-1.5 text-sm dark:bg-gray-800 dark:text-white flex-1 sm:flex-none">
          <option value="date">Sort: Date</option>
          <option value="amount">Sort: Amount</option>
        </select>
      </div>

      {showList.length === 0 ? (
        <p className="text-center text-gray-400 py-6">No data found.</p>
      ) : (
        <>
          {/* mobile - cards view */}
          <div className="flex flex-col gap-3 sm:hidden">
            {showList.map(item => (
              <div key={item.id} className="border dark:border-gray-700 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold dark:text-white text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.date} • {item.category}</p>
                  </div>
                  <p className={`font-bold text-sm ${item.type === "income" ? "text-green-600" : "text-red-500"}`}>
                    {item.type === "income" ? "+" : "-"}₹{item.amount.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${item.type === "income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {item.type}
                  </span>
                  {role === "admin" && (
                    <div className="flex gap-3">
                      <button onClick={() => handleEdit(item)} className="text-blue-500 text-base">✏️</button>
                      <button onClick={() => { removeItem(item.id); showToast("Deleted!", "error") }} className="text-red-500 text-base">🗑️</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* desktop - table view */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Category</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Amount</th>
                  {role === "admin" && <th className="pb-2">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {showList.map(item => (
                  <tr key={item.id} className="border-b dark:border-gray-700">
                    <td className="py-2 text-gray-500 dark:text-gray-400">{item.date}</td>
                    <td className="py-2 dark:text-white">{item.name}</td>
                    <td className="py-2 text-gray-500 dark:text-gray-400">{item.category}</td>
                    <td className="py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${item.type === "income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className={`py-2 font-semibold ${item.type === "income" ? "text-green-600" : "text-red-500"}`}>
                      {item.type === "income" ? "+" : "-"}₹{item.amount.toLocaleString()}
                    </td>
                    {role === "admin" && (
                      <td className="py-2 flex gap-2">
                        <button onClick={() => handleEdit(item)} title="Edit" className="text-blue-500 hover:text-blue-700 text-base">✏️</button>
                        <button onClick={() => { removeItem(item.id); showToast("Deleted!", "error") }} title="Delete" className="text-red-500 hover:text-red-700 text-base">🗑️</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

    </div>
  )
}

export default TransactionList
