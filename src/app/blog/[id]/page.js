import { notFound } from "next/navigation"

export default async function BlogDetailsPage({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${params.id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    return notFound()
  }

  const story = await res.json()

  if (!story) {
    return notFound()
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-600 h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
          {story.username?.[0]}
        </div>
        <div>
          <h2 className="text-base font-medium">{story.username}</h2>
          <p className="text-sm text-muted-foreground">
            {new Date(story.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight mb-4">{story.title}</h1>

      {/* First image */}
      {story.imageUrls?.[0] && (
        <img
          src={story.imageUrls[0]}
          alt={story.title}
          className="rounded-2xl mb-6 w-full object-cover max-h-[400px] shadow-sm"
        />
      )}

      {/* Content */}
      <p className="text-base text-muted-foreground whitespace-pre-line mb-6 leading-relaxed">
        {story.content}
      </p>

      {/* Second image */}
      {story.imageUrls?.[1] && (
        <img
          src={story.imageUrls[1]}
          alt={story.title}
          className="rounded-2xl mt-4 w-full object-cover max-h-[400px] shadow-sm"
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
  )
}
