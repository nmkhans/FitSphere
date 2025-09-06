"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
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

const data = [
  {
    id: 2,
    name: "Pro Active",
    price: 60,
    duration: "per month",
    features: [
      "Full access to all gym equipment",
      "Locker room and shower access",
      "Fitness orientation session",
      "Access during regular gym hours",
      "24/7 AI trainer support",
      "Specialized trainer support",
      "Customized diet plans",
      "Personalized exercise program",
      "Progress tracking via member dashboard",
    ],
    purchaseButton: "Join Pro Active",
    badge: "Most Popular",
  },
  {
    id: 3,
    name: "Elite Performance",
    price: 120,
    duration: "per month",
    features: [
      "Full access to all gym equipment",
      "Locker room and shower access",
      "Fitness orientation session",
      "Access during regular gym hours",
      "24/7 AI trainer support",
      "Specialized trainer support",
      "Customized diet plans",
      "Personalized exercise program",
      "Progress tracking via member dashboard",
      "One-on-one personalized training sessions",
      "Private or small group training slots",
      "Priority trainer booking system",
      "Direct messaging with trainer",
      "Exclusive discounts in gym shop",
    ],
    purchaseButton: "Join Elite Performance",
    badge: "Best Value",
  },
  {
    id: 4,
    name: "Wellness Plus",
    price: 80,
    duration: "per month",
    features: [
      "Full access to all gym equipment",
      "Locker room and shower access",
      "Fitness orientation session",
      "Access during regular gym hours",
      "24/7 AI trainer support",
      "Personalized low-intensity training programs",
      "Special diet plan for health conditions",
      "Support for pregnant/disabled/medical needs",
      "Dedicated trainer guidance",
      "Regular health and wellness check-ins",
    ],
    purchaseButton: "Join Wellness Plus",
    badge: "Special Care",
  },
];

export default function Membership() {
  const { data: session } = useSession();
//   const session = { user: { name: "John Doe", email: "4KtJd@example.com", image: "https://example.com/avatar.jpg" } };
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleOpen = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.plan = selectedPlan.name;

    try {
    const res = await fetch("/api/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);

    if (result.success) {
      alert("Membership data updated successfully!");
    } else {
      alert("Error updating data.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }
    setOpen(false);
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-gradient-to-r text-[#042618] from-purple-50 to-indigo-50">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Fuel Your Fitness Journey
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Choose the perfect membership plan and take the next step toward your
          health goals.
        </p>
      </div>

      {/* Membership Cards */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((plan) => (
          <motion.div
            key={plan.id}
            className={`bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 relative h-fit ${
              plan.id === 3 ? "glow-green" : ""
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {/* Badge */}
            {plan.badge && (
              <span className="absolute top-4 right-4 bg-[#93EA33] text-white text-xs font-semibold px-3 py-1 rounded-full">
                {plan.badge}
              </span>
            )}

            <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>

            <p className="text-3xl font-extrabold mb-4">
              ${plan.price}{" "}
              <span className="text-base font-medium text-gray-500">
                /{plan.duration}
              </span>
            </p>

            <ul className="mb-6 space-y-2 text-gray-600 flex-1">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex gap-2">
                  <FaCheckCircle
                    className=" text-[#93EA33] mt-1 flex-shrink-0"
                    size={14}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleOpen(plan)}
              className="mt-auto bg-[#93EA33] hover:bg-[#77b036] text-white font-semibold py-3 rounded-lg"
            >
              {plan.purchaseButton}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Modal Form */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-2xl">
          <DialogHeader>
            <DialogTitle className={"text-2xl font-semibold"}>Join {selectedPlan?.name} Plan</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {/* Name */}
            <div>
              <Label>Name</Label>
              <Input name="name" value={session?.user?.name || ""} readOnly />
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input name="email" value={session?.user?.email || ""} readOnly />
            </div>

            {/* Height */}
            <div>
              <Label>Height (cm)</Label>
              <Input name="height" type="number" placeholder="Enter height" />
            </div>

            {/* Current Weight */}
            <div>
              <Label>Current Weight (kg)</Label>
              <Input name="currentWeight" type="number" placeholder="Enter current weight" />
            </div>

            {/* Current Fat % */}
            <div>
              <Label>Current Fat %</Label>
              <Input name="currentFatPercentage" type="number" placeholder="Enter current fat percentage" />
            </div>

            {/* Current Muscle Mass */}
            <div>
              <Label>Current Muscle Mass (kg)</Label>
              <Input name="currentMuscleMass" type="number" placeholder="Enter current muscle mass" />
            </div>

            {/* Goal */}
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

            {/* Goal Weight */}
            <div>
              <Label>Goal Weight (kg)</Label>
              <Input name="goalWeight" type="number" placeholder="Enter goal weight" />
            </div>

            {/* Goal Fat % */}
            <div>
              <Label>Goal Fat %</Label>
              <Input name="goalFatPercentage" type="number" placeholder="Enter goal fat percentage" />
            </div>

            {/* Goal Muscle Mass */}
            <div>
              <Label>Goal Muscle Mass (kg)</Label>
              <Input name="goalMuscleMass" type="number" placeholder="Enter goal muscle mass" />
            </div>

            {/* Extra field for Wellness Plus */}
            {selectedPlan?.name === "Wellness Plus" && (
              <div>
                <Label>Your Disabilities / Health Issues</Label>
                <Input name="disabilities" placeholder="Describe your conditions" />
              </div>
            )}

            <DialogFooter className={"col-span-1 md:col-span-2 mx-auto"}>
              <Button type="submit" className="bg-[#93EA33] hover:bg-[#77b036]">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
