"use client";
import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const username = user?.firstName + " " + user?.lastName || "User";

  return (
    <aside className="h-screen w-56 bg-white p-5 shadow-md shadow-purple-200/75">
      <div className="flex size-full flex-col gap-3">
        <div className="flex items-center gap-2">
          <UserButton />
          <h1 className="font-medium"> {username}</h1>
        </div>
        {/* <Link href="/" className="sidebar-logo">
          <Image
            src={"/assets/images/logo-no-background.png"}
            alt="logo"
            width={180}
            height={28}
          />
        </Link> */}
        <nav className=" h-full flex-col justify-between">
          <SignedIn>
            <ul className="w-full flex-col items-start gap-3">
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`flex-center  w-full whitespace-nowrap rounded-md  ${
                      isActive
                        ? " bg-blue-400 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    <Link
                      className="flex size-full gap-4 p-2"
                      href={link.route}
                    >
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && "brightness-200"}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SignedIn>
          <SignedOut>
            <button className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
