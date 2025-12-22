import { SignupForm } from "@/components/signup-form";
import { log } from "console";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../lib/auth";

export default async function Signup() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/");
  }

  log("session", session);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
