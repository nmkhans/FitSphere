"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function MembershipModal({ open, setOpen, selectedPlan }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent trainers from purchasing memberships
    if (session?.user?.role === 'trainer') {
      toast.error("Trainers cannot purchase membership plans.");
      setOpen(false);
      return;
    }
    
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.plan = selectedPlan.name;

    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log(result);

      if (result.success) {
        const membershipMessage = getMembershipSuccessMessage(selectedPlan.name);
        toast.success(membershipMessage, {
          duration: 4000,
          icon: '🎉',
        });
        
        // Redirect to appropriate dashboard based on role
        const dashboardRoute = getDashboardRoute(result.user.role);
        router.push(dashboardRoute);
        
        // Force a page reload to refresh the session
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        toast.error("❌ Unable to activate membership: " + (result.message || "Please try again or contact support."));
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Something went wrong while processing your membership. Please try again or contact support.");
    }
    setLoading(false);
    setOpen(false);
  };

  const getDashboardRoute = (role) => {
    switch (role) {
      case 'admin':
        return '/dashboard/admin';
      case 'trainer':
        return '/dashboard/trainer';
      case 'special-need':
        return '/dashboard/special-member';
      case 'premium-member':
      case 'basic-member':
      default:
        return '/dashboard';
    }
  };

  const getMembershipSuccessMessage = (planName) => {
    switch (planName) {
      case 'Pro Active':
        return 'Welcome to Pro Active! Your membership is now active. Ready to achieve your fitness goals!';
      case 'Elite Performance':
        return 'Welcome to Elite Performance! Enjoy personalized training and exclusive benefits!';
      case 'Wellness Plus':
        return 'Welcome to Wellness Plus! Your specialized membership is now active.';
      default:
        return 'Membership activated successfully! Welcome to FitSphere!';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-foreground">
            Join {selectedPlan?.name} Plan
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleFormSubmit}
          className="grid gap-6 grid-cols-1 md:grid-cols-2"
        >
          <div>
            <Label>Name</Label>
            <Input name="name" value={session?.user?.name || ""} readOnly />
          </div>

          <div>
            <Label>Email</Label>
            <Input name="email" value={session?.user?.email || ""} readOnly />
          </div>

          <div>
            <Label>Height (cm)</Label>
            <Input name="height" type="number" placeholder="Enter height" />
          </div>

          <div>
            <Label>Current Weight (kg)</Label>
            <Input
              name="currentWeight"
              type="number"
              placeholder="Enter current weight"
            />
          </div>

          <div>
            <Label>Current Fat %</Label>
            <Input
              name="currentFatPercentage"
              type="number"
              placeholder="Enter current fat %"
            />
          </div>

          <div>
            <Label>Current Muscle Mass (kg)</Label>
            <Input
              name="currentMuscleMass"
              type="number"
              placeholder="Enter current muscle mass"
            />
          </div>

          <div>
            <Label>Goal</Label>
            <Select name="goal">
              <SelectTrigger>
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bulking">Bulking</SelectItem>
                <SelectItem value="cutting">Cutting</SelectItem>
                <SelectItem value="weightLoss">Weight Loss</SelectItem>
                <SelectItem value="muscleGain">Muscle Gain</SelectItem>
                <SelectItem value="endurance">Endurance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Goal Weight (kg)</Label>
            <Input
              name="goalWeight"
              type="number"
              placeholder="Enter goal weight"
            />
          </div>

          <div>
            <Label>Goal Fat %</Label>
            <Input
              name="goalFatPercentage"
              type="number"
              placeholder="Enter goal fat %"
            />
          </div>

          <div>
            <Label>Goal Muscle Mass (kg)</Label>
            <Input
              name="goalMuscleMass"
              type="number"
              placeholder="Enter goal muscle mass"
            />
          </div>

          {selectedPlan?.name === "Wellness Plus" && (
            <div className="md:col-span-2">
              <Label>Your Disabilities / Health Issues</Label>
              <Input
                name="disabilities"
                placeholder="Describe your conditions"
              />
            </div>
          )}

          <DialogFooter className="col-span-1 md:col-span-2 mx-auto">
            <Button
              disabled={loading}
              type="submit"
              className="bg-primary hover:bg-primary/80 text-primary-foreground"
            >
              {loading ? "Updating..." : "Update Membership"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
