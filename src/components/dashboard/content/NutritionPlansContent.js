"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PremiumFeatureCard from "@/components/dashboard/PremiumFeatureCard";
import { 
  Apple, 
  Utensils, 
  Clock, 
  Target, 
  Crown,
  ChefHat,
  Calculator,
  Users
} from "lucide-react";

const NutritionPlansContent = ({ userType }) => {
  const isBasicUser = userType === 'basic-member';
  
  const basicPlans = [
    {
      name: "General Healthy Eating",
      type: "Basic Nutrition Guide",
      calories: "2000-2200 kcal/day"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Nutrition Plans</h2>
        {isBasicUser && (
          <Badge variant="outline" className="border-yellow-500 text-yellow-600">
            <Crown className="h-3 w-3 mr-1" />
            Premium Feature
          </Badge>
        )}
      </div>

      {isBasicUser ? (
        <div className="space-y-6">
          {/* Basic nutrition info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="h-5 w-5" />
                Basic Nutrition Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Basic nutrition guidelines to support your fitness journey.
              </p>
              <Button>View Basic Guide</Button>
            </CardContent>
          </Card>

          {/* Premium features locked */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PremiumFeatureCard
              title="Personalized Meal Plans"
              description="Custom meal plans based on your goals, preferences, and dietary restrictions"
              icon={ChefHat}
              locked={true}
            />
            <PremiumFeatureCard
              title="Macro Calculator"
              description="Advanced nutrition tracking and macro calculations for optimal results"
              icon={Calculator}
              locked={true}
            />
            <PremiumFeatureCard
              title="Nutrition Coaching"
              description="One-on-one nutrition consultation with certified dietitians"
              icon={Users}
              locked={true}
            />
            <PremiumFeatureCard
              title="Meal Prep Guides"
              description="Step-by-step meal preparation guides and shopping lists"
              icon={Clock}
              locked={true}
            />
          </div>

          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6 text-center">
              <Crown className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Unlock Personalized Nutrition</h3>
              <p className="text-gray-600 mb-4">
                Get customized meal plans, macro tracking, and nutrition coaching with Premium membership.
              </p>
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Premium nutrition features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  Personalized Meal Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Your custom meal plan for this week</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Calories/day:</span>
                    <span className="font-semibold">2,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Protein:</span>
                    <span className="font-semibold">165g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carbs:</span>
                    <span className="font-semibold">220g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fats:</span>
                    <span className="font-semibold">85g</span>
                  </div>
                </div>
                <Button className="w-full mt-4">View Full Plan</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Nutrition Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Track your daily intake</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Today&apos;s Progress:</span>
                    <span className="font-semibold">1,850 / 2,200 kcal</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
                <Button className="w-full mt-4">Log Meals</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Nutrition Coach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Your assigned nutrition specialist</p>
                <div className="text-sm">
                  <p className="font-semibold">Dr. Maria Rodriguez</p>
                  <p className="text-gray-500">Certified Nutritionist</p>
                </div>
                <Button className="w-full mt-4">Schedule Consultation</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionPlansContent;
