"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutComponent() {
  return (
    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="flex flex-row justify-start items-start text-sm">
    <LogOut  width={4} height={4} className="mt-1" />  Sign out
    </DropdownMenuItem>
  );
}
