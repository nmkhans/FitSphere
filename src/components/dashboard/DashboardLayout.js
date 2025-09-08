"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Menu, 
  X, 
  Users, 
  LogOut,
  Home,
  ChevronLeft,
  Heart
} from "lucide-react";

const DashboardLayout = ({ children, activeSection, setActiveSection, user, userRole = "member" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  // Navigation items based on user role
  const getNavigationItems = () => {
    switch (userRole) {
      case "admin":
        return [
          {
            name: "Specialized Members",
            id: "specialized-members",
            icon: Heart,
            current: activeSection === "specialized-members"
          },
          {
            name: "Users",
            id: "all-users",
            icon: Heart,
            current: activeSection === "all-users"
          },
          {
            name: "Trainers",
            id: "trainers",
            icon: Heart,
            current: activeSection === "trainers"
          }
        ];
      case "member":
      default:
        return [
          {
            name: "Overview",
            id: "overview", 
            icon: Home,
            current: activeSection === "overview"
          }
        ];
    }
  };

  const navigation = getNavigationItems();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? 'bg-white' : 'bg-gray-900'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 ${mobile ? 'border-b' : 'border-b border-gray-700'}`}>
        <div className="flex items-center space-x-3">
          {(!sidebarCollapsed || mobile) && (
            <h1 className={`text-xl font-bold ${mobile ? 'text-gray-900' : 'text-white'}`}>
              {userRole === "admin" ? "Admin Panel" : "FitSphere"}
            </h1>
          )}
          {!mobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-gray-400 hover:text-white"
            >
              <ChevronLeft className={`h-4 w-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </Button>
          )}
        </div>
        {mobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* User Info */}
      <div className={`p-4 ${mobile ? 'border-b' : 'border-b border-gray-700'}`}>
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.image} />
            <AvatarFallback className="bg-blue-600 text-white">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          {(!sidebarCollapsed || mobile) && (
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${mobile ? 'text-gray-900' : 'text-white'}`}>
                {user?.name || "User"}
              </p>
              <p className={`text-sm truncate ${mobile ? 'text-gray-500' : 'text-gray-300'}`}>
                {user?.email}
              </p>
              {userRole === "admin" && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                  Admin
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                item.current
                  ? mobile 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'bg-gray-800 text-white'
                  : mobile
                    ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
              {(!sidebarCollapsed || mobile) && item.name}
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className={`p-4 space-y-2 ${mobile ? 'border-t' : 'border-t border-gray-700'}`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGoHome}
          className={`w-full justify-start ${
            mobile 
              ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' 
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <Home className="h-4 w-4 mr-3" />
          {(!sidebarCollapsed || mobile) && "Home"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className={`w-full justify-start ${
            mobile 
              ? 'text-red-600 hover:bg-red-50 hover:text-red-700' 
              : 'text-red-400 hover:bg-red-600 hover:text-white'
          }`}
        >
          <LogOut className="h-4 w-4 mr-3" />
          {(!sidebarCollapsed || mobile) && "Sign Out"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex md:flex-col fixed left-0 top-0 h-full z-40 transition-all duration-300 ${
        sidebarCollapsed ? 'md:w-16' : 'md:w-64'
      } bg-gray-900`}>
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main Content - with left margin to account for fixed sidebar */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      } h-full`}>
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>

        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto h-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
