import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the AI Short Video Generator</h1>
      <p>Generate short videos using AI technology.</p>
      <Button>Generate Video</Button>

      <UserButton />
    </div>
  );
}
