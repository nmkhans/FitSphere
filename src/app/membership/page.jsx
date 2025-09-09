"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import MembershipModal from "./MembershipModal";

const pricingPlans = [
    {
        name: "Pro Active",
        price: "$60",
        period: "/month",
        description: "Perfect for general fitness enthusiasts",
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
        popular: false,
        colorScheme: "basic",
        purchaseButton: "Join Pro Active",
    },
    {
        name: "Elite Performance",
        price: "$120",
        period: "/month",
        description: "Complete fitness experience with advanced features",
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
        popular: true,
        colorScheme: "premium",
        purchaseButton: "Join Elite Performance",
    },
    {
        name: "Wellness Plus",
        price: "$80",
        period: "/month",
        description: "Tailored for special needs & pregnancy fitness",
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
        popular: false,
        colorScheme: "specialized",
        purchaseButton: "Join Wellness Plus",
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
        <section id="pricing" className="py-20 relative">
            <div className="main-container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-outfit">
                        Fuel Your Fitness Journey
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Choose the perfect membership plan and take the next step toward your health goals.
                    </p>
                </div>
                <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`relative transition-all duration-500 transform hover:scale-105 flex flex-col h-full ${
                                plan.colorScheme === "basic"
                                    ? "border-gray-300 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10"
                                    : plan.colorScheme === "premium"
                                    ? "border-green-primary shadow-2xl bg-gradient-to-b from-white to-green-50 border-2"
                                    : plan.colorScheme === "specialized"
                                    ? "border-black-primary shadow-xl bg-gradient-to-b from-white to-slate-50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10"
                                    : "border-border/50 shadow-xl bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10"
                            }`}>
                            {plan.popular && (
                                <Badge
                                    className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${
                                        plan.colorScheme === "premium"
                                            ? "bg-black-primary text-base text-green-primary"
                                            : "bg-primary"
                                    }`}>
                                    Most Popular
                                </Badge>
                            )}
                            <CardHeader className="text-center pb-4">
                                <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                                <CardDescription className="text-sm sm:text-base">{plan.description}</CardDescription>
                                <div className="pt-4">
                                    <span className="text-3xl sm:text-4xl font-bold text-foreground">{plan.price}</span>
                                    <span className="text-muted-foreground text-sm sm:text-base">{plan.period}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-grow space-y-4">
                                <ul className="space-y-3 flex-grow">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start space-x-3">
                                            <Check
                                                className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                                                    plan.colorScheme === "basic"
                                                        ? "text-gray-600"
                                                        : plan.colorScheme === "premium"
                                                        ? "text-green-primary"
                                                        : plan.colorScheme === "specialized"
                                                        ? "text-black-primary"
                                                        : "text-primary"
                                                }`}
                                            />
                                            <span className="text-xs sm:text-sm text-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    onClick={() => handleOpen(plan)}
                                    className="w-full transition-all duration-300 transform hover:scale-105 text-white bg-black-primary hover:bg-black-primary mt-auto cursor-pointer">
                                    {plan.purchaseButton}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedPlan && <MembershipModal open={open} setOpen={setOpen} selectedPlan={selectedPlan} />}
        </section>
    );
}
