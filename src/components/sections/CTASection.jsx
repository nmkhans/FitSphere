"use client";

import { Button } from "@/components/ui/button";

export default function CTASection() {
    return (
        <section className="py-20 bg-accent text-accent-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-outfit">
                    Ready to Start Your Fitness Journey?
                </h2>
                <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto font-lato">
                    Get the latest fitness tips, workout routines, and exclusive offers delivered to your inbox
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 h-12 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-primary text-black-primary"
                    />
                    <Button
                        size="lg"
                        variant="secondary"
                        className="h-12 px-6 bg-green-primary hover:bg-green-dark text-lg text-black-primary shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                        Subscribe
                    </Button>
                </div>
            </div>
        </section>
    );
}
