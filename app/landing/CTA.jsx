"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="bg-gradient-card border border-white/10 rounded-3xl p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full bg-primary opacity-10" />

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-8 w-8 text-yellow-400 fill-current"
                />
              ))}
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-primary bg-clip-text text-transparent">
              Ready to Create Magic?
            </h2>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using VideoAI to bring
              their stories to life. Start your free trial today and see the
              difference AI can make.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="hero"
                size="lg"
                className="text-lg px-8 py-4"
                onClick={() => (window.location.href = "/sign-up")}
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="glass" size="lg" className="text-lg px-8 py-4">
                View Pricing
              </Button>
            </div>

            <div className="mt-8 text-white/60">
              <p className="text-sm">
                ✨ No credit card required • ⚡ Setup in 30 seconds • 🎯 Cancel
                anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
