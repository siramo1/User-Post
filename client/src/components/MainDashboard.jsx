import { useEffect, useState } from "react";
import axios from "axios";

function MainDashboard() {
    const serverApi = 'https://user-post-server.onrender.com/api';
    const [blogs, setBlogs] = useState([]);
    document.title = "User Post";

    useEffect(() => {
        axios.get(`${serverApi}/blogs/all-posts`)
            .then(response => {
                if (response.data && Array.isArray(response.data.posts)) {
                    setBlogs(response.data.posts);
                } else {
                    console.error("API response structure unexpected:", response.data);
                    setBlogs([]);
                }
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, [serverApi]);

    return (
        <div className="pt-20"> {/* Padding to account for fixed navbar */}
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map(blog => (
                            <div 
                                key={blog._id} 
                                className="bg-amber-50 border-2 border-amber-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                {/* User Info */}
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-300">
                                        <img 
                                            src={blog.user?.profileImage || '/default-profile.png'} 
                                            alt="Profile" 
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/default-profile.png';
                                            }}
                                        />
                                    </div>
                                    <div className="ml-3 font-medium text-xl text-gray-800">
                                        {blog.user?.name || 'User'}
                                    </div>
                                </div>

                                {/* Post Content */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {blog.title}
                                    </h2>
                                    <p className="text-lg text-stone-700">
                                        {blog.description}
                                    </p>
                                    {blog.image && (
                                        <div className="rounded-lg overflow-hidden border-2 border-stone-300">
                                            <img 
                                                src={blog.image} 
                                                alt="Post" 
                                                className="w-full h-auto max-h-96 object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/default-post.png';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty state */}
                    {blogs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-xl">No posts available yet.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default MainDashboard;