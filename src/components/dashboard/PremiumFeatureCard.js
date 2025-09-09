"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Star, Zap, Crown } from "lucide-react";

const PremiumFeatureCard = ({ title, description, icon: Icon, locked = false, comingSoon = false }) => {
  return (
    <Card className={`relative ${locked ? 'opacity-60 bg-gray-50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {locked && (
            <Badge variant="secondary" className="bg-gray-200 text-gray-600">
              <Lock className="h-3 w-3 mr-1" />
              Premium Only
            </Badge>
          )}
          {comingSoon && (
            <Badge variant="outline" className="border-blue-500 text-blue-600">
              Coming Soon
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        {locked ? (
          <Button variant="outline" className="w-full cursor-not-allowed" disabled>
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Premium
          </Button>
        ) : (
          <Button className="w-full">
            <Zap className="h-4 w-4 mr-2" />
            Access Feature
          </Button>
        )}
      </CardContent>
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="text-center">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-600">Premium Feature</p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PremiumFeatureCard;
