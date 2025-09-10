"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const result = await response.json();
        
        if (result.success) {
          setBlogs(result.data);
        } else {
          setError("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const truncateContent = (content, maxLength = 200) => {
    if (!content) return "";
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="text-center">
          <p className="text-lg">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  const blogsToShow = blogs.length > 0 ? blogs : data;

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Fitness Blogs</h1>
      
      {blogsToShow.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">No blogs found.</p>
        </div>
      ) : (
        blogsToShow.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-md p-5 border border-gray-200"
          >
            <div className="flex items-center mb-3">
              <div className="bg-red-300 h-10 w-10 rounded-full mr-3" />
              <div>
                <h2 className="text-lg font-semibold">
                  {blog.username || blog.email}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold pb-4">
                {blog.title}
              </h2>
              {blog.imageUrls && blog.imageUrls.length > 0 && (
                <img
                  src={blog.imageUrls[0]}
                  alt="Blog"
                  className="mt-4 rounded-lg max-h-96 object-cover w-full"
                />
              )}
              <p className="text-gray-800 whitespace-pre-line py-6">
                {truncateContent(blog.content)}
              </p>
              <div className="flex justify-between items-center mt-4">
                <Link
                  href={`/blog/${blog._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogPage;
