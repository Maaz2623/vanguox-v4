import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChatViewSidebar } from "../components/chat-view-sidebar";
import { SiteHeader } from "../components/site-header";

export const ChatView = () => {
  return (
    <SidebarProvider
      className="dark:bg-neutral-900 bg-neutral-100"
      // style={
      //   {
      //     "--sidebar-width": "calc(var(--spacing) * 72)",
      //     "--header-height": "calc(var(--spacing) * 12)",
      //   } as React.CSSProperties
      // }
    >
      <ChatViewSidebar
        variant="inset"
        className="border-r border-neutral-200 dark:border-neutral-800"
      />
      <SidebarInset className="bg-transparent shadow-none!">
        <SiteHeader />
        <div></div>
      </SidebarInset>
    </SidebarProvider>
  );
};
