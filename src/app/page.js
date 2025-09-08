"use client";

import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PricingSection from "@/components/sections/PricingSection";
import CTASection from "@/components/sections/CTASection";
import WorkoutGearSection from "@/components/sections/WorkoutGearSection";
import GymServicesSection from "@/components/sections/GymServicesSection";
import SpecialServicesSection from "@/components/sections/SpecialServicesSection";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <HeroSection />
            <FeaturesSection />
            <GymServicesSection />
            <SpecialServicesSection />
            <WorkoutGearSection />
            <PricingSection />
            <CTASection />
        </div>
    );
}
