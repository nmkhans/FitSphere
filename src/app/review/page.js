import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Star, ThumbsUp, Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function ReviewsPage() {
  const reviewsResponse = await fetch(
    `${process.env.NEXT_SERVER_API}/api/reviews`,
    {
      next: {
        revalidate: 600,
      },
    }
  );

  const { data: reviews } = await reviewsResponse.json();

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) /
    reviews.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Member Reviews
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              See what our members say about their FitSphere
              experience
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= Math.floor(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-2xl font-bold ml-2">
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <Badge variant="secondary" className="text-sm">
                {reviews.length} Reviews
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8">
          {/* Write Review Form */}

          {/* Reviews List */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <select className="bg-background border border-border rounded-md px-5 py-2 w-[200px]">
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card
                  key={review._id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.name}
                        />
                        <AvatarFallback>
                          {review.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">
                            {review.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(
                              review.date
                            ).toLocaleDateString()}
                          </span>
                        </div>

                        <h4 className="font-medium mb-2">
                          {review.title}
                        </h4>
                        <p className="text-muted-foreground mb-4">
                          {review.review}
                        </p>

                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            Helpful ({review.likes})
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {reviews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No reviews found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
