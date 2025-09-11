"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-hot-toast";
import { Loader2, ArrowLeft, Clock, CheckCircle, XCircle, RefreshCw, ExternalLink, Users, Heart, AlertCircle } from "lucide-react";
import Link from "next/link";

const TrainerApplicationStatusContent = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const trainerType = searchParams.get('type') || 'gym';
    
    const [applicationStatus, setApplicationStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            router.push("/login");
            return;
        }

        // Redirect if user is already a trainer or admin
        if (session.user.role === "trainer" || 
            session.user.role === "special-need-trainer" || 
            session.user.role === "admin") {
            router.push("/dashboard");
            return;
        }

        // Redirect if user has active membership
        if (session.user.membershipType) {
            router.push("/dashboard");
            return;
        }

        fetchApplicationStatus();
        setIsLoading(false);
    }, [session, status, router]);

    const fetchApplicationStatus = async () => {
        try {
            const response = await fetch("/api/trainer-applications/status");
            if (response.ok) {
                const data = await response.json();
                setApplicationStatus(data);
            }
        } catch (error) {
            console.error("Error fetching application status:", error);
            toast.error("Failed to fetch application status");
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusInfo = (status, trainerType) => {
        const typeLabel = trainerType === 'special-need' ? 'Special Need' : 'Gym';
        
        switch (status) {
            case "pending":
                return {
                    icon: Clock,
                    color: "text-yellow-600",
                    bgColor: "bg-yellow-50 border-yellow-200",
                    title: `${typeLabel} Trainer Application Under Review`,
                    message: `Your ${typeLabel.toLowerCase()} trainer application is currently being reviewed by our admin team. We'll notify you once a decision has been made.`
                };
            case "approved":
                return {
                    icon: CheckCircle,
                    color: "text-green-600", 
                    bgColor: "bg-green-50 border-green-200",
                    title: `${typeLabel} Trainer Application Approved!`,
                    message: `Congratulations! Your ${typeLabel.toLowerCase()} trainer application has been approved. You can now access your trainer dashboard.`
                };
            case "rejected":
                return {
                    icon: XCircle,
                    color: "text-red-600",
                    bgColor: "bg-red-50 border-red-200", 
                    title: `${typeLabel} Trainer Application Not Approved`,
                    message: `Unfortunately, your ${typeLabel.toLowerCase()} trainer application was not approved at this time. You may reapply in the future.`
                };
            default:
                return null;
        }
    };

    const getTrainerTypeBadge = (trainerType) => {
        const type = trainerType || 'gym';
        if (type === 'special-need') {
            return (
                <Badge variant="outline" className="border-blue-600 text-blue-700">
                    <Heart className="w-3 h-3 mr-1" />
                    Special Need Trainer
                </Badge>
            );
        }
        return (
            <Badge variant="outline" className="border-green-600 text-green-700">
                <Users className="w-3 h-3 mr-1" />
                Gym Trainer
            </Badge>
        );
    };

    if (status === "loading" || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    // If no application exists, redirect to application form
    if (!applicationStatus?.hasApplication) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
                <div className="container mx-auto px-4 max-w-2xl">
                    <Card>
                        <CardContent className="text-center py-12">
                            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-amber-500" />
                            <h2 className="text-2xl font-bold mb-4">No Application Found</h2>
                            <p className="text-muted-foreground mb-6">
                                You haven't submitted a trainer application yet. 
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/apply-trainer?type=gym">
                                    <Button variant="outline">
                                        <Users className="h-4 w-4 mr-2" />
                                        Apply as Gym Trainer
                                    </Button>
                                </Link>
                                <Link href="/apply-trainer?type=special-need">
                                    <Button>
                                        <Heart className="h-4 w-4 mr-2" />
                                        Apply as Special Need Trainer
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    const { application } = applicationStatus;
    const statusInfo = getStatusInfo(application.status, application.trainerType);
    
    if (!statusInfo) return null;

    const StatusIcon = statusInfo.icon;

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                {/* Back Button */}
                <div className="mb-6">
                    <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                </div>

                <Card className={`${statusInfo.bgColor} border-2`}>
                    <CardHeader className="text-center">
                        <div className={`mx-auto mb-4 p-3 rounded-full bg-white w-fit`}>
                            <StatusIcon className={`h-8 w-8 ${statusInfo.color}`} />
                        </div>
                        <div className="flex justify-center mb-4">
                            {getTrainerTypeBadge(application.trainerType)}
                        </div>
                        <CardTitle className="text-2xl">{statusInfo.title}</CardTitle>
                        <CardDescription className="text-base">
                            {statusInfo.message}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-white rounded-lg p-4 space-y-3">
                            <h3 className="font-semibold">Application Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                <div>
                                    <span className="font-medium">Type:</span>
                                    <p className="text-muted-foreground">
                                        {application.trainerType === 'special-need' ? 'Special Need' : 'Gym'} Trainer
                                    </p>
                                </div>
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
                                <div className={application.reviewedAt ? "" : "md:col-span-2"}>
                                    <span className="font-medium">Status:</span>
                                    <p className={`${statusInfo.color} capitalize font-medium`}>{application.status}</p>
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
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Go to Trainer Dashboard
                                    </Button>
                                </Link>
                            )}
                            {application.status === "rejected" && (
                                <Link href={`/apply-trainer?type=${application.trainerType}`}>
                                    <Button className="w-full sm:w-auto">
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Apply Again
                                    </Button>
                                </Link>
                            )}
                            <Button 
                                variant="outline" 
                                className="w-full sm:w-auto"
                                onClick={() => {
                                    fetchApplicationStatus();
                                    toast.success("Status refreshed!");
                                }}
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Refresh Status
                            </Button>
                            <Link href="/">
                                <Button variant="ghost" className="w-full sm:w-auto">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const TrainerApplicationStatusPage = () => {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <TrainerApplicationStatusContent />
        </Suspense>
    );
};

export default TrainerApplicationStatusPage;
