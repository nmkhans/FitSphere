"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const TrainerDashboard = () => {
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
    
    // Check if user has trainer role
    if (session.user.role !== 'trainer') {
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
          <p className="text-gray-600">Loading trainer dashboard...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">My Clients</h3>
              <p className="text-muted-foreground">Manage your assigned clients</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Training Sessions</h3>
              <p className="text-muted-foreground">Schedule and manage sessions</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">Monitor client progress</p>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <p>Trainer dashboard content will be implemented here.</p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
      user={session?.user}
      userRole="trainer" // This identifies it as trainer dashboard
    >
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Trainer Dashboard - {session?.user?.name}
          </h1>
          <p className="text-muted-foreground">
            Manage your clients and training sessions.
          </p>
        </div>
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default TrainerDashboard;
