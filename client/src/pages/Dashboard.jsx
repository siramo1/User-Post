import Footer from "../components/Footer"
import MainDashboard from "../components/MainDashboard"
import TopNavbar from "../components/TopNavbar"

function Dashboard() {
  
  return (
    <div className="w-full h-full ">
      <TopNavbar />
      <MainDashboard />
      <Footer />
    </div>
  )
}
export default Dashboard