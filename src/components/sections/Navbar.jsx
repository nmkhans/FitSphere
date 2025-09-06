"use client";

import { Button } from "@/components/ui/button";
import { SimpleDropdown, DropdownItem } from "@/components/ui/dropdown-menu";
import { Dumbbell, Users, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when clicking outside or on escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };
    return (
        <>
            <nav className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="main-container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="p-2 bg-black-primary rounded-lg animate-glow">
                                <Dumbbell className="h-6 w-6 text-green-primary" />
                            </div>
                            <span className="text-xl font-bold text-primary-text">FitSphere</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8 **:font-lato">
                            <Link
                                href="#home"
                                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                                Home
                            </Link>
                            <Link
                                href="#features"
                                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                                Features
                            </Link>
                            <Link
                                href="#special-services"
                                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                                Special Care
                            </Link>
                            <Link
                                href="#pricing"
                                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                                Pricing
                            </Link>
                            <Link
                                href="/blog"
                                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                                Blog
                            </Link>
                            <Link
                                href="/review"
                                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                                Reviews
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Get Started Button - visible on all screen sizes */}
                            <SimpleDropdown
                                trigger={
                                    <Button className="bg-green-primary hover:bg-green-dark text-primary-text shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                        Get Started
                                    </Button>
                                }>
                                <DropdownItem
                                    onClick={() => console.log("Apply as Trainer clicked")}
                                    className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    Apply as Trainer
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() => console.log("Join as Member clicked")}
                                    className="flex items-center gap-2">
                                    <Dumbbell className="h-4 w-4" />
                                    Join as Member
                                </DropdownItem>
                            </SimpleDropdown>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-accent/10 transition-colors duration-200 cursor-pointer"
                                aria-label="Toggle mobile menu">
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeMobileMenu} />}

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-80 max-w-sm bg-card border-l border-border z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-border">
                        <div className="flex items-center space-x-2">
                            <div className="p-2 bg- rounded-lg animate-glow">
                                <Dumbbell className="h-5 w-5 text-" />
                            </div>
                            <span className="text-lg font-bold text-primary">FitSphere</span>
                        </div>
                        <button
                            onClick={closeMobileMenu}
                            className="p-2 rounded-md text-foreground hover:text-primary hover:bg-accent/10 transition-colors duration-200"
                            aria-label="Close mobile menu">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 px-6 py-8">
                        <nav className="space-y-6">
                            <Link
                                href="#home"
                                onClick={closeMobileMenu}
                                className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-2">
                                Home
                            </Link>
                            <Link
                                href="#features"
                                onClick={closeMobileMenu}
                                className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-2">
                                Features
                            </Link>
                            <Link
                                href="#special-services"
                                onClick={closeMobileMenu}
                                className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-2">
                                Special Care
                            </Link>
                            <Link
                                href="#pricing"
                                onClick={closeMobileMenu}
                                className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-2">
                                Pricing
                            </Link>
                            <Link
                                href="/blog"
                                onClick={closeMobileMenu}
                                className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-2">
                                Blog
                            </Link>
                            <Link
                                href="/review"
                                onClick={closeMobileMenu}
                                className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-2">
                                Reviews
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
