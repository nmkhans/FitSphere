"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Heart, 
  Calendar, 
  Activity, 
  FileText, 
  Target, 
  Clock,
  TrendingUp,
  Baby,
  Accessibility,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const MemberOverview = ({ user, userType }) => {
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock member data - in real implementation, this would come from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const baseData = {
        id: "member_123",
        name: user?.name || "Member Name",
        email: user?.email || "member@example.com",
        joinDate: "2024-01-15",
        status: "active",
        profileComplete: 75,
      };

      // Customize data based on user type/membership
      if (userType === 'special-need') {
        setMemberData({
          ...baseData,
          category: user?.disabilities ? "disabled" : "pregnant",
          membershipPlan: "Wellness Plus",
          upcomingSessions: [
            {
              id: 1,
              type: "Personal Training",
              trainer: "Sarah Johnson", 
              date: "2025-09-08",
              time: "10:00 AM",
              status: "confirmed"
            },
            {
              id: 2,
              type: "Prenatal Yoga",
              trainer: "Emma Davis",
              date: "2025-09-10", 
              time: "2:00 PM",
              status: "pending"
            }
          ],
          recentActivity: [
            { date: "2025-09-05", activity: "Completed low-impact cardio session", duration: "30 min" },
            { date: "2025-09-03", activity: "Attended prenatal yoga class", duration: "45 min" },
            { date: "2025-09-01", activity: "Nutrition consultation", duration: "60 min" }
          ],
          healthMetrics: {
            lastCheckup: "2025-08-15",
            medicalClearance: "approved",
            restrictions: ["No high-impact exercises", "Monitor heart rate"],
            emergencyContact: "John Doe - (555) 123-4567"
          }
        });
      } else if (userType === 'premium-member') {
        setMemberData({
          ...baseData,
          category: "premium",
          membershipPlan: "Elite Performance",
          upcomingSessions: [
            {
              id: 1,
              type: "Personal Training",
              trainer: "Mike Wilson",
              date: "2025-09-08",
              time: "10:00 AM", 
              status: "confirmed"
            },
            {
              id: 2,
              type: "Advanced Strength Training",
              trainer: "Alex Rodriguez",
              date: "2025-09-10",
              time: "2:00 PM",
              status: "confirmed"
            }
          ],
          recentActivity: [
            { date: "2025-09-05", activity: "Completed HIIT training", duration: "45 min" },
            { date: "2025-09-03", activity: "Personal training session", duration: "60 min" },
            { date: "2025-09-01", activity: "Advanced workout plan", duration: "90 min" }
          ],
          healthMetrics: null // Premium members don't need special health tracking
        });
      } else {
        // Basic member
        setMemberData({
          ...baseData,
          category: "basic",
          membershipPlan: "Pro Active",
          upcomingSessions: [
            {
              id: 1,
              type: "Group Fitness Class",
              trainer: "Lisa Chen",
              date: "2025-09-08",
              time: "10:00 AM",
              status: "confirmed"
            }
          ],
          recentActivity: [
            { date: "2025-09-05", activity: "Completed basic cardio", duration: "30 min" },
            { date: "2025-09-03", activity: "Used weight machines", duration: "45 min" },
            { date: "2025-09-01", activity: "Gym orientation", duration: "30 min" }
          ],
          healthMetrics: null // Basic members don't need special health tracking
        });
      }
      setLoading(false);
    }, 1000);
  }, [user, userType]);

  const getCategoryInfo = (category) => {
    switch (category) {
      case "pregnant":
        return { 
          label: "Pregnant Women Program", 
          icon: Baby, 
          color: "bg-pink-100 text-pink-800",
          description: "Specialized care for expectant mothers"
        };
      case "disabled":
        return { 
          label: "Adaptive Fitness Program", 
          icon: Accessibility, 
          color: "bg-purple-100 text-purple-800",
          description: "Customized programs for different abilities" 
        };
      case "premium":
        return { 
          label: "Elite Performance Member", 
          icon: Target, 
          color: "bg-yellow-100 text-yellow-800",
          description: "Premium membership with advanced features"
        };
      case "basic":
        return { 
          label: "Pro Active Member", 
          icon: User, 
          color: "bg-green-100 text-green-800",
          description: "Standard membership program"
        };
      default:
        return { 
          label: "General Member", 
          icon: User, 
          color: "bg-gray-100 text-gray-800",
          description: "Standard membership program"
        };
    }
  };

  if (loading || !memberData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const categoryInfo = getCategoryInfo(memberData.category);
  const CategoryIcon = categoryInfo.icon;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-white">
              <AvatarImage src={user?.image} />
              <AvatarFallback className="bg-white text-blue-600 text-xl font-bold">
                {memberData.name[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {memberData.name}!</h1>
              <p className="text-blue-100">Member since {new Date(memberData.joinDate).toLocaleDateString()}</p>
              <Badge className={`mt-2 ${categoryInfo.color} border-0`}>
                <CategoryIcon className="h-4 w-4 mr-1" />
                {categoryInfo.label}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Membership Plan</p>
            <p className="text-xl font-semibold">{memberData.membershipPlan}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Profile Complete</p>
                <p className="text-2xl font-bold text-gray-900">{memberData.profileComplete}%</p>
              </div>
              <User className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{memberData.upcomingSessions.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-xs text-gray-500">Sessions completed</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        {memberData.healthMetrics ? (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Medical Status</p>
                  <div className="flex items-center mt-1">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <p className="text-sm font-medium text-green-600">Cleared</p>
                  </div>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Membership</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {userType === 'premium-member' ? '★★★' : '★'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userType === 'premium-member' ? 'Premium' : 'Basic'}
                  </p>
                </div>
                <Target className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {memberData.upcomingSessions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No upcoming sessions scheduled</p>
            ) : (
              <div className="space-y-3">
                {memberData.upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{session.type}</p>
                      <p className="text-sm text-gray-600">with {session.trainer}</p>
                      <p className="text-sm text-gray-500">{session.date} at {session.time}</p>
                    </div>
                    <Badge variant={session.status === 'confirmed' ? 'default' : 'secondary'}>
                      {session.status}
                    </Badge>
                  </div>
                ))}
                <Button className="w-full mt-4" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book New Session
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {memberData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.duration} • {activity.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Full Activity Log
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Health Information - Only for special-need members */}
      {memberData.healthMetrics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Health & Safety Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Medical Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Medical clearance: {memberData.healthMetrics.medicalClearance}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                    <span>Last checkup: {memberData.healthMetrics.lastCheckup}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Exercise Restrictions</h4>
                <div className="space-y-1">
                  {memberData.healthMetrics.restrictions.map((restriction, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <AlertCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                      <span>{restriction}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-medium text-blue-800">Emergency Contact</h5>
                  <p className="text-sm text-blue-700">{memberData.healthMetrics.emergencyContact}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="flex flex-col items-center p-4 h-auto">
              <Calendar className="h-6 w-6 mb-2" />
              <span>Book Session</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
              <FileText className="h-6 w-6 mb-2" />
              <span>View Plans</span>
            </Button>
            {memberData.healthMetrics && (
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <Heart className="h-6 w-6 mb-2" />
                <span>Health Records</span>
              </Button>
            )}
            {userType === 'premium-member' && (
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <Target className="h-6 w-6 mb-2" />
                <span>Premium Features</span>
              </Button>
            )}
            <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
              <User className="h-6 w-6 mb-2" />
              <span>Update Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberOverview;
