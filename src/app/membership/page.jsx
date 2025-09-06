"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import MembershipModal from "./MembershipModal";

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

export default function MembershipCards() {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleOpen = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
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

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((plan) => (
          <motion.div
            key={plan.id}
            className={`bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 relative h-fit ${
              plan.id === 3 ? "glow-green" : ""
            }`}
            whileHover={{ scale: 1.05 }}
          >
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

      {/* Modal */}
      {selectedPlan && (
        <MembershipModal
          open={open}
          setOpen={setOpen}
          selectedPlan={selectedPlan}
        />
      )}
    </section>
  );
}
