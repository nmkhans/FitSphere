"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
            {/* SVG Background Element */}
            <div className="absolute inset-0 overflow-hidden">
                <svg
                    className="absolute bottom-0 left-0 w-full h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] xl:h-[36rem] 2xl:h-[40rem] opacity-80"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 70"
                    fill="none">
                    <path d="M31.1 12.1C62.9 35.8 100 0 100 0V70H0.08C0.08 70 -0.63 -20.7 31.1 12.1Z" fill="#C8F892" />
                </svg>
            </div>
            <div className="main-container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <Badge
                                variant="secondary"
                                className="w-fit bg-black-primary text-green-primary border-accent animate-float text-md py-2">
                                Premium Fitness Management
                            </Badge>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-outfit font-bold text-title-text text-balance leading-tight">
                                Transform Your
                                <span className="text-primary"> Fitness Journey</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-sub-text text-pretty max-w-2xl">
                                Join thousands of members who have achieved their fitness goals with our comprehensive
                                gym management system, expert trainers, and cutting-edge facilities.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="text-lg px-8 bg-green-primary hover:bg-green-dark text-black-primary shadow-lg hover:shadow-accent/25 transition-all duration-300 cursor-pointer transform hover:scale-105">
                                Start Your Journey
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                size="lg"
                                className="text-lg px-8 bg-black-primary hover:bg-black-primary text-white cursor-pointer transition-all duration-300 transform hover:scale-105">
                                View Pricing
                            </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4">
                            <LiquidGlass
                                variant="card"
                                className="text-center p-4 rounded-lg"
                                rippleEffect={true}
                                stretchOnDrag={false}>
                                <div className="text-2xl sm:text-3xl font-bold text-primary-text">200+</div>
                                <div className="text-xs sm:text-sm text-sub-text">Active Members</div>
                            </LiquidGlass>
                            <LiquidGlass
                                variant="card"
                                className="text-center p-4 rounded-lg"
                                rippleEffect={true}
                                stretchOnDrag={false}>
                                <div className="text-2xl sm:text-3xl font-bold text-primary-text">50+</div>
                                <div className="text-xs sm:text-sm text-sub-text">Expert Trainers</div>
                            </LiquidGlass>
                            <LiquidGlass
                                variant="card"
                                className="text-center p-4 rounded-lg"
                                rippleEffect={true}
                                stretchOnDrag={false}>
                                <div className="text-2xl sm:text-3xl font-bold text-primary">98%</div>
                                <div className="text-xs sm:text-sm text-sub-text">Success Rate</div>
                            </LiquidGlass>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl animate-pulse"></div>
                        <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl flex items-center justify-center border border-primary/20 backdrop-blur-sm overflow-hidden">
                            <Image
                                src="/Images/modern-gym-interior-with-equipment-and-people-work.jpg"
                                alt="Modern gym interior with equipment and people working out"
                                fill
                                className="rounded-3xl object-cover shadow-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
