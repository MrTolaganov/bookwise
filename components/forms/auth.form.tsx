"use client";

import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import ImageUpload from "@/components/shared/image-upload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP";
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (values: T) => Promise<{ success: boolean; error?: string }>;
}

export default function AuthForm<T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) {
  const authForm: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const router = useRouter();

  const handleSubmit: SubmitHandler<T> = async (values: T) => {
    const response = await onSubmit(values);

    if (response.success) {
      toast.success(
        type === "SIGN_IN"
          ? "You have successfully signed in"
          : "You have successfully signed up",
      );

      router.push("/");
    } else {
      toast.error(response.error || "Something went wrong");
    }
  };

  return (
    <div className={"flex flex-col gap-4"}>
      <h1 className={"text-2xl font-semibold text-white"}>
        {type === "SIGN_IN"
          ? "Welcome back to BookWise"
          : "Create your library account"}
      </h1>
      <p className={"text-light-100"}>
        {type === "SIGN_IN"
          ? "Access the vast collection of resources and stay updated"
          : "Please complete all fields and a upload valid university ID to gain access to the library"}
      </p>
      <Form {...authForm}>
        <form
          onSubmit={authForm.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          {Object.keys(defaultValues).map((value) => (
            <FormField
              key={value}
              control={authForm.control}
              name={value as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <Label className={"capitalize"}>
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </Label>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload onFileChange={field.onChange} />
                    ) : (
                      <Input
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        required
                        {...field}
                        className={"form-input"}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className={"form-btn"}>
            {type === "SIGN_IN" ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>
      <p className={"text-center text-base font-medium"}>
        {type === "SIGN_IN" ? "New to BookWise? " : "Already have an account? "}
        <Link
          href={type === "SIGN_IN" ? "/sign-up" : "/sign-in"}
          className={"font-bold text-primary"}
        >
          {type === "SIGN_IN" ? "Create an account" : "Sign In"}
        </Link>
      </p>
    </div>
  );
}
