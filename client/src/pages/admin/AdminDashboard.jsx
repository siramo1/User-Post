function AdminDashboard() {
  return (
    <div>
        <div className="bg-[#efeded] flex flex-row justify-center w-full min-h-screen">
            <div className="bg-[#efeded] w-full max-w-[1280px] h-[832px] relative overflow-x-scroll">
            <header className="w-full h-[99px] sticky top-0 bg-white flex items-center justify-between px-0">
                <div className="relative w-[81px] h-[82px] ml-0 rounded-full overflow-hidden border-2 border-solid border-black p-2">
                <img src="/path/to/logo.png" alt="Logo" className="w-full h-full"/>
                </div>
                <h1 className="[font-family:'Inter-Medium',Helvetica] font-medium text-black text-[40px] text-center tracking-[0] leading-[normal]">
                Admin Dashboard
                </h1>
                <div className="relative w-[90px] h-[90px] mr-[22px] rounded-full overflow-hidden">
                <img src="/path/to/user-avatar.png" alt="User Avatar" className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-[#d9d9d9]"></div>
                </div>
            </header>
    
            <div className="w-full h-[103px] flex items-center justify-center text-amber-50">
                <div className="w-120 h-60 mt-40 rounded-2xl border-2 border-solid border-[#686565] bg-cyan-400 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-10">
                        <button className="bg-gradient-to-bl from-blue-800 to-blue-500 hover:bg-gradient-to-bl hover:from-blue-950 hover:to-blue-700 cursor-pointer border-4 border-violet-800 rounded-2xl px-8 py-3">all users</button>
                        <button className="bg-gradient-to-bl from-blue-800 to-blue-500 hover:bg-gradient-to-bl hover:from-blue-950 hover:to-blue-700 cursor-pointer border-4 border-violet-800 rounded-2xl px-8 py-3">all posts</button>
                    </div>
                </div>
            </div>
                
            </div>
        </div>
    </div>
  )
}
export default AdminDashboard