"use client";

import React from "react";
import { SessionProvider, useSession } from "next-auth/react";
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
  return (
    <SessionProvider>
      <ModalContent open={open} setOpen={setOpen} selectedPlan={selectedPlan} />
    </SessionProvider>
  );
}

function ModalContent({ open, setOpen, selectedPlan }) {
  const { data: session } = useSession();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.plan = selectedPlan.name;

    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);

      alert(result.success ? "Membership updated!" : "Error updating");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
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
            <Button type="submit" className="bg-[#93EA33] hover:bg-[#77b036]">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
