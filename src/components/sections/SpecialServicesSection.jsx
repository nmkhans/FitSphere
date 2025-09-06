"use client";

import { Heart, Accessibility, Baby, Apple } from "lucide-react";

export default function SpecialServicesSection() {
    return (
        <section id="special-services" className="py-16 px-4 max-w-7xl mx-auto">
            <div className="border-t border-gray-200 pt-16">
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <span className="bg-black-primary text-green-primary px-4 py-2 rounded-lg text-lg font-semibold">
                            Inclusive Fitness Solutions
                        </span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold font-outfit text-title-text leading-tight mb-4">
                        Specialized Care Services
                    </h2>
                    <p className="text-sub-text text-lg leading-relaxed max-w-3xl mx-auto">
                        We believe fitness should be accessible to everyone. Our specialized programs cater to
                        individuals with unique needs, including people with disabilities and expecting mothers,
                        ensuring safe and effective fitness journeys.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                    {/* Images with Geometric Shapes */}
                    <div className="space-y-6">
                        <div className="w-full">
                            <img
                                src="/Images/pregnant-sports-woman-with-fit-ball-gym-concept-sports-lifestyle.jpg"
                                alt="Prenatal fitness training"
                                className="w-full h-[350px] sm:h-[400px] object-cover rounded-2xl"
                            />
                        </div>
                        <div className="w-full">
                            <img
                                src="/Images/full-body-image-huge-bodybuilder-crutches-gym-club.jpg"
                                alt="Adaptive fitness equipment"
                                className="w-full h-[350px] sm:h-[450px] object-cover rounded-2xl"
                            />
                        </div>
                    </div>

                    {/* 3 Consolidated Service Cards */}
                    <div className="space-y-8 sm:space-y-16">
                        <div className="flex gap-4 sm:gap-6 items-start">
                            <div className="text-gray-900 mt-1 flex-shrink-0">
                                <Accessibility className="w-8 h-8 sm:w-10 sm:h-10 stroke-1" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Adaptive Fitness Programs
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                    Comprehensive workout routines designed for individuals with physical disabilities,
                                    featuring accessible equipment, certified adaptive trainers, and personalized
                                    modifications to ensure everyone can achieve their fitness goals safely.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 sm:gap-6 items-start">
                            <div className="text-gray-900 mt-1 flex-shrink-0">
                                <Baby className="w-8 h-8 sm:w-10 sm:h-10 stroke-1" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Prenatal & Postnatal Care
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                    Specialized exercise programs for expecting and new mothers, focusing on safe
                                    strength training, flexibility, pelvic floor health, and postpartum recovery with
                                    guidance from certified prenatal fitness specialists.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 sm:gap-6 items-start">
                            <div className="text-gray-900 mt-1 flex-shrink-0">
                                <Heart className="w-8 h-8 sm:w-10 sm:h-10 stroke-1" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Therapeutic & Medical Support
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                    Gentle rehabilitation exercises and therapeutic treatments combined with medical
                                    clearance coordination. Our team works with healthcare providers to ensure safe,
                                    appropriate programs that support recovery and improve quality of life.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 sm:gap-6 items-start">
                            <div className="text-gray-900 mt-1 flex-shrink-0">
                                <Apple className="w-8 h-8 sm:w-10 sm:h-10 stroke-1" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Specialized Nutrition Counseling
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                    Customized nutrition plans for individuals with disabilities and pregnant women,
                                    addressing unique dietary needs, medication interactions, and health conditions. Our
                                    certified nutritionists create meal plans that support fitness goals and overall
                                    well-being.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
