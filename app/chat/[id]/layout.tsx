import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { sessionId } = auth();

  if (!sessionId) redirect("/sign-in");

  return children;
};

export default Layout;
