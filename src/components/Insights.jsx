import { useApp } from "../context/AppContext"

function Insights() {

  const { list } = useApp()

  const onlyExpense = list.filter(item => item.type === "expense")

  let catTotal = {}
  for (let item of onlyExpense) {
    if (catTotal[item.category]) {
      catTotal[item.category] = catTotal[item.category] + item.amount
    } else {
      catTotal[item.category] = item.amount
    }
  }

  let topCat = "N/A"
  let topAmt = 0
  for (let key in catTotal) {
    if (catTotal[key] > topAmt) {
      topAmt = catTotal[key]
      topCat = key
    }
  }

  // group by month
  let monthMap = {}
  for (let item of list) {
    const month = item.date.slice(0, 7)
    if (!monthMap[month]) {
      monthMap[month] = { income: 0, expense: 0 }
    }
    if (item.type === "income") {
      monthMap[month].income = monthMap[month].income + item.amount
    } else {
      monthMap[month].expense = monthMap[month].expense + item.amount
    }
  }

  const months = Object.keys(monthMap).sort()
  const curr = months.length > 0 ? monthMap[months[months.length - 1]] : null
  const last = months.length > 1 ? monthMap[months[months.length - 2]] : null
  const saving = curr && curr.income > 0 ? (((curr.income - curr.expense) / curr.income) * 100).toFixed(1) : "0"

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border-l-4 border-red-400">
        <p className="text-2xl">🔥</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Top Spending Category</p>
        <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">
          {topCat === "N/A" ? "No data yet" : `${topCat} — ₹${topAmt.toLocaleString()}`}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border-l-4 border-yellow-400">
        <p className="text-2xl">📅</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This Month vs Last Month</p>
        <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">
          {curr && last ? `₹${curr.expense.toLocaleString()} vs ₹${last.expense.toLocaleString()}` : "Not enough data"}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border-l-4 border-green-400">
        <p className="text-2xl">💰</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Saving Rate</p>
        <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">{saving}%</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border-l-4 border-blue-400">
        <p className="text-2xl">📊</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Records</p>
        <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">{list.length} items</p>
      </div>

    </div>
  )
}

export default Insights
