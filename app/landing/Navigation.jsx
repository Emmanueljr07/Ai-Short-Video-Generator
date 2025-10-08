"use client";
import { Button } from "@/components/ui/button";
import { Video, User } from "lucide-react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const Navigation = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/sign-up";
    }
  }, [user]);
  return (
    <nav className="bg-black/50 fixed top-0 w-full z-50 border-white/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href={"/"} key={1} className="flex items-center space-x-2">
            <Video className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary bg-clip-text">
              AIClips
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href={"/"}
              key={2}
              className={
                "text-sm font-medium transition-color text-white hover:text-primary"
              }
            >
              Home
            </Link>
            {user ? (
              <UserButton />
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => (window.location.href = "/sign-in")}
              >
                <User className="h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
