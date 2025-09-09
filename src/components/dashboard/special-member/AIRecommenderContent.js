"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Sparkles, Target, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import { useState } from "react";

const AIRecommenderContent = () => {
  const [loading, setLoading] = useState(false);
  const [currentCondition, setCurrentCondition] = useState("");
  const [painLevel, setPainLevel] = useState("3");
  const [energyLevel, setEnergyLevel] = useState("7");

  const recentRecommendations = [
    {
      id: 1,
      date: "September 8, 2025",
      condition: "Lower back pain, fatigue",
      exercises: [
        {
          name: "Seated Spinal Twist",
          duration: "5 minutes",
          difficulty: "Easy",
          adaptation: "Chair support"
        },
        {
          name: "Gentle Neck Rolls",
          duration: "3 minutes", 
          difficulty: "Easy",
          adaptation: "Slow movement"
        },
        {
          name: "Assisted Leg Extensions",
          duration: "8 minutes",
          difficulty: "Beginner",
          adaptation: "Use resistance band"
        }
      ],
      aiNotes: "Recommended low-impact movements to reduce back tension while building core strength gradually.",
      satisfaction: 4.5
    },
    {
      id: 2,
      date: "September 6, 2025",
      condition: "Joint stiffness, anxiety",
      exercises: [
        {
          name: "Water Walking",
          duration: "15 minutes",
          difficulty: "Easy",
          adaptation: "Pool therapy"
        },
        {
          name: "Mindful Breathing",
          duration: "10 minutes",
          difficulty: "Easy", 
          adaptation: "Seated position"
        },
        {
          name: "Gentle Arm Circles",
          duration: "5 minutes",
          difficulty: "Easy",
          adaptation: "Range-limited"
        }
      ],
      aiNotes: "Combined movement therapy with mindfulness to address both physical stiffness and mental well-being.",
      satisfaction: 5.0
    }
  ];

  const handleGenerateRecommendations = () => {
    setLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Beginner": return "bg-blue-100 text-blue-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + (rating % 1 ? "☆" : "") + "☆".repeat(5 - Math.ceil(rating));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center">
            <Bot className="h-7 w-7 mr-3 text-purple-600" />
            AI Exercise Recommender
          </h2>
          <p className="text-muted-foreground">Get personalized exercise recommendations based on your current condition</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
          <Sparkles className="h-4 w-4 mr-1" />
          AI Powered
        </Badge>
      </div>

      {/* Current Assessment Form */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">
            <Target className="h-5 w-5 inline mr-2" />
            Today's Health Assessment
          </CardTitle>
          <CardDescription>Help our AI understand your current condition for better recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Pain Level (1-10)</label>
              <Input 
                type="number" 
                min="1" 
                max="10" 
                value={painLevel}
                onChange={(e) => setPainLevel(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Energy Level (1-10)</label>
              <Input 
                type="number" 
                min="1" 
                max="10" 
                value={energyLevel}
                onChange={(e) => setEnergyLevel(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Current Symptoms or Concerns</label>
            <Textarea 
              placeholder="Describe any pain, stiffness, fatigue, or other concerns you're experiencing today..."
              value={currentCondition}
              onChange={(e) => setCurrentCondition(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button 
            onClick={handleGenerateRecommendations}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                AI is analyzing your condition...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Personalized Recommendations
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800">
            <Bot className="h-5 w-5 inline mr-2" />
            AI Health Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Improvement Detected</p>
                <p className="text-sm text-blue-700">Your pain levels have decreased by 20% over the past week. Great progress!</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Gentle Reminder</p>
                <p className="text-sm text-blue-700">Consider adding more stretching exercises to your routine for better flexibility.</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Target className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Personalized Tip</p>
                <p className="text-sm text-blue-700">Based on your condition, morning exercises tend to work best for you. Try scheduling them between 9-11 AM.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Recommendations */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent AI Recommendations</h3>
        <div className="space-y-6">
          {recentRecommendations.map((rec) => (
            <Card key={rec.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{rec.date}</CardTitle>
                    <CardDescription>Condition: {rec.condition}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-500 text-lg">{renderStars(rec.satisfaction)}</div>
                    <div className="text-xs text-gray-500">{rec.satisfaction}/5.0 rating</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-700 mb-2">
                    <Bot className="h-4 w-4 inline mr-1" />
                    AI Analysis:
                  </p>
                  <p className="text-purple-800">{rec.aiNotes}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Recommended Exercises:</h4>
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {rec.exercises.map((exercise, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg border">
                        <div className="font-medium text-sm">{exercise.name}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {exercise.duration} • {exercise.adaptation}
                        </div>
                        <Badge className={`mt-2 text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                          {exercise.difficulty}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1">
                    Repeat Workout
                  </Button>
                  <Button variant="outline">
                    Rate Session
                  </Button>
                  <Button variant="outline">
                    Modify
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-lg text-green-800">Quick AI Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
              <Target className="h-6 w-6 text-blue-600" />
              <span className="text-sm">Emergency Routine</span>
              <span className="text-xs text-gray-500">For sudden pain relief</span>
            </Button>
            <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <span className="text-sm">Mood Booster</span>
              <span className="text-xs text-gray-500">Exercises for mental wellness</span>
            </Button>
            <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
              <RefreshCw className="h-6 w-6 text-green-600" />
              <span className="text-sm">Energy Boost</span>
              <span className="text-xs text-gray-500">Combat fatigue naturally</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRecommenderContent;
