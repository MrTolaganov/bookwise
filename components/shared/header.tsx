"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";

interface Props {
  session: Session;
}

export default function Header({ session }: Props) {
  const pathname = usePathname();

  return (
    <header className={"my-10 flex justify-between gap-5"}>
      <Link href={"/"} className={"flex items-center gap-x-2"}>
        <Image src={"/icons/logo.svg"} alt={"Logo"} width={40} height={40} />
        <h1 className={"text-3xl max-md:text-2xl font-ibm-plex-sans font-bold"}>
          BookWise
        </h1>
      </Link>
      <ul className={"flex items-center gap-8"}>
        <li>
          <Link
            href={"/library"}
            className={`${cn("text-base", pathname === "/library" ? "text-light-200" : "text-light-100")}`}
          >
            Library
          </Link>
        </li>
        <li>
          <Link href={"/my-profile"}>
            <Avatar>
              <AvatarFallback
                className={"bg-amber-100 text-dark-100 font-semibold"}
              >
                {getInitials(session.user?.name!)}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
}
