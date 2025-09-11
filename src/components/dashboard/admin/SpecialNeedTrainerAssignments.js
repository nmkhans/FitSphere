"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import {
  Loader2,
  Users,
  Heart,
  Plus,
  UserCheck,
  Calendar,
  Mail,
  User,
} from "lucide-react";

const SpecialNeedTrainerAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [specialNeedMembers, setSpecialNeedMembers] = useState([]);
  const [specialNeedTrainers, setSpecialNeedTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [assignmentNotes, setAssignmentNotes] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch assignments
      const assignmentsRes = await fetch("/api/trainer-assignments");
      if (assignmentsRes.ok) {
        const assignmentsData = await assignmentsRes.json();
        setAssignments(assignmentsData.assignments);
      }

      // Fetch special need members
      const membersRes = await fetch("/api/specialized-members");
      if (membersRes.ok) {
        const membersData = await membersRes.json();
        setSpecialNeedMembers(membersData.members || []);
      }

      // Fetch special need trainers (approved trainers with trainerType: 'special-need')
      const trainersRes = await fetch("/api/trainer-applications");
      if (trainersRes.ok) {
        const trainersData = await trainersRes.json();
        const approvedSpecialNeedTrainers = trainersData.applications.filter(
          app => app.status === 'approved' && app.trainerType === 'special-need'
        );
        setSpecialNeedTrainers(approvedSpecialNeedTrainers);
      }

      // Alternative: Fetch users with role 'special-need-trainer' 
      // const usersRes = await fetch("/api/users?role=special-need-trainer");
      // if (usersRes.ok) {
      //   const usersData = await usersRes.json();
      //   setSpecialNeedTrainers(usersData.users || []);
      // }

    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async () => {
    if (!selectedTrainer || !selectedMember) {
      toast.error("Please select both trainer and member");
      return;
    }

    try {
      setCreating(true);

      const response = await fetch("/api/trainer-assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trainerId: selectedTrainer,
          memberId: selectedMember,
          assignmentNotes: assignmentNotes,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setCreateModalOpen(false);
        setSelectedTrainer("");
        setSelectedMember("");
        setAssignmentNotes("");
        fetchData(); // Refresh assignments
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to create assignment");
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
      toast.error("Error creating assignment");
    } finally {
      setCreating(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Special Need Trainer Assignments
          </h2>
          <p className="text-muted-foreground">
            Assign special need trainers to special need members
          </p>
        </div>
        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Assignment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Trainer Assignment</DialogTitle>
              <DialogDescription>
                Assign a special need trainer to a special need member
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="trainer">Select Special Need Trainer</Label>
                <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a trainer" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialNeedTrainers.map((trainer) => (
                      <SelectItem key={trainer._id} value={trainer.userId}>
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          {trainer.name} - {trainer.specialization}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="member">Select Special Need Member</Label>
                <Select value={selectedMember} onValueChange={setSelectedMember}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a member" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialNeedMembers.map((member) => (
                      <SelectItem key={member._id} value={member._id}>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {member.name} - {member.email}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Assignment Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={assignmentNotes}
                  onChange={(e) => setAssignmentNotes(e.target.value)}
                  placeholder="Add any specific notes about this assignment..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setCreateModalOpen(false)}
                disabled={creating}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateAssignment}
                disabled={creating}
              >
                {creating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Assignment
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {assignments.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Assignments Yet</h3>
            <p className="text-muted-foreground">
              No trainer assignments have been created yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {assignments.map((assignment) => (
            <Card
              key={assignment._id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5" />
                      {assignment.trainerName} ↔ {assignment.memberName}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Assigned: {formatDate(assignment.createdAt)}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={
                        assignment.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {assignment.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Special Need Trainer
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>Name:</strong> {assignment.trainerName}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {assignment.trainerEmail}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Special Need Member
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>Name:</strong> {assignment.memberName}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {assignment.memberEmail}
                      </div>
                    </div>
                  </div>
                </div>

                {assignment.assignmentNotes && (
                  <div className="mb-4 p-3 bg-muted rounded-lg">
                    <h5 className="font-medium mb-1">Assignment Notes:</h5>
                    <p className="text-sm text-muted-foreground">
                      {assignment.assignmentNotes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialNeedTrainerAssignments;
