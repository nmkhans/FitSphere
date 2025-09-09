"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, MessageSquare, Star, User, Phone, Mail } from "lucide-react";

const PersonalTrainingContent = () => {
  const assignedTrainer = {
    name: "Dr. Sarah Martinez",
    specialty: "Adaptive Fitness & Rehabilitation",
    experience: "8 years",
    certifications: ["ACSM-CEP", "Physical Therapy", "Special Populations"],
    rating: 4.9,
    totalClients: 127,
    image: "/api/placeholder/100/100",
    bio: "Specialized in creating safe, effective exercise programs for individuals with diverse abilities and health conditions."
  };

  const upcomingSessions = [
    {
      id: 1,
      date: "September 10, 2025",
      time: "10:00 AM - 11:00 AM",
      type: "In-Person",
      location: "Therapy Gym - Room 3",
      focus: "Balance & Coordination",
      status: "Confirmed",
      notes: "Bring water bottle and comfortable clothing"
    },
    {
      id: 2,
      date: "September 12, 2025", 
      time: "2:00 PM - 2:30 PM",
      type: "Virtual Check-in",
      location: "Video Call",
      focus: "Progress Review",
      status: "Scheduled",
      notes: "Review home exercise progress and adjust plan"
    },
    {
      id: 3,
      date: "September 15, 2025",
      time: "9:30 AM - 10:30 AM",
      type: "In-Person",
      location: "Therapy Gym - Room 3",
      focus: "Strength Training",
      status: "Scheduled",
      notes: "Focus on upper body adaptive exercises"
    }
  ];

  const recentSessions = [
    {
      date: "September 5, 2025",
      duration: "60 minutes",
      focus: "Flexibility & Mobility",
      rating: 5,
      notes: "Excellent progress on shoulder mobility. Increased range of motion by 15 degrees.",
      achievements: ["Completed full shoulder rotation", "10 minutes continuous stretching"]
    },
    {
      date: "September 3, 2025",
      duration: "45 minutes", 
      focus: "Cardiovascular Conditioning",
      rating: 4,
      notes: "Good endurance improvement. Managed 20 minutes of low-impact cardio without fatigue.",
      achievements: ["Heart rate stayed in target zone", "No joint discomfort reported"]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-800";
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    return type === "Virtual Check-in" ? <Video className="h-4 w-4" /> : <User className="h-4 w-4" />;
  };

  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Personal Training</h2>
          <p className="text-muted-foreground">Your dedicated adaptive fitness specialist</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message Trainer
        </Button>
      </div>

      {/* Trainer Profile */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={assignedTrainer.image} alt={assignedTrainer.name} />
              <AvatarFallback className="text-lg bg-blue-600 text-white">
                {assignedTrainer.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-blue-800">{assignedTrainer.name}</h3>
                  <p className="text-blue-600 font-medium">{assignedTrainer.specialty}</p>
                  <p className="text-sm text-gray-600 mt-1">{assignedTrainer.experience} experience</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-lg">{renderStars(assignedTrainer.rating)}</span>
                    <span className="ml-2 text-sm font-medium">{assignedTrainer.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500">{assignedTrainer.totalClients} clients trained</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-3">{assignedTrainer.bio}</p>
              
              <div className="mt-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {assignedTrainer.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                      {cert}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Upcoming Sessions
          </CardTitle>
          <CardDescription>Your scheduled personal training appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getTypeIcon(session.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{session.focus}</h4>
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {session.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {session.time}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {session.location}
                        </div>
                      </div>
                      {session.notes && (
                        <p className="text-sm text-blue-600 mt-2 italic">{session.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {session.type === "Virtual Check-in" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Video className="h-4 w-4 mr-1" />
                        Join Call
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Reschedule
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Sessions & Progress */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Sessions</CardTitle>
            <CardDescription>Your latest training achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSessions.map((session, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{session.focus}</h4>
                    <div className="text-yellow-500">{renderStars(session.rating)}</div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{session.date} • {session.duration}</p>
                  <p className="text-sm text-gray-700 mb-2">{session.notes}</p>
                  <div className="space-y-1">
                    {session.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center text-sm text-green-600">
                        <Star className="h-3 w-3 mr-2" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Training Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Training Progress</CardTitle>
            <CardDescription>Your improvement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-700">24</div>
                <div className="text-sm text-green-600">Sessions Completed</div>
                <div className="text-xs text-gray-500 mt-1">Since June 2025</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">4.8</div>
                <div className="text-sm text-blue-600">Average Session Rating</div>
                <div className="text-xs text-gray-500 mt-1">Consistently excellent</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-700">85%</div>
                <div className="text-sm text-purple-600">Goal Achievement Rate</div>
                <div className="text-xs text-gray-500 mt-1">Above average progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-lg text-yellow-800">Training Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
              <Video className="h-6 w-6 text-blue-600" />
              <span className="text-sm">Exercise Videos</span>
              <span className="text-xs text-gray-500">Home workout guides</span>
            </Button>
            <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
              <MessageSquare className="h-6 w-6 text-green-600" />
              <span className="text-sm">Progress Reports</span>
              <span className="text-xs text-gray-500">Detailed assessments</span>
            </Button>
            <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
              <Calendar className="h-6 w-6 text-purple-600" />
              <span className="text-sm">Book Session</span>
              <span className="text-xs text-gray-500">Schedule new appointment</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalTrainingContent;
