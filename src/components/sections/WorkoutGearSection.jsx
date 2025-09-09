"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const categories = ["Accessories", "Shoes", "Bags", "Fitness Powder", "Tracking Watches"];

const products = [
    {
        id: 1,
        name: "Stainless Water Bottle",
        priceRange: "$18.00 – $22.00",
        image: "/modern-gym-interior-with-equipment-and-people-work.jpg",
        category: "Accessories",
        isOnSale: false,
        isFavorite: false,
    },
    {
        id: 2,
        name: "Skipping Rope",
        priceRange: "$130.00 – $259.00",
        image: "/modern-gym-interior-with-equipment-and-people-work.jpg",
        category: "Accessories",
        isOnSale: true,
        isFavorite: false,
    },
    {
        id: 3,
        name: "Fitness Kettlebell",
        priceRange: "$199.00 – $229.00",
        image: "/modern-gym-interior-with-equipment-and-people-work.jpg",
        category: "Accessories",
        isOnSale: false,
        isFavorite: false,
    },
    {
        id: 4,
        name: "Adjustable Dumbbells",
        priceRange: "$45.00 – $60.00",
        image: "/modern-gym-interior-with-equipment-and-people-work.jpg",
        category: "Accessories",
        isOnSale: false,
        isFavorite: false,
    },
];

export default function WorkoutGearSection() {
    const [activeCategory, setActiveCategory] = useState("Accessories");

    const filteredProducts = products.filter((product) => product.category === activeCategory);

    return (
        <section id="workout-gear" className="py-20 lg:py-32 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
            <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-l from-green-primary/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-r from-green-primary/10 to-transparent rounded-full blur-3xl"></div>

            <div className="main-container mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header Section */}
                <div className="text-center space-y-6 mb-16">
                    <div className="space-y-4">
                        <Badge
                            variant="secondary"
                            className="w-fit bg-black-primary text-green-primary border-accent animate-float text-sm py-2 px-4 mx-auto">
                            Our Fitness, Upgraded
                        </Badge>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold text-title-text text-balance leading-tight">
                            Workout Gear
                            <span className="block text-primary">Collection</span>
                        </h2>
                    </div>
                </div>

                {/* Category Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={activeCategory === category ? "default" : "outline"}
                            onClick={() => setActiveCategory(category)}
                            className={`
                                px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 border-2 cursor-pointer
                                ${
                                    activeCategory === category
                                        ? "bg-green-primary hover:bg-green-dark text-black-primary border-green-primary shadow-lg"
                                        : "bg-transparent hover:bg-green-primary/10 text-title-text border-gray-300 hover:border-green-primary"
                                }
                            `}>
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {filteredProducts.map((product) => (
                        <Card
                            key={product.id}
                            className="group cursor-pointer border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden">
                            <div className="relative aspect-[4/3]">
                                {/* Sale Badge */}
                                {product.isOnSale && (
                                    <div className="absolute top-4 right-4 z-10">
                                        <Badge className="bg-black-primary text-white text-xs px-2 py-1">Sale</Badge>
                                    </div>
                                )}

                                {/* Product Image */}
                                <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Add to Cart Button - Shows on hover */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Button
                                        size="sm"
                                        className="bg-green-primary hover:bg-green-dark text-black-primary shadow-lg cursor-pointer">
                                        <ShoppingCart className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <CardContent className="p-6 space-y-2">
                                <h3 className="font-outfit font-semibold text-lg text-title-text group-hover:text-primary transition-colors duration-300">
                                    {product.name}
                                </h3>
                                <p className="text-sub-text font-medium">{product.priceRange}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Check All Products Button */}
                <div className="text-center">
                    <Button
                        size="lg"
                        className="text-lg px-8 py-4 bg-transparent hover:bg-green-primary/10 text-title-text border-2 border-title-text hover:border-green-primary hover:text-primary transition-all duration-300 transform hover:scale-105 cursor-pointer">
                        Check All Products
                    </Button>
                </div>
            </div>
        </section>
    );
}
