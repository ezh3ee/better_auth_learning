import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../lib/auth";

export default async function Home() {
  return (
    <div>
      Protected route
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
