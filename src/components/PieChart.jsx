import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useApp } from "../context/AppContext"

const colors = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899"]

function MyPieChart() {

  const { list } = useApp()

  // group expenses by category
  let catMap = {}
  for (let item of list) {
    if (item.type === "expense") {
      if (!catMap[item.category]) {
        catMap[item.category] = 0
      }
      catMap[item.category] = catMap[item.category] + item.amount
    }
  }

  const data = Object.keys(catMap).map(key => ({ name: key, value: catMap[key] }))

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
      <h2 className="text-gray-700 dark:text-white font-semibold mb-4">Spending by Category</h2>
      {data.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={80}
              label={false}
            >
              {data.map((item, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(val) => "\u20b9" + val.toLocaleString()} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default MyPieChart
