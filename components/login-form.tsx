"use client";
import { signinAction, SigninFormState } from "@/app/(public)/login/action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useActionState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const initialSigninState: SigninFormState = {
    message: null,
    errors: {},
    success: false,
  };
  const [signupState, formAction, isPending] = useActionState(
    signinAction,
    initialSigninState
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username and password to log in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">User name</FieldLabel>
                {signupState.errors?.username && (
                  <p className="text-red-700">{signupState.errors.username}</p>
                )}
                <Input
                  id="username"
                  type="username"
                  placeholder="Vasya Pupkin"
                  name="username"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                {signupState.errors?.password && (
                  <p className="text-red-700">{signupState.errors.password}</p>
                )}
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>

            {Object.keys(signupState.errors).length > 0 && (
              <p className="mt-2 text-sm text-red-500">
                Ошибки при заполнении.
              </p>
            )}

            {signupState.message && signupState.success && (
              <p className="mt-2 text-sm text-green-500">
                {signupState.message}
              </p>
            )}

            {signupState.message && !signupState.success && (
              <p className="mt-2 text-sm text-red-500">{signupState.message}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
