"use client";

import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Header from "@/components/dashboardComps/Header";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  const queryClient = new QueryClient();

  function toggleMenu() {
    setShowMenu(!showMenu);
  }
  return (
    <QueryClientProvider client={queryClient}>
      <section className=" md:grid sm:grid-cols-1 md:grid-cols-5 md:gap-8 w-full">
        {showMenu && (
          <div className=" z-10 -mt-3 fixed w-[50%] min-h-screen">
            <NavBar showMenu={showMenu} toggleMenu={toggleMenu} />
          </div>
        )}
        <div className=" sm:hidden md:fixed md:block md:w-[20%] md:col-span-1 md:min-h-screen">
          <NavBar />
        </div>
        <div className=" z-0 w-full md:ml-[25%] md:col-span-4">
          <Header showMenu={showMenu} toggleMenu={toggleMenu} />
          {children}
          <div className="flex justify-center w-[70%] my-20 mx-auto items-center">
            <p className="font-bold text-sm bg-purple-300">
              made with ❤ by parma
            </p>
          </div>
        </div>
      </section>
    </QueryClientProvider>
  );
}
