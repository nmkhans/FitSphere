"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Link from "next/link";

const data = [
  {
    _id: "1",
    username: "John Fit",
    email: "johnfit@example.com",
    title: "How I Improved My Strength in 3 Months",
    content: `I started with simple bodyweight exercises like pushups, squats, and itemks. 
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
  ,
  {
    _id: "5",
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

export default function BlogSection() {
  return (
    <section id="pricing" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            The Blogs
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
        Inspiring stories, expert tips, and real journeys to keep you motivated.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {data.slice(0, 4).map((story, index) => (
            <Card
              key={story._id || index}
              className={`relative transition-all duration-500 transform hover:scale-105 ${
                story.popular
                  ? "border-primary shadow-2xl shadow-primary/20 bg-gradient-to-b from-card to-primary/5"
                  : "border-border/50 shadow-xl bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10"
              }`}
            >
              <CardHeader className="pb-4">
                {/* User Info */}
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

                {/* Title */}
                <CardTitle className="text-md lg:text-lg line-clamp-2 min-h-[56px]">
                  {story.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* First Image */}
                {story.imageUrls?.[0] && (
                  <img
                    src={story.imageUrls[0]}
                    alt="Story"
                    className="rounded-lg max-h-[160px] object-cover w-full"
                  />
                )}

                {/* Content */}
             

                <p className="text-sm mt-1 line-clamp-3 text-gray-800 whitespace-pre-line">
                  {story.content}
                </p>

                {/* Button */}
                <Link
                  href={`/blog/${story._id}`}
                  className={`inline-flex items-center justify-center w-full rounded-full px-5 py-2 text-sm font-medium transition shadow ${
                    story.popular
                      ? "bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-primary/25"
                      : "border border-primary text-primary hover:bg-primary/10"
                  }`}
                >
                  Read More <span className="ml-1">→</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
