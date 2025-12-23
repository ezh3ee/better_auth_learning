"use server";

import { auth } from "@/app/lib/auth";
import { log } from "console";
import { z } from "zod";

const SignupSchema = z.object({
  email: z.string().email({ error: "Invalid email" }),
  password: z.string().min(8),
  fullName: z.string(),
  username: z.string(),
});

export type SignupFormState = {
  errors: {
    fullName?: string[];
    email?: string[];
    password?: string[];
    username?: string[];
  };
  message: string | null;
  success: boolean;
};

export async function signupAction(
  state: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = SignupSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Missing Fields. Failed to create account.",
      success: false,
    };
  }

  try {
    const user = await auth.api.signUpEmail({
      body: {
        name: validatedFields.data.fullName,
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        username: validatedFields.data.username,
      },
    });

    log("from signup action ", user);
  } catch (e) {
    log("ERROR from signup action ", e);

    return {
      errors: {},
      message: "Cannot signup. Please try again later.",
      success: false,
    };
  }

  // redirect("/");

  return {
    errors: {},
    message: "Successfully created account",
    success: true,
  };
}
