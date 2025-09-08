"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MemberOverview from "@/components/dashboard/member/MemberOverview";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const MemberDashboard = () => {
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
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <MemberOverview user={session?.user} />;
      default:
        return <MemberOverview user={session?.user} />;
    }
  };

  return (
    <DashboardLayout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
      user={session?.user}
      userRole="member" // This will be dynamic in the future
    >
      <div className="p-4 md:p-6">
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default MemberDashboard;
