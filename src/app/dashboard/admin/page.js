"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SpecializedMembersSection from "@/components/dashboard/admin/SpecializedMembersSection";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import AllUsers from "@/components/dashboard/admin/AllUsers";
import Trainers from "@/components/dashboard/admin/Trainers";
import TrainerApplications from "@/components/dashboard/admin/TrainerApplications";
import AddEquipments from "@/components/dashboard/admin/AddEquipments";

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("specialized-members");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // Still loading
    
    if (!session) {
      router.push("/login");
      return;
    }
    
    // Check if user is admin
    if (session.user.role !== 'admin') {
      router.push("/dashboard");
      return;
    }
    
    setIsLoading(false);
  }, [session, status, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner className="mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "specialized-members":
        return <SpecializedMembersSection />;
      case "all-users":
        return <AllUsers />;
      case "trainers":
        return <Trainers/>;
      case "trainer-applications":
        return <TrainerApplications />;
      case "add-equipments":
        return <AddEquipments />;
      default:
        return <SpecializedMembersSection />;
    }
  };

  return (
    <DashboardLayout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
      user={session?.user}
      userRole="admin" // This identifies it as admin dashboard
    >
      <div className="p-4 md:p-6">
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
