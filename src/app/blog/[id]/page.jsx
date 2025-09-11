import { notFound } from "next/navigation";
import Link from "next/link";

const BlogDetailPage = async ({ params }) => {
    const { id } = await params;

    console.log("Blog ID:", id);

    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/blogs/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return notFound();
        }

        const result = await res.json();

        if (!result.success || !result.data) {
            return notFound();
        }

        const blog = result.data;

        return (
            <div className="max-w-4xl mx-auto p-4">
                {/* Back button */}
                <div className="mb-6">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 12H5m7-7l-7 7 7 7"
                            />
                        </svg>
                        Back to Blogs
                    </Link>
                </div>

                {/* Blog content */}
                <article className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                    {/* Author info */}
                    <div className="flex items-center mb-6">
                        <div className="bg-red-300 h-12 w-12 rounded-full mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold">{blog.username || blog.email}</h2>
                            <p className="text-sm text-gray-500">
                                Published on{" "}
                                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                            {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                                <p className="text-xs text-gray-400">
                                    Last updated:{" "}
                                    {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Blog title */}
                    <h1 className="text-3xl font-bold mb-6 text-gray-900">{blog.title}</h1>

                    {/* First image */}
                    {blog.imageUrls && blog.imageUrls.length > 0 && (
                        <div className="mb-6">
                            <img
                                src={blog.imageUrls[0]}
                                alt="Blog"
                                className="w-full h-96 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    )}

                    {/* Blog content */}
                    <div className="prose max-w-none">
                        <p className="text-gray-800 whitespace-pre-line leading-relaxed text-lg">{blog.content}</p>
                    </div>

                    {/* Second image */}
                    {blog.imageUrls && blog.imageUrls.length > 1 && (
                        <div className="mt-6">
                            <img
                                src={blog.imageUrls[1]}
                                alt="Blog"
                                className="w-full h-96 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    )}

                    {/* Additional images */}
                    {blog.imageUrls && blog.imageUrls.length > 2 && (
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {blog.imageUrls.slice(2).map((imageUrl, index) => (
                                <img
                                    key={index}
                                    src={imageUrl}
                                    alt={`Blog image ${index + 3}`}
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                />
                            ))}
                        </div>
                    )}
                </article>

                {/* Navigation */}
                <div className="mt-8 text-center">
                    <Link
                        href="/blog"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors inline-block">
                        Read More Blogs
                    </Link>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching blog:", error);
        return notFound();
    }
};

export default BlogDetailPage;
