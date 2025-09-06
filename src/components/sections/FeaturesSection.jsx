"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Users, Trophy } from "lucide-react";

const features = [
    {
        icon: Dumbbell,
        title: "Modern Gym Equipments",
        description: "Latest fitness equipment and technology for optimal workouts",
    },
    {
        icon: Users,
        title: "Expert Trainers",
        description: "Certified professionals to guide your fitness journey",
    },
    {
        icon: Trophy,
        title: "Proven Results",
        description: "Track your progress with our comprehensive analytics",
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="py-20 bg-muted/30 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
            <div className="main-container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-primary-text">
                        Why Choose FitSphere?
                    </h2>
                    <p className="text-lg sm:text-xl text-sub-text font-lato max-w-3xl mx-auto">
                        Experience the difference with our premium facilities and comprehensive fitness ecosystem
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="text-center border-border/50 shadow-xl bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 transform hover:scale-105 group cursor-pointer">
                            <CardHeader className="pb-4">
                                <div className="mx-auto w-16 h-16 bg-black-primary rounded-2xl flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                                    <feature.icon className="h-8 w-8 text-green-primary group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <CardTitle className="text-xl sm:text-2xl font-outfit">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sub-text text-sm font-lato sm:text-base">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
