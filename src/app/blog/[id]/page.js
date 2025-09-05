import { notFound } from "next/navigation";

// Sample data (tomar DB theke asbe future e)
const data = [
  {
    _id: "1",
    username: "Mike Runner",
    email: "mikerun@example.com",
    title: "Running 5K Everyday",
    content: `I challenged myself to run 5km every morning for 30 days. 
At first it was very tough, but by the 2nd week my stamina improved drastically. 
Running has helped me with mental clarity and better sleep.`,
    createdAt: new Date().toISOString(),
    imageUrls: [
      "https://i.ibb.co.com/PvFHL5xN/optimized-showcase.jpg",
      "https://i.ibb.co.com/PvFHL5xN/optimized-showcase.jpg",
    ],
  },
];

export default function BlogDetailsPage({ params }) {
  const story = data.find((item) => item._id === params.id);

  if (!story) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-400 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold">
          {story.username[0]}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{story.username}</h2>
          <p className="text-sm text-gray-500">
            {new Date(story.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{story.title}</h1>

      {/* First image */}
      {story.imageUrls[0] && (
        <img
          src={story.imageUrls[0]}
          alt={story.title}
          className="rounded-lg mb-6 w-full object-cover max-h-[400px]"
        />
      )}

      {/* Content */}
      <p className="text-gray-800 whitespace-pre-line mb-6 leading-relaxed">
        {story.content}
      </p>

      {/* Second image */}
      {story.imageUrls[1] && (
        <img
          src={story.imageUrls[1]}
          alt={story.title}
          className="rounded-lg mt-4 w-full object-cover max-h-[400px]"
        />
      )}

      {/* Back button */}
      <div className="mt-8">
        <a
          href="/blog"
          className="inline-flex items-center rounded-full bg-green-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-green-700 transition"
        >
          ← Back to Blogs
        </a>
      </div>
    </div>
  );
}
