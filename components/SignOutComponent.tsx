"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutComponent() {
  return (
    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="flex flex-row justify-start items-start text-sm text-[#c9a24d] group hover:bg-[#c9a24d] focus:text-[#0b1236] focus:bg-[#c9a24d] ">
    <LogOut  width={4} height={4} className="mt-1 text-[#c9a24d]  group-hover:text-[#0b1236]" />  Sign out
    </DropdownMenuItem>
  );
}
