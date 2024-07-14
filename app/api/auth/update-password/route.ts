import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);

    return NextResponse.redirect(`${requestUrl.origin}/update-password`);
  }

  // eslint-disable-next-line no-console
  console.error("ERROR: Invalid auth code or no auth code found");

  return NextResponse.redirect(`${requestUrl.origin}/signin`);
}
