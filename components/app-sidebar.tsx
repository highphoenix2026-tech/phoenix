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
    <Sidebar className="bg-black text-white" collapsible="icon">
      <SidebarContent className="bg-gray-800">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white text-lg ">
            Admin Dashboard
          </SidebarGroupLabel>
          <span className=" text-black  mb-2.5"></span>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-gray-800 text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {userName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="min-w-44 rounded-lg shadow-lg bg-gray-800 "
              >
                <DropdownMenuItem className="text-white">
                  <Link
                    href="/cahnge-password"
                    className="text-sm flex flex-row gap-1"
                  >
                    <KeyRound
                      width={4}
                      height={4}
                      className="mt-1 text-white"
                    />
                    Change Password
                  </Link>
                </DropdownMenuItem>
                <SignOutComponent />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
