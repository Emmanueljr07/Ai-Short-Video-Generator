import { Card } from "@/components/ui/card";
import { Brain, Clock, Palette, Share2, Target, Wand2 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description:
      "Advanced neural networks understand your content and create videos that perfectly match your vision.",
  },
  {
    icon: Clock,
    title: "Lightning Fast",
    description:
      "Generate professional-quality videos in under 30 seconds. No more hours of editing.",
  },
  {
    icon: Palette,
    title: "Custom Styles",
    description:
      "Choose from hundreds of visual styles or create your own unique aesthetic with AI assistance.",
  },
  {
    icon: Target,
    title: "Platform Optimized",
    description:
      "Perfect dimensions and formats for TikTok, Instagram Reels, YouTube Shorts, and more.",
  },
  {
    icon: Share2,
    title: "One-Click Sharing",
    description:
      "Export and share directly to all major social platforms with optimized settings.",
  },
  {
    icon: Wand2,
    title: "Magic Editing",
    description:
      "Describe changes in plain text and watch AI transform your video instantly.",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-primary">
            Why Choose VideoAI?
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Experience the future of video creation with our cutting-edge AI
            technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gradient-card border border-white/10 p-6 group hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
