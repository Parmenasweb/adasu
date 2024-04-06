"use client";

import { Input } from "@/components/ui/input";

import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

function Header(props) {
  const { data: session, status } = useSession();
  return (
    <main>
      <div className=" my-3 flex w-[85%] mx-auto justify-around items-center">
        <div className="search flex justify-start flex-1 items-center">
          <GiHamburgerMenu
            onClick={props.toggleMenu}
            className=" cursor-pointer mr-3 text-3xl md:hidden"
          />
          <FaMagnifyingGlass className="sm:hidden md:block" />
          <Input className="w-[40%]" placeholder="Search....." type="search" />
        </div>
        <div className="account flex w-[15%] justify-end items-center">
          {status === "authenticated" && (
            <DropdownMenu className="cursor-pointer">
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={session.user?.image} />
                  <AvatarFallback className="font-bold">
                    {session.user.name?.at(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <h2 className=" text-xl font-bold w-[85%] mx-auto my-6">
        Hola! {session?.user.name.toUpperCase()}
      </h2>
    </main>
  );
}

export default Header;
