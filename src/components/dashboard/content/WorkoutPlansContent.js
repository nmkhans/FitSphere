"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PremiumFeatureCard from "@/components/dashboard/PremiumFeatureCard";
import { 
  Dumbbell, 
  Target, 
  Activity, 
  Users, 
  Calendar, 
  BookOpen,
  Brain,
  MessageSquare,
  Crown,
  Lock
} from "lucide-react";

const WorkoutPlansContent = ({ userType }) => {
  const isBasicUser = userType === 'basic-member';
  
  const basicWorkouts = [
    {
      name: "Beginner Full Body",
      duration: "30 min",
      level: "Beginner",
      equipment: "Basic gym equipment"
    },
    {
      name: "Cardio Blast",
      duration: "25 min", 
      level: "Beginner",
      equipment: "Treadmill, bike"
    }
  ];

  const premiumWorkouts = [
    {
      name: "Advanced Strength Training",
      duration: "60 min",
      level: "Advanced",
      equipment: "Full gym access"
    },
    {
      name: "HIIT Performance",
      duration: "45 min",
      level: "Intermediate", 
      equipment: "Functional training area"
    },
    {
      name: "Powerlifting Program",
      duration: "90 min",
      level: "Advanced",
      equipment: "Olympic lifting platform"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Workout Plans</h2>
        {isBasicUser && (
          <Badge variant="outline" className="border-yellow-500 text-yellow-600">
            <Crown className="h-3 w-3 mr-1" />
            Upgrade for More
          </Badge>
        )}
      </div>

      {/* Basic Workouts - Available to all */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            {isBasicUser ? "Your Available Workouts" : "Basic Workouts"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {basicWorkouts.map((workout, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{workout.name}</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Duration: {workout.duration}</p>
                    <p>Level: {workout.level}</p>
                    <p>Equipment: {workout.equipment}</p>
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    Start Workout
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Premium Workouts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {premiumWorkouts.map((workout, index) => (
          <PremiumFeatureCard
            key={index}
            title={workout.name}
            description={`${workout.duration} • ${workout.level} • ${workout.equipment}`}
            icon={Target}
            locked={isBasicUser}
          />
        ))}
      </div>

      {isBasicUser && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6 text-center">
            <Crown className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Unlock Premium Workouts</h3>
            <p className="text-gray-600 mb-4">
              Get access to advanced workout plans, personalized training programs, and exclusive content.
            </p>
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkoutPlansContent;
