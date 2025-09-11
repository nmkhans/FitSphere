"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MemberOverview from "@/components/dashboard/member/MemberOverview";
import WorkoutPlansContent from "@/components/dashboard/content/WorkoutPlansContent";
import NutritionPlansContent from "@/components/dashboard/content/NutritionPlansContent";
import UpdateProfile from "@/components/dashboard/UpdateProfile";
import UpdateMembership from "@/components/dashboard/UpdateMembership";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import Swal from "sweetalert2";
import MemberReview from "@/components/dashboard/member/MemberReview";

const MemberDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (status === "loading") return;

      if (!session) {
        router.push("/login");
        return;
      }

      // First check session data for immediate role-based redirects
      const sessionRole = session.user?.role;
      console.log("Session role:", sessionRole);

      // Redirect based on session role first (faster)
      if (sessionRole === "admin") {
        console.log("Redirecting to admin dashboard (from session)");
        router.push("/dashboard/admin");
        return;
      }

      if (sessionRole === "trainer") {
        console.log(
          "Redirecting to trainer dashboard (from session)"
        );
        router.push("/dashboard/trainer");
        return;
      }

      if (sessionRole === "special-need") {
        console.log(
          "Redirecting to special-member dashboard (from session)"
        );
        router.push("/dashboard/special-member");
        return;
      }

      // Fetch current user role from database to double-check and get latest data
      try {
        const response = await fetch("/api/users/me");
        if (response.ok) {
          const userData = await response.json();
          console.log("Current user data from DB:", userData);

          // Use fresh role data from database
          const currentRole = userData.role;
          console.log("Current role from DB:", currentRole);

          // Check role-based redirect with fresh data (in case session is outdated)
          if (currentRole === "admin" && sessionRole !== "admin") {
            console.log("Redirecting to admin dashboard (from DB)");
            router.push("/dashboard/admin");
            return;
          }

          if (
            currentRole === "trainer" &&
            sessionRole !== "trainer"
          ) {
            console.log("Redirecting to trainer dashboard (from DB)");
            router.push("/dashboard/trainer");
            return;
          }

          if (
            currentRole === "special-need" &&
            sessionRole !== "special-need"
          ) {
            console.log(
              "Redirecting to special-member dashboard (from DB)"
            );
            router.push("/dashboard/special-member");
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching current user role:", error);
        // Fall back to session data if API fails
      }

      // Allow access if user has membership or is admin/trainer (this is only for regular member dashboard)
      if (session.user?.membershipType) {
        console.log(
          "User has membership, staying on member dashboard"
        );
        setIsLoading(false);
        return;
      }

      // For users without membership/admin/trainer role, check if they have an approved trainer application
      try {
        const response = await fetch(
          "/api/trainer-applications/status"
        );
        if (response.ok) {
          const data = await response.json();
          if (data.hasApplication && data.application?.status === "approved") {
            // User has approved trainer application, redirect to appropriate dashboard
            const trainerType = data.application.trainerType;
            if (trainerType === 'special-need') {
              router.push("/dashboard/trainer"); // Special need trainers go to trainer dashboard
            } else {
              router.push("/dashboard/trainer"); // Regular trainers go to trainer dashboard  
            }
            return;
          }
          if (data.hasApplication && data.application?.status === "pending") {
            // User has pending application, redirect to status page
            router.push("/trainer-status");
            return;
          }
          if (data.hasApplication && data.application?.status === "rejected") {
            // User has rejected application, allow dashboard access so they can reapply
            setIsLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error("Error checking trainer application:", error);
      }

      // No membership and no trainer application - show membership required
      Swal.fire({
        title: "Membership Required",
        text: "You need to purchase a membership to access the dashboard.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to Membership",
        cancelButtonText: "Go to Home",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/membership");
        } else {
          router.push("/");
        }
      });
    };

    checkAccess();
  }, [session, status, router]);

  // Hide navbar and footer for dashboard
  useEffect(() => {
    const navbar = document.querySelector("nav");
    const footer = document.querySelector("footer");

    if (navbar) navbar.style.display = "none";
    if (footer) footer.style.display = "none";

    // Cleanup function to restore navbar and footer when leaving dashboard
    return () => {
      if (navbar) navbar.style.display = "";
      if (footer) footer.style.display = "";
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
    const userRole = session?.user?.role || "basic-member";

    switch (activeSection) {
      case "overview":
        return (
          <MemberOverview user={session?.user} userType={userRole} />
        );
      case "update-profile":
        return <UpdateProfile user={session?.user} />;
      case "update-membership":
        return <UpdateMembership user={session?.user} />;
      case "workout-plans":
        return <WorkoutPlansContent userType={userRole} />;
      case "nutrition-plans":
        return <NutritionPlansContent userType={userRole} />;
      case "review":
        return <MemberReview userType={userRole} />;
      case "ai-recommender":
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              AI Exercise Recommender
            </h2>
            <p>
              AI-powered exercise recommendations based on your goals.
            </p>
          </div>
        );
      case "personal-training":
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Personal Training
            </h2>
            <p>
              Schedule and manage your personal training sessions.
            </p>
          </div>
        );
      case "special-programs":
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Special Programs
            </h2>
            <p>
              Specialized programs designed for your unique needs.
            </p>
          </div>
        );
      case "basic-workouts":
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Basic Workouts
            </h2>
            <p>Basic workout routines to get you started.</p>
          </div>
        );
      case "equipment-guide":
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Equipment Guide
            </h2>
            <p>Learn how to use gym equipment properly.</p>
          </div>
        );
      default:
        return (
          <MemberOverview user={session?.user} userType={userRole} />
        );
    }
  };

  return (
    <DashboardLayout
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      user={session?.user}
      userRole={session?.user?.role || "basic-member"} // Use actual user role
    >
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {session?.user?.name}!
          </h1>
          <p className="text-muted-foreground">
            {session?.user?.membershipType &&
              `${session.user.membershipType} Member`}
            {session?.user?.role === "premium-member" &&
              " - Premium Features Enabled"}
            {session?.user?.role === "basic-member" &&
              " - Basic Membership"}
            {session?.user?.role === "special-need" &&
              " - Special Care Program"}
          </p>
        </div>
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default MemberDashboard;
