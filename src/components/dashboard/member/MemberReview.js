import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function MemberReview() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");

  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      name: session?.user?.name,
      avatar: "",
      rating,
      title: reviewTitle,
      review: reviewText,
      date: new Date().toLocaleDateString(),
    };

    const reviewResponse = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    const result = await reviewResponse.json();

    if (result.success) {
      toast.success(result.message);
      router.push("/review");
    } else {
      toast.error(result.message);
    }

    setRating(0);
    setReviewText("");
    setReviewTitle("");
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl text-primary-text font-bold mb-2">
          Write a review
        </h2>
        <p>Post your experience and your review with others.</p>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-8">
          <CardHeader></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rating Stars */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="p-1"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 hover:text-yellow-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Review Title
                </label>
                <Input
                  placeholder="Summarize your experience..."
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  required
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Review
                </label>
                <Textarea
                  className="h-[100px]"
                  placeholder="Tell us about your experience at FitSphere..."
                  rows={8}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!rating || !reviewTitle || !reviewText}
              >
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
