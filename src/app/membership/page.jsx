"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown } from "lucide-react";
import MembershipModal from "./MembershipModal";

const pricingPlans = [
    {
        name: "Pro Active",
        price: "$29",
        period: "/month",
        description: "Perfect for general fitness enthusiasts",
        planType: "basic-member",
        features: [
            "Full access to basic gym equipment",
            "Locker room and shower access",
            "Fitness orientation session",
            "Access during regular gym hours",
            "Basic progress tracking",
            "Equipment usage guide",
            "Community forum access",
        ],
        popular: false,
        colorScheme: "basic",
        purchaseButton: "Join Pro Active",
    },
    {
        name: "Elite Performance", 
        price: "$59",
        period: "/month",
        description: "Complete fitness experience with advanced features",
        planType: "premium-member",
        features: [
            "All Pro Active features included",
            "Advanced workout plans",
            "Nutrition planning and guidance",
            "24/7 AI trainer support",
            "AI Exercise Recommender",
            "Personal training sessions",
            "One-on-one personalized training",
            "Private or small group training slots",
            "Priority trainer booking system",
            "Direct messaging with trainer",
            "Priority customer support",
        ],
        popular: true,
        colorScheme: "premium",
        purchaseButton: "Join Elite Performance",
    },
    {
        name: "Wellness Plus",
        price: "$89",
        period: "/month", 
        description: "Tailored for special needs & comprehensive care",
        planType: "special-need",
        features: [
            "All Elite Performance features included",
            "Specialized programs for special needs",
            "Dedicated specialized trainer",
            "Custom meal planning for health conditions",
            "Health monitoring and tracking",
            "Weekly health consultations",
            "Adaptive equipment access",
            "Support for pregnant/disabled/medical needs",
            "Personalized low-intensity programs",
            "Regular wellness check-ins",
        ],
        popular: false,
        colorScheme: "specialized",
        purchaseButton: "Join Wellness Plus",
    },
];

export default function MembershipCards() {
    const [open, setOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    
    const action = searchParams.get('action'); // 'upgrade', 'downgrade', or null
    const currentUserRole = session?.user?.role;
    const isTrainer = currentUserRole === 'trainer';

    const handleOpen = (plan) => {
        if (isTrainer) {
            return; // Don't open modal for trainers
        }
        setSelectedPlan(plan);
        setOpen(true);
    };

    // Function to check if the current plan is the user's current membership
    const isCurrentPlan = (planType) => {
        return currentUserRole === planType;
    };

    // Function to get button text based on plan and user status
    const getButtonText = (plan) => {
        if (isTrainer) {
            return "Not Available for Trainers";
        }
        if (isCurrentPlan(plan.planType)) {
            return "Current Plan";
        }
        return plan.purchaseButton;
    };

    return (
        <section id="pricing" className="py-20 relative">
            <div className="main-container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-outfit">
                        {action === 'upgrade' ? 'Upgrade Your Membership' : 
                         action === 'downgrade' ? 'Change Your Membership' : 
                         'Fuel Your Fitness Journey'}
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                        {action === 'upgrade' ? 'Choose a higher plan to unlock more features and benefits.' :
                         action === 'downgrade' ? 'Select a different plan that better fits your needs.' :
                         'Choose the perfect membership plan and take the next step toward your health goals.'}
                    </p>
                    {session?.user && (
                        <div className="flex flex-col items-center space-y-3">
                            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                                Current Plan: {session.user.role === 'basic-member' ? 'Pro Active' : 
                                             session.user.role === 'premium-member' ? 'Elite Performance' :
                                             session.user.role === 'special-need' ? 'Wellness Plus' : 
                                             session.user.role === 'trainer' ? 'Trainer Account' : 'None'}
                            </Badge>
                            {isTrainer && (
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl">
                                    <p className="text-amber-800 text-sm font-medium">
                                        🏋️‍♂️ As a trainer, you have access to all gym facilities and trainer features. 
                                        Membership plans are designed for gym members only.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {pricingPlans.map((plan, index) => {
                        const isCurrent = isCurrentPlan(plan.planType);
                        
                        return (
                            <Card
                                key={index}
                                className={`relative transition-all duration-500 transform hover:scale-105 flex flex-col h-full ${
                                    isCurrent
                                        ? "border-green-500 border-2 shadow-2xl bg-gradient-to-b from-green-50 to-green-100"
                                        : plan.colorScheme === "basic"
                                        ? "border-gray-300 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10"
                                        : plan.colorScheme === "premium"
                                        ? "border-green-primary shadow-2xl bg-gradient-to-b from-white to-green-50 border-2"
                                        : plan.colorScheme === "specialized"
                                        ? "border-black-primary shadow-xl bg-gradient-to-b from-white to-slate-50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10"
                                        : "border-border/50 shadow-xl bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10"
                                }`}>
                                {plan.popular && !isCurrent && (
                                    <Badge
                                        className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${
                                            plan.colorScheme === "premium"
                                                ? "bg-black-primary text-base text-green-primary"
                                                : "bg-primary"
                                        }`}>
                                        Most Popular
                                    </Badge>
                                )}
                                {isCurrent && (
                                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white">
                                        <Crown className="h-3 w-3 mr-1" />
                                        Your Current Plan
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
                                                        isCurrent
                                                            ? "text-green-600"
                                                            : plan.colorScheme === "basic"
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
                                        disabled={isCurrent || isTrainer}
                                        className={`w-full transition-all duration-300 transform hover:scale-105 mt-auto ${
                                            isCurrent || isTrainer
                                                ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50"
                                                : "text-white bg-black-primary hover:bg-black-primary cursor-pointer"
                                        }`}>
                                        {getButtonText(plan)}
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Modal */}
            {selectedPlan && <MembershipModal open={open} setOpen={setOpen} selectedPlan={selectedPlan} />}
        </section>
    );
}
