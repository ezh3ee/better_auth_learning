"use client";

import { signupAction, SignupFormState } from "@/app/(public)/signup/action";
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
import Link from "next/link";
import { useActionState } from "react";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const initialSignupState: SignupFormState = {
    message: null,
    errors: {},
    success: false,
  };
  const [signupState, formAction, isPending] = useActionState(
    signupAction,
    initialSignupState
  );

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              {signupState.errors?.fullName && (
                <p className="text-red-700">{signupState.errors.fullName}</p>
              )}
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                name="fullName"
                required
              />
            </Field>
            <Field>
              {signupState.errors?.fullName && (
                <p className="text-red-700">{signupState.errors.username}</p>
              )}
              <FieldLabel htmlFor="name">Username</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="JOHNDOE"
                name="username"
                required
              />
            </Field>
            <Field>
              {signupState.errors?.email && (
                <p className="text-red-700">{signupState.errors.email}</p>
              )}
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name="email"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              {signupState.errors?.password && (
                <p className="text-red-700">{signupState.errors.password}</p>
              )}
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" name="password" required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
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
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
