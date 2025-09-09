import Link from "next/link";

const BlogPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
    cache: "no-store",
  });
  const data = await res.json();
  // console.log(data.blogs);
  

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {data.blogs.map((story) => (
        <div key={story._id} className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
          <div className="flex items-center mb-3">
            <div className="bg-red-300 h-10 w-10 rounded-full mr-3" />
            <div>
              <h2 className="text-lg font-semibold">
                {story.name || story.email}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date(story.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold pb-4">{story.title}</h2>
            {story.imageUrls && (
              <img
                src={story.imageUrls[0]}
                alt="Story"
                className="mt-4 rounded-lg max-h-96 object-cover w-full"
              />
            )}
            <p className="text-gray-800 whitespace-pre-line py-12">
              {story.content}
            </p>
   
          </div>
          <Link
            href={`/blog/${story._id}`}
            className="inline-flex items-center rounded-full bg-green-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:bg-green-800 transition"
          >
            Read More <span className="ml-1">→</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
