import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
    const inputElement = useRef();
    const [ code, setCode ] = useState('');
    const { verifyEmail, isLoading, error } = useAuthStore();
    const navigate = useNavigate()

    useEffect(() => {
      inputElement.current.focus();
    }, [])

    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        try {
            await verifyEmail(code);
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="min-h-screen w-full flex items-center justify-center text-amber-50 text-2xl font-bold">
        <form onSubmit={handleVerifyEmail} className="bg-gray-500 p-0 rounded-3xl w-full max-w-md"> {/* Removed mb-50, added max-w-md */}
            <h2 className="text-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900 p-4 w-full rounded-t-3xl text-center">Verify Your Email</h2> {/* Added w-full and rounded-t-3xl */}
            <div className="p-4"> 
                {error && <p className="text-red-500">{error}</p>}
            <label>code</label>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="w-full p-2 my-2 border-2 border-blue-950 rounded" ref={inputElement} /><br/>
            {isLoading ? 
            <button type="button"className="w-full bg-blue-700 p-2 rounded-lg mt-4">
                Proccessing
            </button> : 
            <button type="submit"className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded-lg mt-4 cursor-pointer">
                verify email
            </button>}
            
            </div>
        </form>
        </div>
  )
}
export default VerifyEmail