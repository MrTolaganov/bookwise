"use server";

import { AuthCredentials } from "@/types";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/lib/auth";
import { headers } from "next/headers";
import { ratelimit } from "@/lib/ratelimit";
import { redirect } from "next/navigation";

export async function signInWithCredentials({
  email,
  password,
}: Pick<AuthCredentials, "email" | "password">) {
  const heads = await headers();
  const ip = heads.get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) return { success: false, error: response.error };

    return { success: true };
  } catch (error: any) {
    console.error(`Sign up error: ${error.message}`);
    return { success: false, error: "Email or password is incorrect" };
  }
}

export async function signUp(authCredentials: AuthCredentials) {
  const heads = await headers();
  const ip = heads.get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("too-fast");

  try {
    const { fullName, universityCard, universityId, password, email } =
      authCredentials;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0)
      return { success: false, error: "User already exists" };

    const hashedPassword = await hash(password, 10);

    await db.insert(users).values({
      fullName,
      email,
      universityId,
      universityCard,
      password: hashedPassword,
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error: any) {
    console.error(`Sign up error: ${error.message}`);
    return { success: false, error: "Sign up error" };
  }
}
