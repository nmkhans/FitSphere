"use client";

import { Button } from "@/components/ui/button";
import { Dumbbell, Menu, X, Clock, CheckCircle, XCircle, ChevronDown, Users, Heart } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  SimpleDropdown,
  DropdownItem
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    const { data: session, status } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState(null);
    const router = useRouter();

    // Fetch application status for eligible users
    useEffect(() => {
        const fetchApplicationStatus = async () => {
            if (session && 
                session.user.role !== "trainer" && 
                session.user.role !== "special-need-trainer" &&
                session.user.role !== "admin" && 
                !session.user.membershipType) {
                try {
                    const response = await fetch("/api/trainer-applications/status");
                    if (response.ok) {
                        const data = await response.json();
                        setApplicationStatus(data);
                    }
                } catch (error) {
                    console.error("Error fetching application status:", error);
                }
            }
        };

        if (status === "authenticated") {
            fetchApplicationStatus();
        }
    }, [session, status]);

    const getDashboardLink = () => {
        if (!session?.user?.role) return "/dashboard";

        switch (session.user.role) {
            case "admin":
                return "/dashboard/admin";
            case "trainer":
                return "/dashboard/trainer";
            case "special-need-trainer":
                return "/dashboard/trainer";
            case "special-need":
                return "/dashboard/special-member";
            case "premium-member":
            case "basic-member":
            default:
                return "/dashboard";
        }
    };

    const navigateToDashboard = async () => {
        const userRole = session?.user?.role;
        const hasMembership = session?.user?.membershipType;
        
        console.log("Navbar - navigating to dashboard, role:", userRole, "membership:", hasMembership);
        
        // Direct navigation for admins and trainers (no access check needed)
        if (userRole === "admin") {
            console.log("Admin - navigating directly to admin dashboard");
            router.push("/dashboard/admin");
            return;
        }
        
        if (userRole === "trainer" || userRole === "special-need-trainer") {
            console.log("Trainer - navigating directly to trainer dashboard");
            router.push("/dashboard/trainer");
            return;
        }
        
        if (userRole === "special-need") {
            console.log("Special member - navigating directly to special member dashboard");
            router.push("/dashboard/special-member");
            return;
        }
        
        // For regular members, check if they have membership
        if (hasMembership) {
            console.log("Member with membership - navigating to member dashboard");
            router.push("/dashboard");
            return;
        }
        
        // For users without membership, check if they have trainer application
        try {
            const response = await fetch("/api/trainer-applications/status");
            if (response.ok) {
                const data = await response.json();
                if (data.hasApplication) {
                    console.log("User with trainer application - allowing dashboard access");
                    router.push("/dashboard");
                    return;
                }
            }
        } catch (error) {
            console.error("Error checking trainer application:", error);
        }
        
        // No membership and no trainer application - show membership required
        console.log("No membership or trainer application - showing membership popup");
        const Swal = (await import("sweetalert2")).default;
        Swal.fire({
            title: 'Membership Required',
            text: 'You need to purchase a membership to access the dashboard.',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Go to Membership',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/membership');
            }
        });
    };

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

    const renderTrainerButton = (isMobile = false) => {
        // Don't show anything for trainers, admins, or users with memberships
        if (session?.user?.role === "trainer" || 
            session?.user?.role === "special-need-trainer" ||
            session?.user?.role === "admin" || 
            session?.user?.membershipType) {
            return null;
        }

        const baseClasses = isMobile 
            ? "block text-lg font-medium transition-colors duration-200 py-2"
            : "hidden md:flex";

        if (!applicationStatus?.hasApplication) {
            // No application - show Apply as Trainer dropdown
            if (isMobile) {
                return (
                    <div className="flex flex-col space-y-2 py-2">
                        <Link
                            href="/apply-trainer?type=gym"
                            onClick={closeMobileMenu}
                            className={`${baseClasses} text-green-600 hover:text-green-700 flex items-center gap-2`}>
                            <Users className="h-4 w-4" />
                            Apply as Gym Trainer
                        </Link>
                        <Link
                            href="/apply-trainer?type=special-need"
                            onClick={closeMobileMenu}
                            className={`${baseClasses} text-blue-600 hover:text-blue-700 flex items-center gap-2`}>
                            <Heart className="h-4 w-4" />
                            Apply as Special Need Trainer
                        </Link>
                    </div>
                );
            }
            return (
                <SimpleDropdown
                    trigger={
                        <Button 
                            variant="outline" 
                            className={`${baseClasses} bg-green-600 hover:bg-green-700 text-white border-green-600`}
                        >
                            Apply as Trainer
                        </Button>
                    }
                >
                    <Link href="/apply-trainer?type=gym">
                        <DropdownItem>
                            <Users className="h-4 w-4" />
                            Gym Trainer
                        </DropdownItem>
                    </Link>
                    <Link href="/apply-trainer?type=special-need">
                        <DropdownItem>
                            <Heart className="h-4 w-4" />
                            Special Need Trainer
                        </DropdownItem>
                    </Link>
                </SimpleDropdown>
            );
        }

        // Has application - show Track Status button
        const { applicationStatus: status, trainerType } = applicationStatus;
        
        if (isMobile) {
            return (
                <Link
                    href="/trainer-status"
                    onClick={closeMobileMenu}
                    className={`${baseClasses} text-blue-600 hover:text-blue-700`}>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Track Application Status
                    </div>
                </Link>
            );
        }

        return (
            <Link href="/trainer-status">
                <Button 
                    variant="outline" 
                    className={`${baseClasses} bg-blue-600 hover:bg-blue-700 text-white border-blue-600 cursor-pointer`}
                >
                    <Clock className="h-4 w-4 mr-2" />
                    Track Status
                </Button>
            </Link>
        );
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
                                href="/"
                                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                                Home
                            </Link>
                            <Link
                                href="/equipments"
                                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                                Equipments
                            </Link>
                            <Link
                                href="/store"
                                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                                Store
                            </Link>
                            <Link
                                href="/exercise-recommender"
                                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                                AI Trainer
                            </Link>
                            <Link
                                href="/membership"
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
                            {/* Login & Logout Button */}
                            {status === "authenticated" ? (
                                <>
                                    <Button 
                                        variant="outline" 
                                        className="hidden md:flex"
                                        onClick={navigateToDashboard}
                                    >
                                        Dashboard
                                    </Button>
                                    {renderTrainerButton()}
                                    <Button onClick={() => signOut()}>Logout</Button>
                                </>
                            ) : (
                                <Link href={"/login"}>
                                    <Button>Login</Button>
                                </Link>
                            )}

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
                                href="/"
                                onClick={closeMobileMenu}
                                className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-2">
                                Home
                            </Link>
                            {status === "authenticated" && (
                                <>
                                    <button
                                        onClick={navigateToDashboard}
                                        className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-2">
                                        Dashboard
                                    </button>
                                    {renderTrainerButton(true)}
                                </>
                            )}
                            <Link
                                href="/equipments"
                                onClick={closeMobileMenu}
                                className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-2">
                                Equipments
                            </Link>
                            <Link
                                href="/store"
                                onClick={closeMobileMenu}
                                className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-2">
                                Store
                            </Link>
                            <Link
                                href="/exercise-recommender"
                                onClick={closeMobileMenu}
                                className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-2">
                                AI Trainer
                            </Link>
                            <Link
                                href="/membership"
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
