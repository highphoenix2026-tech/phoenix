import {
  Calendar,
  Home,
  Search,
  Settings,
  User2,
  ChevronUp,
  Users,
  KeyRound,
  Ticket,
  Crown,
  FileUser,
  BookA,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authoptions";
import SignOutComponent from "./SignOutComponent";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "/admin/dashboard/users",
    icon: User2,
  },
  {
    title: "Banners",
    url: "/admin/dashboard/banner",
    icon: Ticket,
  },
  { title: "My Team", url: "/admin/dashboard/ourTeam", icon: Users },
  { title: "Clients", url: "/admin/dashboard/ourClients", icon: Crown },

  {
    title: "Category",
    url: "/admin/dashboard/categories",
    icon: Search,
  },
  {
    title: "Courses",
    url: "/admin/dashboard/courses",
    icon: BookA,
  },
  {
    title: "Applications",
    url: "/admin/dashboard/applications",
    icon: FileUser,
  },
];

export async function AppSidebar() {
  const session = await getServerSession(authOptions);
  const userName = session?.user.firstName;
  return (
    <Sidebar className="bg-black text-[#c9a24d]" collapsible="icon">
      <SidebarContent className="bg-[#0b1236]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#c9a24d] text-lg ">
            Admin Dashboard
          </SidebarGroupLabel>
          <span className="  border border-b-[#c9a24d]  mb-2.5"></span>
          <SidebarGroupContent>
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="hover:bg-[#c9a24d] hover:text-[#0b1236]">
                  <SidebarMenuButton asChild className="hover:bg-[#c9a24d] hover:text-[#0b1236]">
                    <a href={item.url}>
                      <item.icon />
                      <span >{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-[#0b1236] text-[#c9a24d]">
        <SidebarMenu>
          <SidebarMenuItem >
            <DropdownMenu >
              <DropdownMenuTrigger asChild className="hover:bg-[#c9a24d] hover:text-[#0b1236] border-[#0b1236] focus:border-[#c9a24d] ">
                <SidebarMenuButton >
                  <User2 /> {userName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="min-w-44 rounded-lg shadow-lg bg-[#0b1236]  border-[#c9a24d]  "
              >
                <DropdownMenuItem className="text-[#c9a24d] group  hover:bg-[#c9a24d] focus:text-[#0b1236] focus:bg-[#c9a24d] ">
                  <Link
                    href="/cahnge-password"
                    className="text-sm flex flex-row gap-1  "
                  >
                    <KeyRound
                      width={4}
                      height={4}
                      className="mt-1 text-[#c9a24d] group-hover:text-[#0b1236]  "
                    />
                    Change Password
                  </Link>
                </DropdownMenuItem >
                <SignOutComponent />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
