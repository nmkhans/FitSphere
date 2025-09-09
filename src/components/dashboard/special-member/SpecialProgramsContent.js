"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Calendar, MapPin, Clock, Award, ChevronRight } from "lucide-react";

const SpecialProgramsContent = () => {
  const activePrograms = [
    {
      id: 1,
      title: "Aqua Therapy Plus",
      description: "Therapeutic water exercises designed for joint relief and gentle strengthening",
      category: "Hydrotherapy", 
      duration: "8 weeks",
      schedule: "Tuesdays & Thursdays, 11:00 AM",
      participants: 8,
      maxParticipants: 12,
      instructor: "Dr. Maria Santos",
      location: "Therapeutic Pool",
      status: "Active",
      progress: 60,
      benefits: ["Joint pain relief", "Improved mobility", "Low-impact exercise"],
      nextSession: "September 10, 2025"
    },
    {
      id: 2,
      title: "Mindful Movement Therapy",
      description: "Combining gentle yoga, meditation, and adaptive movements for mental wellness",
      category: "Mind-Body",
      duration: "6 weeks", 
      schedule: "Mondays, 2:00 PM",
      participants: 6,
      maxParticipants: 10,
      instructor: "Sarah Williams",
      location: "Wellness Studio",
      status: "Active",
      progress: 33,
      benefits: ["Stress reduction", "Better sleep", "Emotional balance"],
      nextSession: "September 9, 2025"
    }
  ];

  const availablePrograms = [
    {
      id: 3,
      title: "Adaptive Strength Circle",
      description: "Small group strength training with modifications for all ability levels",
      category: "Strength Training",
      duration: "10 weeks",
      schedule: "Fridays, 10:00 AM",
      maxParticipants: 8,
      instructor: "Coach Michael Torres",
      location: "Adaptive Gym",
      startDate: "September 20, 2025",
      prerequisites: "Basic mobility assessment required",
      benefits: ["Muscle strength", "Bone density", "Functional movement"],
      price: "Included in Wellness Plus membership"
    },
    {
      id: 4,
      title: "Balance & Fall Prevention",
      description: "Evidence-based program to improve balance and reduce fall risk",
      category: "Safety & Wellness",
      duration: "12 weeks",
      schedule: "Wednesdays, 9:30 AM",
      maxParticipants: 15,
      instructor: "Dr. Patricia Kim",
      location: "Rehabilitation Center",
      startDate: "October 5, 2025", 
      prerequisites: "Healthcare provider clearance",
      benefits: ["Better balance", "Confidence", "Independence"],
      price: "Covered by insurance (with referral)"
    },
    {
      id: 5,
      title: "Nutrition & Wellness Workshop",
      description: "Interactive sessions on meal planning and healthy eating for special conditions",
      category: "Nutrition Education",
      duration: "4 weeks",
      schedule: "Saturdays, 1:00 PM",
      maxParticipants: 20,
      instructor: "Nutritionist Dr. James Chen",
      location: "Education Center",
      startDate: "September 28, 2025",
      prerequisites: "None",
      benefits: ["Meal planning skills", "Label reading", "Recipe adaptations"],
      price: "$75 (members) / $150 (non-members)"
    }
  ];

  const achievements = [
    {
      title: "Program Pioneer",
      description: "Completed your first special program",
      date: "July 2025",
      icon: "🏆"
    },
    {
      title: "Consistency Champion", 
      description: "Attended 95% of Aqua Therapy sessions",
      date: "August 2025",
      icon: "🎯"
    },
    {
      title: "Wellness Warrior",
      description: "Active in multiple programs simultaneously", 
      date: "September 2025",
      icon: "⭐"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Starting Soon": return "bg-blue-100 text-blue-800";
      case "Full": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Hydrotherapy": return "bg-blue-100 text-blue-800";
      case "Mind-Body": return "bg-purple-100 text-purple-800";
      case "Strength Training": return "bg-orange-100 text-orange-800";
      case "Safety & Wellness": return "bg-green-100 text-green-800";
      case "Nutrition Education": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Special Programs</h2>
          <p className="text-muted-foreground">Specialized group programs designed for your wellness journey</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Heart className="h-4 w-4 mr-2" />
          Browse All Programs
        </Button>
      </div>

      {/* Program Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <div className="text-2xl font-bold text-green-700">2</div>
            <div className="text-sm text-green-600">Active Programs</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <div className="text-2xl font-bold text-blue-700">16</div>
            <div className="text-sm text-blue-600">Sessions Attended</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 mx-auto text-purple-600 mb-2" />
            <div className="text-2xl font-bold text-purple-700">3</div>
            <div className="text-sm text-purple-600">Achievements</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 mx-auto text-orange-600 mb-2" />
            <div className="text-2xl font-bold text-orange-700">92%</div>
            <div className="text-sm text-orange-600">Satisfaction Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Programs */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Active Programs</h3>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {activePrograms.map((program) => (
            <Card key={program.id} className="hover:shadow-lg transition-shadow border-l-4 border-green-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{program.title}</CardTitle>
                    <Badge className={getCategoryColor(program.category)}>
                      {program.category}
                    </Badge>
                  </div>
                  <Badge className={getStatusColor(program.status)}>
                    {program.status}
                  </Badge>
                </div>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Next: {program.nextSession}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{program.schedule}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{program.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{program.participants}/{program.maxParticipants} participants</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Program Benefits:</div>
                  <div className="flex flex-wrap gap-1">
                    {program.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Program Progress</span>
                    <span>{program.progress}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${program.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" variant="default">
                    View Schedule
                  </Button>
                  <Button variant="outline">
                    Message Group
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Available Programs */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Available Programs</h3>
        <div className="space-y-4">
          {availablePrograms.map((program) => (
            <Card key={program.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-semibold">{program.title}</h4>
                        <Badge className={getCategoryColor(program.category)}>
                          {program.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">{program.price}</div>
                        <div className="text-xs text-gray-500">Starts {program.startDate}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{program.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{program.schedule}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{program.duration}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{program.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-500" />
                          <span>Max {program.maxParticipants} participants</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm font-medium mb-1">Benefits:</div>
                      <div className="flex flex-wrap gap-1">
                        {program.benefits.map((benefit, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {program.prerequisites && (
                      <div className="text-xs text-orange-600 mb-3">
                        Prerequisites: {program.prerequisites}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Enroll Now
                      </Button>
                      <Button variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-lg text-yellow-800">Your Program Achievements</CardTitle>
          <CardDescription>Celebrating your wellness milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-yellow-200">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-yellow-800">{achievement.title}</h4>
                    <p className="text-sm text-yellow-700 mb-1">{achievement.description}</p>
                    <p className="text-xs text-gray-500">{achievement.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecialProgramsContent;
