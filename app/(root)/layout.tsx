import { ChildProps } from "@/types";
import Header from "@/components/shared/header";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: ChildProps) {
  const session = await auth();

  if (!session) return redirect("/sign-in");

  return (
    <div className={"root-container"}>
      <div className={"mx-auto max-w-7xl"}>
        <Header session={session} />
        <div className={"mt-20 pb-20"}>{children}</div>
      </div>
    </div>
  );
}
