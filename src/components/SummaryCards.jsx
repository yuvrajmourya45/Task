import { useApp } from "../context/AppContext"

function SummaryCards() {

  const { balance, income, expense } = useApp()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

      <div className="bg-blue-500 text-white rounded-xl p-5">
        <p className="text-sm">Total Balance</p>
        <p className="text-2xl font-bold mt-1">₹{balance.toLocaleString()}</p>
      </div>

      <div className="bg-green-500 text-white rounded-xl p-5">
        <p className="text-sm">Total Income</p>
        <p className="text-2xl font-bold mt-1">₹{income.toLocaleString()}</p>
      </div>

      <div className="bg-red-500 text-white rounded-xl p-5">
        <p className="text-sm">Total Expenses</p>
        <p className="text-2xl font-bold mt-1">₹{expense.toLocaleString()}</p>
      </div>

    </div>
  )
}

export default SummaryCards
