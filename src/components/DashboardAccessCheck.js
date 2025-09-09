"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const DashboardAccessCheck = ({ session }) => {
  const router = useRouter();

  const checkDashboardAccess = async () => {
    // Check if user has a membership, is a trainer/admin
    const userRole = session?.user?.role;
    const hasMembership = session?.user?.membershipType;
    
    console.log("DashboardAccessCheck - User role:", userRole);
    console.log("DashboardAccessCheck - Has membership:", hasMembership);
    
    // Allow immediate access if user is trainer, admin, or has a membership
    if (userRole === "trainer" || userRole === "admin" || hasMembership) {
      console.log("Access granted - trainer/admin or has membership");
      return true;
    }

    // For users without membership or trainer/admin role, check if they have a trainer application
    try {
      const response = await fetch("/api/trainer-applications/status");
      if (response.ok) {
        const data = await response.json();
        if (data.hasApplication) {
          console.log("Access granted - has trainer application");
          return true; // Allow access if they have a trainer application
        }
      }
    } catch (error) {
      console.error("Error checking trainer application:", error);
    }

    console.log("Access denied - showing membership popup");
    // Show membership required popup
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
    return false;
  };

  const navigateToDashboard = async () => {
    const hasAccess = await checkDashboardAccess();
    if (hasAccess) {
      // Get dashboard link based on role
      const getDashboardLink = () => {
        if (!session?.user?.role) return "/dashboard";

        switch (session.user.role) {
          case "admin":
            return "/dashboard/admin";
          case "trainer":
            return "/dashboard/trainer";
          case "special-need":
            return "/dashboard/special-member";
          case "premium-member":
          case "basic-member":
          default:
            return "/dashboard";
        }
      };
      
      router.push(getDashboardLink());
    }
  };

  return { navigateToDashboard, checkDashboardAccess };
};

export default DashboardAccessCheck;
