"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


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
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-12 gap-6">
      <div className="col-span-8 space-y-6">
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
                <h2 className="text-xl font-semibold pb-4">{blog.title}</h2>
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
            
                     <Button
                        size="lg"
                        variant="secondary"
                        className="h-12 px-6 bg-green-primary hover:bg-green-dark text-lg text-black-primary shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                              <Link
                    href={`/blog/${blog._id}`}
                   
                  >
                    Read More
                  </Link>
                    </Button>
                </div>
              </div>
            </div>
          ))
        )}

      </div>
            {/* Sticky Sidebar */}
      <div className="col-span-4">
        <div className="sticky top-8 space-y-6">
          {/* Search Box */}
          <Card className="border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input placeholder="Search blog..." className="flex-1" />
                  <Button
                        size="lg"
                        variant="secondary"
                        className="h-9 px-6 bg-green-primary hover:bg-green-dark text-lg text-black-primary shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                        go
                    </Button>
              </div>
            </CardContent>
          </Card>

          {/* Example extra sidebar content */}
          <Card className="border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="cursor-pointer hover:underline">Fitness</p>
              <p className="cursor-pointer hover:underline">Travel</p>
              <p className="cursor-pointer hover:underline">Nutrition</p>
              <p className="cursor-pointer hover:underline">Lifestyle</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
