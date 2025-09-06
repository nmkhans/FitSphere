"use client";

import { Button } from "@/components/ui/button";
import {
  SimpleDropdown,
  DropdownItem,
} from "@/components/ui/dropdown-menu";
import { Dumbbell, Users } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg animate-glow">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-primary">
                FitSphere
              </span>
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Pricing
            </a>
            <a
              href="#blog"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Blog
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <SimpleDropdown
              trigger={
                <Button className="bg-accent border-gray-900/70 hover:bg-accent/90 text-accent-foreground hover:shadow-accent/25 transition-all duration-300 transform hover:scale-105">
                  Get Started
                </Button>
              }
            >
              <DropdownItem
                onClick={() =>
                  console.log("Apply as Trainer clicked")
                }
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Apply as Trainer
              </DropdownItem>
              <DropdownItem
                onClick={() => console.log("Join as Member clicked")}
                className="flex items-center gap-2"
              >
                <Dumbbell className="h-4 w-4" />
                Join as Member
              </DropdownItem>
            </SimpleDropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}
