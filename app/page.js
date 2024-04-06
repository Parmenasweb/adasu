"use client";
import { cn } from "../lib/utils";
import Link from "next/link";
import { Merriweather } from "next/font/google";
import { Button } from "../components/ui/button";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

const font = Merriweather({
  subsets: ["cyrillic"],
  weight: ["700"],
});

const Home = () => {
  return (
    <main
      className={cn(
        " text-white h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800",
        font.className
      )}
    >
      <div className="flex items-center justify-between w-[80%] m-auto">
        <h2> DASU</h2>
        <div>
          <Link href="/auth/login">
            <Button
              size="lg"
              variant="link"
              className="text-white p-3 border-lg"
            >
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button
              size="lg"
              variant="link"
              className="text-white p-3 border-lg"
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
      <h1
        className={cn(
          "text-3xl flex items-center justify-center h-[50%] text-white",
          font.className
        )}
      >
        WELCOME TO DASU
      </h1>
    </main>
  );
};

export default Home;
