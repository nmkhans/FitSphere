"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import MemberOverview from "@/components/dashboard/member/MemberOverview";

const SpecialMemberDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // Still loading
    
    if (!session) {
      router.push("/login");
      return;
    }
    
    // Check if user has special-need role
    if (session.user.role !== 'special-need') {
      router.push("/dashboard");
      return;
    }
    
    setIsLoading(false);
  }, [session, status, router]);

  // Hide navbar and footer for dashboard
  useEffect(() => {
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';
    
    // Cleanup function to restore navbar and footer when leaving dashboard
    return () => {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner className="mx-auto mb-4" />
          <p className="text-gray-600">Loading special member dashboard...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <MemberOverview userType="special-need" />;
      default:
        return <MemberOverview userType="special-need" />;
    }
  };

  return (
    <DashboardLayout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
      user={session?.user}
      userRole="special-member" // This identifies it as special member dashboard
    >
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome to Wellness Plus Dashboard, {session?.user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Your specialized dashboard for wellness and health management.
          </p>
        </div>
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default SpecialMemberDashboard;
