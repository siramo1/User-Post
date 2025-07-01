import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading} = useAuthStore();
  const navigate = useNavigate();

  const inputElement = useRef();
  useEffect(() => {
      inputElement.current.focus();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        await login(email, password);
        navigate('/'); // Redirect to the dashboard or home page after successful login
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center text-amber-50 text-2xl font-bold">
        <form onSubmit={handleLogin} className="bg-gray-500 p-0 rounded-3xl w-full max-w-md"> {/* Removed mb-50, added max-w-md */}
            <h2 className="text-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900 p-4 w-full rounded-t-3xl text-center">Login</h2> {/* Added w-full and rounded-t-3xl */}
            <div className="p-4"> 
                {error && <p className="text-red-500">{error}</p>}
            <label htmlFor="email">Email</label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 my-2 border-2 border-blue-950 rounded" ref={inputElement}/><br/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 my-2 border-2 border-blue-950 rounded" /><br/>
            {isLoading ? 
            <button type="button"className="w-full bg-blue-700 p-2 rounded-lg mt-4">
                Proccessing
            </button> : 
            <button type="submit"className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded-lg mt-4 cursor-pointer">
                Login
            </button>}
            <p className="text-center mt-4">
                Don't have an account? <Link to="/signup" className="text-amber-50 hover:text-blue-200 underline decoration-2 underline-offset-5  p-1 hover:bg-blue-500 rounded font-extrabold">Sign Up</Link>
            </p>
            </div>
        </form>
        </div>
  )
}
export default Login