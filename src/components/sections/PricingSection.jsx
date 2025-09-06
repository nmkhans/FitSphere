"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const pricingPlans = [
    {
        name: "Basic",
        price: "$39",
        period: "/month",
        description: "Perfect for general fitness enthusiasts",
        features: [
            "Access to all gym equipment",
            "Basic workout plans",
            "Locker room access",
            "Mobile app access",
            "Group fitness classes",
            "Progress tracking basics",
        ],
        popular: false,
        colorScheme: "basic",
    },
    {
        name: "Premium",
        price: "$79",
        period: "/month",
        description: "Complete fitness experience with advanced features",
        features: [
            "Everything in Basic",
            "Diet planning access from trainer",
            "Gym wiki & machine learning guides",
            "Advanced workout plans",
            "Personal trainer consultation",
            "Nutrition guidance & meal plans",
            "Priority booking",
            "Guest passes (2/month)",
        ],
        popular: true,
        colorScheme: "premium",
    },
    {
        name: "Specialized",
        price: "$99",
        period: "/month",
        description: "Tailored for special needs & pregnancy fitness",
        features: [
            "Premium features included",
            "Pregnancy-safe exercise programs",
            "Specialized disability-friendly workouts",
            "Dedicated specialized trainer access",
            "Customized diet plans for special needs",
            "Medical condition-aware fitness plans",
            "24/7 specialist support",
            "Adaptive equipment access",
            "Family member access (1 person)",
        ],
        popular: false,
        colorScheme: "specialized",
    },
];

export default function PricingSection() {
    return (
        <section id="pricing" className="py-20 relative">
            <div className="main-container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-outfit">
                        Choose Your Fitness Journey
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                        From basic fitness to specialized care - find the perfect plan that matches your unique needs
                        and goals
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
                                <Button className="w-full transition-all duration-300 transform hover:scale-105 text-white bg-black-primary hover:bg-black-primary mt-auto cursor-pointer">
                                    Choose Plan
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
