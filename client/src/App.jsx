import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import VerifyEmail from "./pages/VerifyEmail";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import AddPost from "./pages/AddPost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserProfile from "./pages/UserProfile";

// PROTECT ADMIN ROUTES
const ProtectedAdminRoutes = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore(); 
    if (!isAuthenticated || !user?.isVerified) {
      return <Navigate to='/' replace />
    }
    return children;
}

// First define all your route components before using them
const ProtectedRoutes = ({ children }) => { 
    const { isAuthenticated } = useAuthStore();

    if(!isAuthenticated) {
      return <Navigate to='/login' replace />
    }
    return children;
}

// Make sure this is defined before App component
const RedirectAuthenticatedUser = ({children}) => {
    const { isAuthenticated } = useAuthStore();
    if (isAuthenticated) {
      return <Navigate to='/' replace />
    }
    return children;
}

// Now define your App component
function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    console.log("User is authenticated");
  }
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <h1>Checking authentication...</h1>;

  return (
    <div className="min-h-screen text-amber-50 flex items-center justify-center relative overflow-hidden text-2xl font-bold">

      <div className="relative z-10 w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/user-profile/:id' element={<ProtectedRoutes><UserProfile /></ProtectedRoutes>} />
          <Route path="/add-post" element={<ProtectedRoutes><AddPost /></ProtectedRoutes>} />
          <Route path="/signup" element={<RedirectAuthenticatedUser><SignupPage /></RedirectAuthenticatedUser>} />
          <Route path="/login" element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
          <Route path="/verify-email" element={<RedirectAuthenticatedUser><VerifyEmail /></RedirectAuthenticatedUser>} />
          <Route path="*" element={<Navigate to="/" />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedAdminRoutes><AdminDashboard /></ProtectedAdminRoutes>} />


        </Routes>
      </div>
    </div>
  )
}

export default App;