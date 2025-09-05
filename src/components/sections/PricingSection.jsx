"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Monthly",
    price: "$49",
    period: "/month",
    description: "Perfect for getting started",
    features: ["Access to all gym equipment", "Basic workout plans", "Locker room access", "Mobile app access"],
    popular: false,
  },
  {
    name: "Quarterly",
    price: "$129",
    period: "/3 months",
    description: "Most popular choice",
    features: [
      "Everything in Monthly",
      "Personal trainer consultation",
      "Nutrition guidance",
      "Progress tracking",
      "Group fitness classes",
    ],
    popular: true,
  },
  {
    name: "Half-Yearly",
    price: "$239",
    period: "/6 months",
    description: "Best value for committed members",
    features: [
      "Everything in Quarterly",
      "Dedicated trainer assignment",
      "Custom meal plans",
      "Priority booking",
      "Guest passes (2/month)",
    ],
    popular: false,
  },
  {
    name: "Yearly",
    price: "$449",
    period: "/year",
    description: "Ultimate fitness transformation",
    features: [
      "Everything in Half-Yearly",
      "1-on-1 training sessions",
      "Body composition analysis",
      "Supplement consultation",
      "VIP locker access",
      "Unlimited guest passes",
    ],
    popular: false,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Choose Your Plan</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Flexible membership options designed to fit your lifestyle and fitness goals
          </p>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative transition-all duration-500 transform hover:scale-105 ${
                plan.popular
                  ? "border-primary shadow-2xl shadow-primary/20 bg-gradient-to-b from-card to-primary/5"
                  : "border-border/50 shadow-xl bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground animate-pulse">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{plan.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-3xl sm:text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm sm:text-base">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-primary/25"
                      : "hover:bg-primary/10"
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
