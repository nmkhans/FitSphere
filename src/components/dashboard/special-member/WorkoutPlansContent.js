"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, Star, Play, Heart, Plus } from "lucide-react";

const WorkoutPlansContent = () => {
  const workoutPlans = [
    {
      id: 1,
      title: "Adaptive Strength Training",
      description: "Customized strength exercises designed for your specific needs and abilities.",
      duration: "45 mins",
      difficulty: "Beginner",
      category: "Strength",
      exercises: 8,
      adaptations: ["Low Impact", "Chair Support", "Resistance Bands"],
      progress: 65
    },
    {
      id: 2,
      title: "Gentle Cardio Flow",
      description: "Heart-healthy cardio exercises with modifications for different ability levels.",
      duration: "30 mins",
      difficulty: "Easy",
      category: "Cardio",
      exercises: 6,
      adaptations: ["Seated Options", "Pool Exercises", "Walking Support"],
      progress: 40
    },
    {
      id: 3,
      title: "Flexibility & Mobility",
      description: "Improve range of motion and reduce stiffness with adaptive stretching routines.",
      duration: "25 mins",
      difficulty: "Beginner",
      category: "Flexibility",
      exercises: 10,
      adaptations: ["Chair Yoga", "Assisted Stretching", "Prop Support"],
      progress: 80
    },
    {
      id: 4,
      title: "Balance & Stability",
      description: "Safe balance exercises to improve coordination and prevent falls.",
      duration: "20 mins",
      difficulty: "Beginner",
      category: "Balance",
      exercises: 5,
      adaptations: ["Wall Support", "Seated Balance", "Safety Rails"],
      progress: 25
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Beginner": return "bg-blue-100 text-blue-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Adaptive Workout Plans</h2>
          <p className="text-muted-foreground">Personalized exercise routines designed for your unique needs</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Custom Plan
        </Button>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-800">Your Weekly Progress</h3>
            <Badge className="bg-blue-100 text-blue-800">4 of 7 days completed</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Workouts Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">285</div>
              <div className="text-sm text-gray-600">Total Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">92%</div>
              <div className="text-sm text-gray-600">Adherence Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workout Plans Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {workoutPlans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{plan.title}</CardTitle>
                  <Badge className={getDifficultyColor(plan.difficulty)}>
                    {plan.difficulty}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{plan.progress}%</div>
                  <div className="text-xs text-gray-500">Complete</div>
                </div>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {plan.duration}
                </div>
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  {plan.exercises} exercises
                </div>
                <Badge variant="outline" className="text-xs">
                  {plan.category}
                </Badge>
              </div>
              
              {/* Adaptations */}
              <div>
                <div className="text-sm font-medium mb-2 text-green-700">
                  <Heart className="h-4 w-4 inline mr-1" />
                  Adaptive Features:
                </div>
                <div className="flex flex-wrap gap-1">
                  {plan.adaptations.map((adaptation, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                      {adaptation}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{plan.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${plan.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1" variant="default">
                  <Play className="h-4 w-4 mr-2" />
                  Start Workout
                </Button>
                <Button variant="outline">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Tips */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-lg text-yellow-800">💡 Today's Adaptive Fitness Tip</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700">
            Remember to listen to your body and modify exercises as needed. Every movement counts, 
            and consistency is more important than intensity. Your personalized adaptations are 
            designed to help you succeed safely.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutPlansContent;
