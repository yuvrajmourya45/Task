import TransactionList from "../components/TransactionList"
import { useApp } from "../context/AppContext"

function TransactionsPage() {

  const { totalIncome, totalExpense, list } = useApp()

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Transactions</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and track all your transactions</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white rounded-xl p-4 text-center shadow">
          <p className="text-3xl font-bold">{list.length}</p>
          <p className="text-sm mt-1 opacity-80">Total Transactions</p>
        </div>
        <div className="bg-green-500 text-white rounded-xl p-4 text-center shadow">
          <p className="text-3xl font-bold">{list.filter(t => t.type === "income").length}</p>
          <p className="text-sm mt-1 opacity-80">Income Entries</p>
        </div>
        <div className="bg-red-500 text-white rounded-xl p-4 text-center shadow">
          <p className="text-3xl font-bold">{list.filter(t => t.type === "expense").length}</p>
          <p className="text-sm mt-1 opacity-80">Expense Entries</p>
        </div>
      </div>

      <TransactionList />

    </div>
  )
}

export default TransactionsPage
