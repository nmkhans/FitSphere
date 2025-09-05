"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, Filter, Search } from "lucide-react"

export default function ReviewsPage() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [reviewTitle, setReviewTitle] = useState("")
  const [filterRating, setFilterRating] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/fit-woman-outdoors.png",
      rating: 5,
      title: "Amazing transformation results!",
      review:
        "The trainers here are incredible. I've lost 25 pounds and gained so much strength in just 3 months. The personalized workout plans really work!",
      date: "2024-01-15",
      likes: 24,
      verified: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "/fit-man-gym.png",
      rating: 5,
      title: "Best gym experience ever",
      review:
        "Clean facilities, modern equipment, and knowledgeable staff. The AI suggestions feature helped me optimize my workouts perfectly.",
      date: "2024-01-12",
      likes: 18,
      verified: true,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      avatar: "/woman-athlete.jpg",
      rating: 4,
      title: "Great community and support",
      review:
        "Love the supportive community here. The group classes are fantastic and the trainers really care about your progress.",
      date: "2024-01-10",
      likes: 15,
      verified: false,
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "/man-athlete.png",
      rating: 5,
      title: "Professional and results-driven",
      review:
        "The nutrition guidance combined with the workout plans gave me the results I was looking for. Highly recommend!",
      date: "2024-01-08",
      likes: 22,
      verified: true,
    },
  ]

  const handleSubmitReview = (e) => {
    e.preventDefault()
    // Handle review submission logic here
    console.log("Review submitted:", { rating, reviewTitle, reviewText })
    // Reset form
    setRating(0)
    setReviewTitle("")
    setReviewText("")
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesRating = filterRating === "all" || review.rating.toString() === filterRating
    const matchesSearch =
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.review.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesRating && matchesSearch
  })

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Member Reviews
            </h1>
            <p className="text-xl text-muted-foreground mb-8">See what our members say about their FitPro experience</p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-2xl font-bold ml-2">{averageRating.toFixed(1)}</span>
              </div>
              <Badge variant="secondary" className="text-sm">
                {reviews.length} Reviews
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Write Review Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Write a Review</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Rating Stars */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
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
                    <label className="block text-sm font-medium mb-2">Review Title</label>
                    <Input
                      placeholder="Summarize your experience..."
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      required
                    />
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Review</label>
                    <Textarea
                      placeholder="Tell us about your experience at FitPro..."
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={!rating || !reviewTitle || !reviewText}>
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="bg-background border border-border rounded-md px-3 py-2"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                        <AvatarFallback>
                          {review.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{review.name}</h3>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified Member
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>

                        <h4 className="font-medium mb-2">{review.title}</h4>
                        <p className="text-muted-foreground mb-4">{review.review}</p>

                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
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

            {filteredReviews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No reviews found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
