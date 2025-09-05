"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="w-fit bg-accent text-accent-foreground border-accent animate-float"
              >
                Premium Fitness Management
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground text-balance leading-tight">
                Transform Your
                <span className="text-primary"> Fitness Journey</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-pretty max-w-2xl">
                Join thousands of members who have achieved their fitness goals with our comprehensive gym management
                system, expert trainers, and cutting-edge facilities.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-lg px-8 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-accent/25 transition-all duration-300 transform hover:scale-105"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 bg-transparent"
              >
                View Pricing
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4">
              <div className="text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="text-2xl sm:text-3xl font-bold text-primary">5000+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Active Members</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="text-2xl sm:text-3xl font-bold text-primary">50+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Expert Trainers</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="text-2xl sm:text-3xl font-bold text-primary">98%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl animate-pulse"></div>
            <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl flex items-center justify-center border border-primary/20 backdrop-blur-sm overflow-hidden">
              <Image
                src="/modern-gym-interior-with-equipment-and-people-work.jpg"
                alt="Modern gym interior with equipment and people working out"
                fill
                className="rounded-3xl object-cover shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
