import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import axios from "axios";

function UserProfileBody() {
    const serverApi = 'https://user-post-server.onrender.com/api';
    const { user } = useAuthStore(); 
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${serverApi}/blogs/user-posts/`);
                
                if (response.data && Array.isArray(response.data.posts)) {
                    setBlogs(response.data.posts);
                } else {
                    setBlogs([]);
                    console.warn("Unexpected API response structure:", response.data);
                }
            } catch (err) {
                setError(err.message || "Failed to fetch posts");
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [serverApi]);
    const handleDeletePost = async (postId) => {
        try {
            const response = await axios.delete(`${serverApi}/blogs/delete-post/${postId}`);
            if (response.data.success) {
                setBlogs(blogs.filter(blog => blog._id !== postId));
                alert('Post deleted successfully');
            }
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen mt-18 text-black">
            {/* Sticky Header */}
            <div>
                <div className="flex items-center justify-center max-w-4xl mx-auto">
                    <img 
                        src={user?.profileImage || '/default-avatar.png'} 
                        alt="Avatar" 
                        className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-gray-300"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto py-6 px-4">
                <div className="space-y-6">
                    {blogs.length > 0 ? (
                        blogs.map(blog => (
                            <div key={blog._id} className="bg-amber-50 border-2 border-gray-200 rounded-lg p-6 shadow-sm">
                                {/* Blog Author */}
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <img 
                                            src={user?.profileImage || '/default-avatar.png'} 
                                            alt="Author" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-3 font-medium text-xl text-gray-800">
                                        {user?.name || 'Unknown'}
                                    </div>
                                    <div className="ml-auto">
                                        <button onClick={() => handleDeletePost(blog._id)} className="text-amber-50 bg-red-500 hover:bg-red-700 rounded-md px-4 py-2 ">DELETE</button>
                                    </div>
                                </div>

                                {/* Blog Content */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-semibold">{blog.title}</h2>
                                    <p className="text-gray-700 text-lg">{blog.description}</p>
                                    {blog.image && (
                                        <img 
                                            src={blog.image} 
                                            alt="Blog" 
                                            className="w-full max-h-96 object-contain rounded-lg border border-gray-300"
                                        />
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-xl">No posts found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfileBody;