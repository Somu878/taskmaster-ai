"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  const username = user?.username || "User";
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {" "}
        <UserButton />
        Hello! {username}
      </div>
      {/* <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn></SignedIn>
      </div> */}
    </main>
  );
}
