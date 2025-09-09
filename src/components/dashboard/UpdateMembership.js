"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Calendar, 
  Check, 
  X, 
  ArrowUp, 
  ArrowDown,
  Crown,
  Shield,
  Zap,
  ExternalLink
} from "lucide-react";
import Swal from "sweetalert2";

const UpdateMembership = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Define membership packages
  const packages = {
    "basic": {
      name: "Basic",
      price: 29,
      color: "bg-green-500",
      icon: Shield,
      features: [
        "Access to basic workout routines",
        "Equipment usage guide",
        "Community forum access",
        "Basic progress tracking"
      ]
    },
    "premium": {
      name: "Premium", 
      price: 59,
      color: "bg-blue-500",
      icon: Crown,
      features: [
        "All Basic features",
        "Advanced workout plans",
        "Nutrition planning",
        "AI exercise recommender",
        "Personal training sessions",
        "Priority customer support"
      ]
    },
    "special": {
      name: "Special Care",
      price: 89,
      color: "bg-purple-500", 
      icon: Zap,
      features: [
        "All Premium features",
        "Specialized programs for special needs",
        "Dedicated specialized trainer",
        "Custom meal planning",
        "Health monitoring",
        "Weekly consultations",
        "Adaptive equipment access"
      ]
    }
  };

  const currentMembership = user?.role === "basic-member" ? "basic" 
    : user?.role === "premium-member" ? "premium"
    : user?.role === "special-need" ? "special"
    : "basic";

  const currentPackage = packages[currentMembership];
  const isHighestPlan = currentMembership === "special";

  const handleCancelPlan = () => {
    Swal.fire({
      title: 'Cancel Membership Plan',
      text: 'This feature will be available soon. You can contact our support team for assistance.',
      icon: 'info',
      confirmButtonColor: '#3085d6',
    });
  };

  const handleUpgrade = () => {
    // Redirect to membership page with a query parameter to indicate upgrade
    router.push('/membership?action=upgrade');
  };

  const handleDowngrade = () => {
    // Redirect to membership page with a query parameter to indicate downgrade
    router.push('/membership?action=downgrade');
  };

  const handleManageMembership = () => {
    // Redirect to membership page to manage current membership
    router.push('/membership');
  };

  const getNextPlan = () => {
    if (currentMembership === "basic") return "premium";
    if (currentMembership === "premium") return "special";
    return null;
  };

  const getPreviousPlan = () => {
    if (currentMembership === "special") return "premium";
    if (currentMembership === "premium") return "basic";
    return null;
  };

  const nextPlan = getNextPlan();
  const previousPlan = getPreviousPlan();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Update Membership</h1>
          <p className="text-gray-600 mt-1">Manage your membership plan and billing</p>
        </div>
      </div>

      {/* Current Plan Summary */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Plan Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${currentPackage.color} text-white`}>
                <currentPackage.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{currentPackage.name} Plan</h3>
                <p className="text-gray-600">
                  ${currentPackage.price}/month
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Active
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Next billing: January 15, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Auto-renewal enabled</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900">Plan Features:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentPackage.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={handleCancelPlan}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel Plan
            </Button>
            <Button 
              onClick={handleManageMembership}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Manage Membership
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade/Downgrade Options */}
      {!isHighestPlan && nextPlan && (
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <ArrowUp className="h-5 w-5" />
              🌟 Upgrade Your Experience!
            </CardTitle>
          </CardHeader>
          <CardContent>
              <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${packages[nextPlan].color} text-white`}>
                      {(() => {
                        const IconComponent = packages[nextPlan].icon;
                        return <IconComponent className="h-6 w-6" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-800">{packages[nextPlan].name} Plan</h3>
                      <p className="text-green-600 font-semibold">
                        ${packages[nextPlan].price}/month
                      </p>
                      <p className="text-sm text-green-600">
                        Only ${packages[nextPlan].price - currentPackage.price} more per month!
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 mb-2">
                      🎁 Best Value
                    </Badge>
                  </div>
                </div>              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-green-800">Additional Features You'll Get:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {packages[nextPlan].features.slice(currentPackage.features.length).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleUpgrade}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-lg shadow-lg transform transition hover:scale-105"
              >
                <ArrowUp className="h-5 w-5 mr-2" />
                Upgrade to {packages[nextPlan].name} Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Downgrade Option (for highest plan) */}
      {isHighestPlan && previousPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowDown className="h-5 w-5" />
              Downgrade Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${packages[previousPlan].color} text-white`}>
                  {(() => {
                    const IconComponent = packages[previousPlan].icon;
                    return <IconComponent className="h-6 w-6" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{packages[previousPlan].name} Plan</h3>
                  <p className="text-gray-600">
                    ${packages[previousPlan].price}/month
                  </p>
                  <p className="text-sm text-gray-500">
                    Save ${currentPackage.price - packages[previousPlan].price} per month
                  </p>
                </div>
              </div>
            </div>

            <Button 
              variant="outline"
              onClick={handleDowngrade}
              className="text-gray-600 border-gray-300"
            >
              <ArrowDown className="h-4 w-4 mr-2" />
              Downgrade to {packages[previousPlan].name} Plan
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Billing History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">December 15, 2024</p>
                <p className="text-sm text-gray-500">{currentPackage.name} Plan</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${currentPackage.price}.00</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Paid
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">November 15, 2024</p>
                <p className="text-sm text-gray-500">{currentPackage.name} Plan</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${currentPackage.price}.00</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Paid
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            View Full Billing History
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateMembership;
