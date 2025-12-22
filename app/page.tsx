import { Button } from "@/components/ui/button";
import { log } from "console";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./lib/auth";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/signup");
  }

  log("session", session);

  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
