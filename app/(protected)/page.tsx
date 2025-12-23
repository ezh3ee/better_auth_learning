import { auth } from "@/app/lib/auth";
import { Button } from "@/components/ui/button";
import { log } from "console";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  log("session", session);
  return (
    <div>
      <h1>Hello, {session?.user.displayUsername}</h1>
      <Button>Click me</Button>
      <Button
        onClick={async () => {
          "use server";

          await auth.api.signOut({
            headers: await headers(),
          });

          redirect("/login");
        }}
      >
        Signout
      </Button>
    </div>
  );
}
