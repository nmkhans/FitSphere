"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-hot-toast";
import { Loader2, FileText, AlertCircle, Users, Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";

const ApplyTrainerPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const trainerType = searchParams.get('type') || 'gym'; // 'gym' or 'special-need'
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [applicationStatus, setApplicationStatus] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            router.push("/login");
            return;
        }

        // Check if user is already a trainer or admin
        if (session.user.role === "trainer" || 
            session.user.role === "special-need-trainer" || 
            session.user.role === "admin") {
            toast.error("You are already a trainer or admin");
            router.push("/dashboard");
            return;
        }

        // Check if user already has an active membership
        if (session.user.membershipType) {
            setIsLoading(false);
            return; // Don't redirect, just show the message in the component
        }

        // Pre-fill form with user data
        setValue("name", session.user.name || "");
        setValue("email", session.user.email || "");
        setValue("trainerType", trainerType);
        
        // Check if user already has an application
        fetchApplicationStatus();
        
        setIsLoading(false);
    }, [session, status, router, setValue, trainerType]);

    const fetchApplicationStatus = async () => {
        try {
            const response = await fetch("/api/trainer-applications/status");
            if (response.ok) {
                const data = await response.json();
                setApplicationStatus(data);
            }
        } catch (error) {
            console.error("Error fetching application status:", error);
        }
    };

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            
            const response = await fetch("/api/trainer-applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    userId: session.user.id,
                    userEmail: session.user.email,
                    trainerType: trainerType
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Trainer application submitted successfully!");
                // Redirect to status page after successful submission
                router.push("/trainer-status");
            } else {
                toast.error(result.error || "Failed to submit application");
            }
        } catch (error) {
            console.error("Error submitting application:", error);
            toast.error("An error occurred while submitting your application");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === "loading" || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    // Show message if user already has a membership
    if (session?.user?.membershipType) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
                <div className="container mx-auto px-4 max-w-2xl">
                    <Card>
                        <CardContent className="text-center py-12">
                            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-amber-500" />
                            <h2 className="text-2xl font-bold mb-4">Cannot Apply as Trainer</h2>
                            <p className="text-muted-foreground mb-6">
                                You currently have an active <strong>{session.user.membershipType}</strong> membership. 
                                To become a trainer, you need to cancel your current membership first.
                            </p>
                            <p className="text-sm text-muted-foreground mb-6">
                                As a trainer, you'll be working with members rather than being a member yourself. 
                                This ensures there's no conflict of interest in our system.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/dashboard">
                                    <Button variant="outline">
                                        Go to Dashboard
                                    </Button>
                                </Link>
                                <Link href="/membership">
                                    <Button>
                                        Manage Membership
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // Redirect to status page if user already has an application
    if (applicationStatus?.hasApplication) {
        router.push("/trainer-status");
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    const trainerTypeConfig = {
        gym: {
            title: "Gym Trainer",
            description: "Help members with general fitness, workout routines, and equipment usage",
            icon: Users,
            color: "green",
            specializations: [
                "Weight Training",
                "Cardio Training", 
                "Functional Training",
                "Group Fitness",
                "CrossFit",
                "Bodybuilding",
                "Powerlifting",
                "Athletic Performance",
                "General Fitness",
                "Other"
            ]
        },
        'special-need': {
            title: "Special Need Trainer",
            description: "Provide specialized training and support for members with special needs",
            icon: Heart,
            color: "blue",
            specializations: [
                "Pregnant Women Training",
                "Disability Support Training"
            ]
        }
    };

    const currentConfig = trainerTypeConfig[trainerType];
    const IconComponent = currentConfig.icon;

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                        <span className="text-muted-foreground">|</span>
                        <Badge variant="outline" className={`${currentConfig.color === 'green' ? 'border-green-600 text-green-700' : 'border-blue-600 text-blue-700'}`}>
                            <IconComponent className="h-3 w-3 mr-1" />
                            {currentConfig.title}
                        </Badge>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Apply as a {currentConfig.title}</h1>
                    <p className="text-muted-foreground mb-4">
                        {currentConfig.description}
                    </p>
                    <div className={`${trainerType === 'gym' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'} rounded-lg p-4 text-sm ${trainerType === 'gym' ? 'text-green-700 dark:text-green-300' : 'text-blue-700 dark:text-blue-300'}`}>
                        <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <div>
                                <strong>Important Requirements:</strong>
                                {trainerType === 'gym' ? (
                                    <div className="mt-2 space-y-2">
                                        <p>
                                            <strong>Gym Trainers</strong> are responsible for helping members achieve their general fitness goals through personalized workout routines, proper equipment usage, and motivational support.
                                        </p>
                                        <p>
                                            <strong>Before applying, ensure you have:</strong>
                                        </p>
                                        <ul className="list-disc list-inside ml-2 space-y-1">
                                            <li>Proven expertise in fitness training and exercise science</li>
                                            <li>Experience with gym equipment and various training methods</li>
                                            <li>Ability to create safe and effective workout programs</li>
                                            <li>Strong communication and motivational skills</li>
                                            <li>Relevant certifications (preferred but not mandatory)</li>
                                        </ul>
                                        <p className="text-sm italic">
                                            Note: If you have an active membership, you must cancel it before applying as trainers and members have different roles in our system.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="mt-2 space-y-2">
                                        <p>
                                            <strong>Special Need Trainers</strong> provide specialized fitness training for members with unique requirements including pregnant women and individuals with disabilities.
                                        </p>
                                        <p>
                                            <strong>Before applying, ensure you have:</strong>
                                        </p>
                                        <ul className="list-disc list-inside ml-2 space-y-1">
                                            <li>Specialized knowledge in adaptive fitness or prenatal exercise</li>
                                            <li>Experience working with special populations</li>
                                            <li>Understanding of medical considerations and safety protocols</li>
                                            <li>Patience, empathy, and excellent communication skills</li>
                                            <li>Relevant specialized certifications (highly recommended)</li>
                                        </ul>
                                        <p className="text-sm italic">
                                            Note: This role requires higher expertise and sensitivity. If you have an active membership, you must cancel it before applying.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            {currentConfig.title} Application Form
                        </CardTitle>
                        <CardDescription>
                            Please fill out all the required information to apply as a {currentConfig.title.toLowerCase()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">Full Name *</Label>
                                        <Input
                                            id="name"
                                            {...register("name", { required: "Name is required" })}
                                            className="mt-1"
                                            disabled
                                        />
                                        {errors.name && (
                                            <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="email">Email Address *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...register("email")}
                                            className="mt-1"
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="phone">Phone Number *</Label>
                                        <Input
                                            id="phone"
                                            {...register("phone", { required: "Phone number is required" })}
                                            className="mt-1"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                        {errors.phone && (
                                            <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="age">Age *</Label>
                                        <Input
                                            id="age"
                                            type="number"
                                            {...register("age", { 
                                                required: "Age is required",
                                                min: { value: 18, message: "Must be at least 18 years old" },
                                                max: { value: 70, message: "Must be under 70 years old" }
                                            })}
                                            className="mt-1"
                                            min="18"
                                            max="70"
                                        />
                                        {errors.age && (
                                            <p className="text-destructive text-sm mt-1">{errors.age.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="gender">Gender *</Label>
                                        <Select 
                                            onValueChange={(value) => setValue("gender", value, { shouldValidate: true })}
                                            {...register("gender", { required: "Gender is required" })}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select your gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.gender && (
                                            <p className="text-destructive text-sm mt-1">{errors.gender.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="specialization">Specialization *</Label>
                                        <Select 
                                            onValueChange={(value) => setValue("specialization", value, { shouldValidate: true })}
                                            {...register("specialization", { required: "Specialization is required" })}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select your specialization" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {currentConfig.specializations.map((spec) => (
                                                    <SelectItem key={spec} value={spec.toLowerCase().replace(/\s+/g, '-')}>
                                                        {spec}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.specialization && (
                                            <p className="text-destructive text-sm mt-1">{errors.specialization.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="address">Address *</Label>
                                    <Textarea
                                        id="address"
                                        {...register("address", { required: "Address is required" })}
                                        className="mt-1"
                                        placeholder="Enter your full address"
                                        rows={3}
                                    />
                                    {errors.address && (
                                        <p className="text-destructive text-sm mt-1">{errors.address.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-6 border-t">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="min-w-[150px]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit Application"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ApplyTrainerPage;
