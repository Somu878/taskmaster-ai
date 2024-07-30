"use client";
import { menuItems, navLinks } from "@/constants";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  SignOutButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTheme } from "next-themes";

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const username = user?.firstName + " " + user?.lastName || "User";

  return (
    <aside className="h-screen w-56 p-3 shadow-md border-l">
      <div className="flex size-full flex-col gap-3">
        <div className="flex items-center gap-2">
          <UserButton afterSwitchSessionUrl="/" />
          <h1 className="font-medium"> {username}</h1>
        </div>
        <div className="flex items-center justify-between">
          <ul className="w-1/2 flex  items-start gap-1">
            {menuItems.slice(0, 6).map((link) => {
              return (
                <li
                  key={link.label}
                  className={`flex-center  w-full whitespace-nowrap rounded-md `}
                >
                  <Image src={link.icon} alt="icon" width={20} height={20} />
                </li>
              );
            })}
          </ul>
          <SignOutButton>
            <button className="flex justify-center text-sm  bg-zinc-100 bg-cover p-1 rounded border">
              Log out
            </button>
          </SignOutButton>
        </div>
        <nav className="h-full flex-col justify-between">
          <SignedIn>
            <ul className="w-full flex-col items-start gap-5">
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`flex-center w-full whitespace-nowrap rounded-md ${
                      isActive ? "bg-zinc-100 border" : "bg-transparent"
                    }`}
                  >
                    <Link
                      className="flex size-full gap-2 p-1.5"
                      href={link.route}
                    >
                      <Image
                        src={link.icon}
                        alt="icon"
                        width={24}
                        height={24}
                        className={`${
                          isActive ? "brightness-100" : "brightness-50"
                        }`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SignedIn>
        </nav>
        <button className="flex justify-center items-center gap-2 mb-2 bg-zinc-100 border-2 bg-cover p-2 rounded">
          <Image
            src={"/assets/download.svg"}
            alt="download"
            width={10}
            height={10}
          />
          Download the app
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
