"use client";

import AuthForm from "@/components/forms/auth.form";
import { signInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/actions/auth.action";

export default function Page() {
  return (
    <AuthForm
      type={"SIGN_IN"}
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  );
}
