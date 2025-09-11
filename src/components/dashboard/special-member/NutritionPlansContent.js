"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Apple, Utensils, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

const NutritionPlansContent = () => {
  const nutritionPlans = [
    {
      id: 1,
      title: "Heart-Healthy Mediterranean",
      description: "Anti-inflammatory diet rich in omega-3s, perfect for cardiovascular health.",
      duration: "4 weeks",
      type: "Medical",
      calories: "1800-2000",
      status: "Active",
      compliance: 85,
      benefits: ["Reduces inflammation", "Supports heart health", "Easy to digest"]
    },
    {
      id: 2,
      title: "Diabetic-Friendly Balance",
      description: "Low glycemic index meals designed to maintain stable blood sugar levels.",
      duration: "6 weeks",
      type: "Therapeutic",
      calories: "1600-1800",
      status: "Planning",
      compliance: 0,
      benefits: ["Stabilizes blood sugar", "Supports weight management", "Rich in fiber"]
    },
    {
      id: 3,
      title: "Soft Foods Recovery",
      description: "Nutritionally complete soft diet for easier digestion and swallowing.",
      duration: "2 weeks",
      type: "Recovery",
      calories: "1500-1700",
      status: "Completed",
      compliance: 95,
      benefits: ["Easy to swallow", "Nutrient-dense", "Gentle on digestion"]
    }
  ];

  const todaysMeals = [
    {
      meal: "Breakfast",
      time: "8:00 AM",
      title: "Oatmeal with Berries & Nuts",
      calories: 320,
      adaptations: ["Soft texture", "Low sodium"],
      status: "completed"
    },
    {
      meal: "Mid-Morning",
      time: "10:30 AM", 
      title: "Greek Yogurt Smoothie",
      calories: 180,
      adaptations: ["High protein", "Easy to swallow"],
      status: "completed"
    },
    {
      meal: "Lunch",
      time: "12:30 PM",
      title: "Salmon with Sweet Potato Mash",
      calories: 450,
      adaptations: ["Heart-healthy fats", "Pureed sides"],
      status: "pending"
    },
    {
      meal: "Afternoon",
      time: "3:00 PM",
      title: "Avocado Toast (soft)",
      calories: 220,
      adaptations: ["Soft bread", "Mashed avocado"],
      status: "pending"
    },
    {
      meal: "Dinner",
      time: "6:30 PM",
      title: "Chicken & Vegetable Soup",
      calories: 380,
      adaptations: ["Tender proteins", "Well-cooked vegetables"],
      status: "pending"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Planning": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getMealStatusIcon = (status) => {
    return status === "completed" ? 
      <CheckCircle className="h-4 w-4 text-green-600" /> : 
      <AlertCircle className="h-4 w-4 text-yellow-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Therapeutic Nutrition Plans</h2>
          <p className="text-muted-foreground">Medically-tailored meal plans for your health needs</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Utensils className="h-4 w-4 mr-2" />
          Consult Nutritionist
        </Button>
      </div>

      {/* Nutrition Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Apple className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <div className="text-2xl font-bold text-green-700">1,450</div>
            <div className="text-sm text-green-600">Calories Today</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <div className="text-2xl font-bold text-blue-700">89%</div>
            <div className="text-sm text-blue-600">Weekly Adherence</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 mx-auto text-purple-600 mb-2" />
            <div className="text-2xl font-bold text-purple-700">3</div>
            <div className="text-sm text-purple-600">Meals Completed</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Utensils className="h-8 w-8 mx-auto text-orange-600 mb-2" />
            <div className="text-2xl font-bold text-orange-700">2</div>
            <div className="text-sm text-orange-600">Active Plans</div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Meal Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Utensils className="h-5 w-5 mr-2" />
            Today&apos;s Adaptive Meal Plan
          </CardTitle>
          <CardDescription>Tuesday, September 9, 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaysMeals.map((meal, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getMealStatusIcon(meal.status)}
                  <div>
                    <div className="font-medium">{meal.meal} - {meal.time}</div>
                    <div className="text-sm text-gray-600">{meal.title}</div>
                    <div className="flex gap-1 mt-1">
                      {meal.adaptations.map((adaptation, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          {adaptation}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{meal.calories} cal</div>
                  <Badge 
                    className={meal.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                  >
                    {meal.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nutrition Plans */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {nutritionPlans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{plan.title}</CardTitle>
                  <Badge className={getStatusColor(plan.status)}>
                    {plan.status}
                  </Badge>
                </div>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  {plan.type}
                </Badge>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Duration:</span> {plan.duration}
                </div>
                <div>
                  <span className="font-medium">Daily Calories:</span> {plan.calories}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <div className="text-sm font-medium mb-2 text-green-700">Health Benefits:</div>
                <div className="space-y-1">
                  {plan.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center text-sm text-green-600">
                      <CheckCircle className="h-3 w-3 mr-2" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {plan.status === "Active" && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Compliance Rate</span>
                    <span>{plan.compliance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${plan.compliance}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button className="flex-1" variant="default">
                  {plan.status === "Active" ? "View Details" : plan.status === "Planning" ? "Start Plan" : "Review"}
                </Button>
                <Button variant="outline">
                  Modify
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Nutritional Alert */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Nutritionist Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700">
            Your recent blood work shows improved inflammation markers! Continue with the Mediterranean 
            plan and consider adding more omega-3 rich foods. Schedule a follow-up consultation to 
            discuss transitioning to maintenance nutrition.
          </p>
          <Button className="mt-3" variant="outline">
            Schedule Consultation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionPlansContent;
