import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-5xl font-bold tracking-tight text-[#131316] relative">
        Open Artifacts
      </h1>

      <div className="relative flex gap-3">
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
        </SignedOut>
      </div>
    </main>
  );
}
