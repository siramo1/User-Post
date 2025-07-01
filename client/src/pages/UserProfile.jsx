import Footer from "../components/Footer";
import TopNavbar from "../components/TopNavbar"
import UserProfileBody from "../components/UserProfileBody"

function UserProfile() {
  document.title = "User Profile";
  return (
    <div>
        <TopNavbar />
        <UserProfileBody />
        <Footer />
    </div>
  )
}
export default UserProfile