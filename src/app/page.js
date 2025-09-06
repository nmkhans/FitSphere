"use client";

import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PricingSection from "@/components/sections/PricingSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";
import WorkoutGearSection from "@/components/sections/WorkoutGearSection";
import GymServicesSection from "@/components/sections/GymServicesSection";
import SpecialServicesSection from "@/components/sections/SpecialServicesSection";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <GymServicesSection />
            <SpecialServicesSection />
            <WorkoutGearSection />
            <PricingSection />
            <CTASection />
            <Footer />
        </div>
    );
}
