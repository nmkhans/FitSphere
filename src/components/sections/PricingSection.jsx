"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

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
                <div className="max-w-4xl mx-auto text-center">
                    <div className="pt-8">
                        <Link href="/membership">
                            <Button className="px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 text-white bg-black-primary hover:bg-black-primary shadow-lg hover:shadow-xl">
                                View All Membership Plans
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
