"use client";

import AuthForm from "@/components/forms/auth.form";
import { signUpSchema } from "@/lib/validations";
import { signUp } from "@/actions/auth.action";

export default function Page() {
  return (
    <AuthForm
      type={"SIGN_UP"}
      schema={signUpSchema}
      defaultValues={{
        fullName: "",
        email: "",
        password: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={signUp}
    />
  );
}
