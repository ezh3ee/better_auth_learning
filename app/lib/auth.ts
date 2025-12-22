import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins/username";
// If your Prisma file is located elsewhere, you can change the path
import prisma from "@/app/lib/prisma";
// import { PrismaPg } from "@prisma/adapter-pg";

// const adapter = new PrismaPg({
//   connectionString: process.env.POSTGRES_URL,
// });

// const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [username()],
  // emailVerification: {
  //   sendVerificationEmail: async ({ user, url, token }, request) => {
  //     log(`Click the link to verify your email: ${url}`);
  //   },
  //   sendOnSignUp: true,
  // },
});
