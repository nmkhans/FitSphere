"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import Swal from "sweetalert2";
import { 
  Heart, 
  Users, 
  Plus, 
  AlertCircle, 
  User,
  Calendar,
  Activity,
  Shield,
  FileText,
  Baby,
  Accessibility
} from "lucide-react";

const SpecializedMembersSection = () => {
  const [members, setMembers] = useState([]);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { id: "pregnant", label: "Pregnant Women", icon: Baby, color: "bg-pink-100 text-pink-800" },
    { id: "disabled", label: "Disabled Individuals", icon: Accessibility, color: "bg-purple-100 text-purple-800" }
  ];

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    age: "",
    category: "",
    healthDetails: "",
    emergencyContact: "",
    medicalClearance: "",
    specialNotes: ""
  });

  // Fetch members on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/specialized-members');
      const data = await response.json();
      
      if (data.success) {
        setMembers(data.data);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch members'
        });
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch members'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email || !newMember.category) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all required fields'
      });
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('/api/specialized-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });

      const data = await response.json();

      if (data.success) {
        setMembers([data.data, ...members]);
        setNewMember({
          name: "",
          email: "",
          age: "",
          category: "",
          healthDetails: "",
          emergencyContact: "",
          medicalClearance: "",
          specialNotes: ""
        });
        setIsAddingMember(false);
        
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Member added successfully',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'Failed to add member'
        });
      }
    } catch (error) {
      console.error('Error adding member:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add member'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : User;
  };

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : "bg-gray-100 text-gray-800";
  };

  const getCategoryLabel = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.label : "Unknown";
  };

  const getSpecializedGuidelines = (categoryId) => {
    const guidelines = {
      pregnant: [
        "Avoid high-intensity exercises",
        "Focus on low-impact activities",
        "Stay hydrated and monitor heart rate",
        "Consult doctor for any concerns",
        "Avoid lying flat on back after first trimester",
        "Include prenatal yoga and stretching",
        "Monitor for signs of overexertion"
      ],
      disabled: [
        "Adapt exercises to individual capabilities",
        "Ensure accessible equipment is available",
        "Focus on functional movements",
        "Regular assessment of progress",
        "Maintain dignity and independence",
        "Use assistive devices when necessary",
        "Provide clear communication and instructions"
      ]
    };
    return guidelines[categoryId] || [];
  };

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Spinner className="mx-auto mb-4" />
            <p className="text-gray-600">Loading specialized members...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            Specialized Members
          </h1>
          <p className="text-gray-600 mt-2">
            Dedicated care for pregnant women and disabled individuals
          </p>
        </div>
        <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Specialized Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={newMember.age}
                    onChange={(e) => setNewMember({...newMember, age: e.target.value})}
                    placeholder="Enter age"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={newMember.category} 
                    onValueChange={(value) => setNewMember({...newMember, category: value})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center gap-2">
                            <category.icon className="h-4 w-4" />
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="healthDetails">Health Details & Conditions</Label>
                <Textarea
                  id="healthDetails"
                  value={newMember.healthDetails}
                  onChange={(e) => setNewMember({...newMember, healthDetails: e.target.value})}
                  placeholder="Describe any health conditions, limitations, or special requirements..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={newMember.emergencyContact}
                  onChange={(e) => setNewMember({...newMember, emergencyContact: e.target.value})}
                  placeholder="Emergency contact name and phone number"
                />
              </div>

              <div>
                <Label htmlFor="medicalClearance">Medical Clearance Status</Label>
                <Select 
                  value={newMember.medicalClearance} 
                  onValueChange={(value) => setNewMember({...newMember, medicalClearance: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select medical clearance status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved by Doctor</SelectItem>
                    <SelectItem value="pending">Pending Medical Review</SelectItem>
                    <SelectItem value="conditional">Conditional Approval</SelectItem>
                    <SelectItem value="not-required">Not Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="specialNotes">Special Notes & Instructions</Label>
                <Textarea
                  id="specialNotes"
                  value={newMember.specialNotes}
                  onChange={(e) => setNewMember({...newMember, specialNotes: e.target.value})}
                  placeholder="Any additional notes for trainers or staff..."
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddingMember(false)} disabled={submitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Adding...
                    </>
                  ) : (
                    'Add Member'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {categories.map((category) => {
          const count = members.filter(member => member.category === category.id).length;
          const Icon = category.icon;
          return (
            <Card key={category.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{category.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                  </div>
                  <Icon className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Safety Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-orange-500" />
            Safety Guidelines & Medical Disclaimers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-orange-400 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-orange-800">Important Medical Disclaimer</h4>
                <p className="text-sm text-orange-700 mt-1">
                  All specialized members (pregnant women and disabled individuals) must have proper medical clearance before starting any exercise program. 
                  Trainers should regularly assess capabilities and adjust programs accordingly. In case of any 
                  discomfort or health concerns, immediately stop the activity and consult healthcare professionals.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {categories.map((category) => (
              <div key={category.id} className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <category.icon className="h-4 w-4" />
                  {category.label}
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {getSpecializedGuidelines(category.id).map((guideline, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      {guideline}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Specialized Members ({members.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No members yet</h3>
              <p className="text-gray-600 mb-4">
                Start by adding specialized members to provide them with personalized care.
              </p>
              <Button onClick={() => setIsAddingMember(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Member
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {members.map((member) => {
                const CategoryIcon = getCategoryIcon(member.category);
                return (
                  <div key={member._id || member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CategoryIcon className="h-5 w-5 text-gray-500" />
                          <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                          <Badge className={getCategoryColor(member.category)}>
                            {getCategoryLabel(member.category)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="space-y-1">
                            <p><strong>Email:</strong> {member.email}</p>
                            <p><strong>Age:</strong> {member.age || "Not specified"}</p>
                            <p><strong>Join Date:</strong> {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : "N/A"}</p>
                          </div>
                          <div className="space-y-1">
                            <p><strong>Emergency Contact:</strong> {member.emergencyContact || "Not provided"}</p>
                            <p><strong>Medical Clearance:</strong> 
                              <Badge variant="outline" className="ml-1">
                                {member.medicalClearance || "Pending"}
                              </Badge>
                            </p>
                          </div>
                        </div>

                        {member.healthDetails && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700">Health Details:</p>
                            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded mt-1">
                              {member.healthDetails}
                            </p>
                          </div>
                        )}

                        {member.specialNotes && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-700">Special Notes:</p>
                            <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded mt-1">
                              {member.specialNotes}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Activity className="h-4 w-4 mr-1" />
                          Assign Plan
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
        </>
      )}
    </div>
  );
};

export default SpecializedMembersSection;
