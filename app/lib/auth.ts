import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins/username";
// If your Prisma file is located elsewhere, you can change the path
import prisma from "@/app/lib/prisma";
import { nextCookies } from "better-auth/next-js";
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
  plugins: [username(), nextCookies()],
  user: {
    additionalFields: {
      active: {
        type: "boolean",
        default: false,
        input: false,
      },
    },
  },
});
