"use client"

import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-accent via-accent/90 to-accent/80 text-accent-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Ready to Start Your Fitness Journey?</h2>
        <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Join thousands of satisfied members and transform your life today
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 bg-accent-foreground text-accent hover:bg-accent-foreground/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Get Started Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10 hover:border-accent-foreground/50 bg-transparent transition-all duration-300 transform hover:scale-105"
          >
            Schedule a Tour
          </Button>
        </div>
      </div>
    </section>
  )
}
