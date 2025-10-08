import { Button } from "@/components/ui/button";
import { Play, Sparkles, Zap } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={"/hero-bg.jpeg"}
        alt="Hero Background"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        layout="fill"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-ai-primary/30 rounded-full animate-float" />
      <div
        className="absolute top-1/3 right-1/4 w-16 h-16 bg-ai-secondary/30 rounded-full animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-ai-accent/30 rounded-full animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-8 w-8 text-primary animate-glow mr-2" />
          <span className="text-primary font-semibold">
            Powered by Advanced AI
          </span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-primary">
          Create Stunning
          <br />
          Short Videos
        </h1>

        <p className="text-xl md:text-3xl text-white/80 mb-8 max-w-2xl mx-auto">
          Transform your ideas into captivating short videos in seconds.
          AI-powered video generation for content creators, marketers, and
          storytellers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="default" size="lg" className="text-lg px-8 py-4">
            <Play className="h-5 w-5" />
            Start Creating Free
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4">
            <Zap className="h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        <div className="mt-12 text-white/60">
          <p className="text-sm">
            No credit card required • Generate 3 videos free
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
