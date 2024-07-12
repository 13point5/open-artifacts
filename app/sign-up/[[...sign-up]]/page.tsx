import { HomePageLink } from "@/components/homepage-link";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-6 items-center justify-center p-16">
      <HomePageLink />
      <SignUp />
    </div>
  );
}
