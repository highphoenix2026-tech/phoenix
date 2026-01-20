import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider  style={{
    "--sidebar-width": "12rem",
    "--sidebar-width-mobile": "16rem",
  } as React.CSSProperties}>
      <AppSidebar />
      <main className="flex-1">
        <SidebarTrigger  />
        {children}
      </main>
    </SidebarProvider>
  )
}