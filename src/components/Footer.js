"use client";

import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t border-border/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Dumbbell className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold text-primary">
                FitSphere
              </span>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">
              Transform your fitness journey with our comprehensive
              gym management system.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  Trainers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">
              Support
            </h3>
            <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">
              Contact Info
            </h3>
            <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
              <li>123 Fitness Street</li>
              <li>Gym City, GC 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@fitsphere.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground text-sm sm:text-base">
          <p>&copy; 2024 FitSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
