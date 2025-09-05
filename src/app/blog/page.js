import Link from "next/link";

const data = [
  {
    _id: "1",
    username: "John Fit",
    email: "johnfit@example.com",
    title: "How I Improved My Strength in 3 Months",
    content: `I started with simple bodyweight exercises like pushups, squats, and planks. 
Consistency was the key. I slowly increased weights every week and tracked my progress. 
Within 3 months, my bench press improved by 20kg and I felt more energetic in my daily life.`,
    createdAt: new Date().toISOString(),
    imageUrls: [
      "https://i.ibb.co.com/gbCkSmWN/istockphoto-1183038884-612x612.jpg",
      "https://i.ibb.co.com/gbCkSmWN/istockphoto-1183038884-612x612.jpg",
    ],
  },
  {
    _id: "2",
    username: "Sarah Wellness",
    email: "sarah@example.com",
    title: "Morning Yoga Changed My Routine",
    content: `I used to feel stressed and tired in the morning. Then I started 20 minutes of yoga daily. 
It improved my flexibility and gave me a calm start to the day. My favorite poses are downward dog, child’s pose, and tree pose.`,
    createdAt: new Date().toISOString(),
    imageUrls: [
      "https://i.ibb.co.com/gbCkSmWN/istockphoto-1183038884-612x612.jpg",
      "https://i.ibb.co.com/gbCkSmWN/istockphoto-1183038884-612x612.jpg",
    ],
  },
  {
    _id: "3",
    username: "Mike Runner",
    email: "mikerun@example.com",
    title: "Running 5K Everyday",
    content: `I challenged myself to run 5km every morning for 30 days. 
At first it was very tough, but by the 2nd week my stamina improved drastically. 
Running has helped me with mental clarity and better sleep.`,
    createdAt: new Date().toISOString(),
    imageUrls: [
      "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1594737625785-cf54f7fcbf39?q=80&w=800&auto=format",
    ],
  },
  {
    _id: "4",
    username: "Emma Nutrition",
    email: "emmafit@example.com",
    title: "Why Diet Matters More Than You Think",
    content: `Exercise alone is not enough. I realized 70% of my results came from proper diet. 
I cut down sugar, drank more water, and focused on protein intake. 
The combination of good food and training gave me the body transformation I was dreaming of.`,
    createdAt: new Date().toISOString(),
    imageUrls: [
      "https://images.unsplash.com/photo-1611078489935-0cbf92a6910b?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1611078489935-0cbf92a6910b?q=80&w=800&auto=format",
    ],
  },
];

const BlogPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {data.map((story) => (
        <div
          key={story._id}
          className="bg-white rounded-2xl shadow-md p-5 border border-gray-200"
        >
          <div className="flex items-center mb-3">
            <div className="bg-red-300 h-10 w-10 rounded-full mr-3" />
            <div>
              <h2 className="text-lg font-semibold">
                {story.username || story.email}
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
            {story.imageUrls && (
              <img
                src={story.imageUrls[1]}
                alt="Story"
                className="mt-4 rounded-lg max-h-96 object-cover w-full"
              />
            )}
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
