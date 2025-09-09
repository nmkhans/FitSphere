"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { Loader2, Upload, FileText, AlertCircle, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

const ApplyTrainerPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
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
        if (session.user.role === "trainer" || session.user.role === "admin") {
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
        
        // Check if user already has an application
        fetchApplicationStatus();
        
        setIsLoading(false);
    }, [session, status, router, setValue]);

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
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Trainer application submitted successfully!");
                await fetchApplicationStatus(); // Refresh status
                // Don't redirect - let them see the status
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

    // Show application status if user already has an application
    if (applicationStatus?.hasApplication) {
        const { application } = applicationStatus;
        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        };

        let statusIcon, statusColor, statusTitle, statusMessage;

        switch (application.status) {
            case "pending":
                statusIcon = Clock;
                statusColor = "text-yellow-600";
                statusTitle = "Application Under Review";
                statusMessage = "Your trainer application is currently being reviewed by our admin team. We'll notify you once a decision has been made.";
                break;
            case "approved":
                statusIcon = CheckCircle;
                statusColor = "text-green-600";
                statusTitle = "Application Approved!";
                statusMessage = "Congratulations! Your trainer application has been approved. You can now access your trainer dashboard.";
                break;
            case "rejected":
                statusIcon = XCircle;
                statusColor = "text-red-600";
                statusTitle = "Application Not Approved";
                statusMessage = "Unfortunately, your trainer application was not approved at this time. You may reapply in the future.";
                break;
            default:
                return null;
        }

        const StatusIcon = statusIcon;

        return (
            <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
                <div className="container mx-auto px-4 max-w-2xl">
                    <Card>
                        <CardHeader className="text-center">
                            <div className={`mx-auto mb-4 p-3 rounded-full bg-gray-100 w-fit`}>
                                <StatusIcon className={`h-8 w-8 ${statusColor}`} />
                            </div>
                            <CardTitle className="text-2xl">{statusTitle}</CardTitle>
                            <CardDescription className="text-base">
                                {statusMessage}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="bg-muted rounded-lg p-4 space-y-3">
                                <h3 className="font-semibold">Application Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="font-medium">Submitted:</span>
                                        <p className="text-muted-foreground">{formatDate(application.appliedAt)}</p>
                                    </div>
                                    {application.reviewedAt && (
                                        <div>
                                            <span className="font-medium">Reviewed:</span>
                                            <p className="text-muted-foreground">{formatDate(application.reviewedAt)}</p>
                                        </div>
                                    )}
                                    <div className="md:col-span-2">
                                        <span className="font-medium">Status:</span>
                                        <p className={`${statusColor} capitalize font-medium`}>{application.status}</p>
                                    </div>
                                    {application.adminNotes && (
                                        <div className="md:col-span-2">
                                            <span className="font-medium">Admin Notes:</span>
                                            <p className="text-muted-foreground">{application.adminNotes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                {application.status === "approved" && (
                                    <Link href="/dashboard/trainer">
                                        <Button className="w-full sm:w-auto">
                                            Go to Trainer Dashboard
                                        </Button>
                                    </Link>
                                )}
                                {application.status === "rejected" && (
                                    <Button 
                                        onClick={() => {
                                            // Allow reapplication by clearing the status
                                            setApplicationStatus(null);
                                        }}
                                        className="w-full sm:w-auto"
                                    >
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Apply Again
                                    </Button>
                                )}
                                <Link href="/dashboard">
                                    <Button variant="outline" className="w-full sm:w-auto">
                                        Back to Dashboard
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Apply as a Trainer</h1>
                    <p className="text-muted-foreground mb-4">
                        Join our team of professional trainers and help members achieve their fitness goals
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-700 dark:text-blue-300">
                        <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <div>
                                <strong>Note:</strong> Trainers and members have different roles in our system. 
                                If you have an active membership, you cannot apply to be a trainer. 
                                You can either be a member who uses our services or a trainer who provides services to members.
                            </div>
                        </div>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Trainer Application Form
                        </CardTitle>
                        <CardDescription>
                            Please fill out all the required information to apply as a trainer
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

                            {/* Professional Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-foreground">Professional Information</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="experience">Years of Experience *</Label>
                                        <Select onValueChange={(value) => setValue("experience", value)}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select experience level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0-1">0-1 years</SelectItem>
                                                <SelectItem value="1-3">1-3 years</SelectItem>
                                                <SelectItem value="3-5">3-5 years</SelectItem>
                                                <SelectItem value="5-10">5-10 years</SelectItem>
                                                <SelectItem value="10+">10+ years</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.experience && (
                                            <p className="text-destructive text-sm mt-1">{errors.experience.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="specialization">Specialization *</Label>
                                        <Select onValueChange={(value) => setValue("specialization", value)}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select your specialization" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="weight-training">Weight Training</SelectItem>
                                                <SelectItem value="cardio">Cardio Training</SelectItem>
                                                <SelectItem value="yoga">Yoga</SelectItem>
                                                <SelectItem value="pilates">Pilates</SelectItem>
                                                <SelectItem value="crossfit">CrossFit</SelectItem>
                                                <SelectItem value="sports-specific">Sports Specific Training</SelectItem>
                                                <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
                                                <SelectItem value="nutrition">Nutrition Coaching</SelectItem>
                                                <SelectItem value="group-fitness">Group Fitness</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.specialization && (
                                            <p className="text-destructive text-sm mt-1">{errors.specialization.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="certifications">Certifications & Qualifications *</Label>
                                    <Textarea
                                        id="certifications"
                                        {...register("certifications", { required: "Certifications are required" })}
                                        className="mt-1"
                                        placeholder="List your certifications, degrees, and relevant qualifications (e.g., NASM CPT, ACE, ACSM, etc.)"
                                        rows={4}
                                    />
                                    {errors.certifications && (
                                        <p className="text-destructive text-sm mt-1">{errors.certifications.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="workExperience">Previous Work Experience *</Label>
                                    <Textarea
                                        id="workExperience"
                                        {...register("workExperience", { required: "Work experience is required" })}
                                        className="mt-1"
                                        placeholder="Describe your previous work experience in fitness/training industry"
                                        rows={4}
                                    />
                                    {errors.workExperience && (
                                        <p className="text-destructive text-sm mt-1">{errors.workExperience.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-foreground">Additional Information</h3>
                                
                                <div>
                                    <Label htmlFor="availability">Availability *</Label>
                                    <Textarea
                                        id="availability"
                                        {...register("availability", { required: "Availability is required" })}
                                        className="mt-1"
                                        placeholder="Describe your availability (days, hours, preferred schedule)"
                                        rows={3}
                                    />
                                    {errors.availability && (
                                        <p className="text-destructive text-sm mt-1">{errors.availability.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="motivation">Why do you want to be a trainer at FitSphere? *</Label>
                                    <Textarea
                                        id="motivation"
                                        {...register("motivation", { required: "This field is required" })}
                                        className="mt-1"
                                        placeholder="Tell us about your motivation and what you can bring to our team"
                                        rows={4}
                                    />
                                    {errors.motivation && (
                                        <p className="text-destructive text-sm mt-1">{errors.motivation.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="references">References (Optional)</Label>
                                    <Textarea
                                        id="references"
                                        {...register("references")}
                                        className="mt-1"
                                        placeholder="Provide contact information for professional references"
                                        rows={3}
                                    />
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
