import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BlogPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-12 gap-6">
      <div className="col-span-8 space-y-6">
        {data.data.map((story) => (
          <Card key={story._id} className="border-none shadow-none">
            <CardHeader className="flex flex-row items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {(story.name || story.email)?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base font-semibold">
                  {story.name || story.email}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {new Date(story.createdAt).toLocaleString()}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">{story.title}</h2>
              {story.imageUrls && (
                <img
                  src={story.imageUrls[0]}
                  alt="Story"
                  className="mb-6 max-h-96 w-full object-cover"
                />
              )}
              <p className="text-sm text-gray-700 whitespace-pre-line mb-6">
                {story.content}
              </p>
              <Button asChild className="rounded-full">
                <Link href={`/blog/${story._id}`}>Read More →</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
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
                <Button>Go</Button>
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
