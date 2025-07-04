import axios from "axios";
import { useState } from "react";
import TopNavbar from "../components/TopNavbar";
import { useNavigate } from "react-router-dom";

function AddPost() {
    const serverApi = 'https://user-post-server.onrender.com/api/';
    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');
    const [image, setImage] = useState('');
    const Navigate = useNavigate();
    document.title = "Add New Post"; // Set the document title

    const handleAddPost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${serverApi}/blogs/add-post`, {
                title,
                discription,
                image
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                alert('Post added successfully');
                Navigate('/'); // Redirect to home or posts page
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div>
        <TopNavbar />
        <main className="flex flex-col items-center justify-center p-5 mt-5 col-2">
            <h1 className="text-3xl font-bold mb-5">Add New Post</h1>
            <form className="w-full max-w-lg" onSubmit={handleAddPost}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
                </label>
                <input
                type="text"
                id="title" 
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discription">
                Description
                </label>
                <textarea
                id="discription"
                value={discription}
                onChange={(e) => setDiscription(e.target.value)}
                placeholder="Write your post description here..."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Upload Image
                </label>
                <input
                type="file"
                id="image"
                required
                onChange={(e) => setImage(e.target.files[0])}
                className="shadow border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-amber-50 w-50 text-sm font-bold mb-2"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Add Post
            </button>
            </form>
        </main>
    </div>
  )
}
export default AddPost