import { UserButton } from "@clerk/nextjs";
import Navigation from "./landing/navigation";
import Hero from "./landing/Hero";
import Features from "./landing/Features";
import CTA from "./landing/CTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-black/95">
      <Navigation />
      <Hero />
      <Features />
      <CTA />

      <UserButton />
    </div>
  );
}
