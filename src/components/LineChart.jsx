import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useApp } from "../context/AppContext"

function MyLineChart() {

  const { list } = useApp()

  // group by month
  let monthMap = {}
  for (let item of list) {
    const month = item.date.slice(0, 7) // "2025-01"
    if (!monthMap[month]) {
      monthMap[month] = { month: month, income: 0, expense: 0 }
    }
    if (item.type === "income") {
      monthMap[month].income = monthMap[month].income + item.amount
    } else {
      monthMap[month].expense = monthMap[month].expense + item.amount
    }
  }

  const data = Object.values(monthMap)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
      <h2 className="text-gray-700 dark:text-white font-semibold mb-4">Monthly Income vs Expense</h2>
      {data.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} interval={0} angle={-30} textAnchor="end" height={50} />
            <YAxis tick={{ fontSize: 11 }} width={60} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default MyLineChart
