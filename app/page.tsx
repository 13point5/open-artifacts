import { HomePageLink } from "@/components/homepage-link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 p-16">
      <HomePageLink />

      <div className="flex items-center gap-4">
        <SignedIn>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
          >
            Dashboard
          </Link>
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton>
            <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
      </div>
    </main>
  );
}
