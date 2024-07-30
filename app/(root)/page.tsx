// "use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  // const { user } = useUser();

  // const username = user?.firstName || "User";
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      {/* <div>
        {" "}
        <UserButton />
        Hello! {username}
      </div> */}
      {/* <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn></SignedIn>
      </div> */}
    </main>
  );
}
