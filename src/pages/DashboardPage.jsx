import SummaryCards from "../components/SummaryCards"
import MyLineChart from "../components/LineChart"
import MyPieChart from "../components/PieChart"

function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MyLineChart />
        <MyPieChart />
      </div>
    </div>
  )
}

export default DashboardPage
