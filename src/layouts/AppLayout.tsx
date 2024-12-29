"use client";

import { AppSidebar } from "@/app/components/core/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/app/components/core/mode-toggle";
import { useStore } from "@/lib/stores";
import { useEffect } from "react";
import { redirect } from "next/navigation";

type AppLayoutProps = {
  children: React.ReactNode;
  breadcrumbData: {
    title: string;
    url: string;
  }[];
  isLoading: boolean;
};

export default function AppLayout(props: AppLayoutProps) {
  const { children, breadcrumbData, isLoading } = props;

  const user = useStore((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      redirect("/auth/login");
    }
  }, [user]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb className="flex items-center justify-between w-full">
            <BreadcrumbList>
              {breadcrumbData?.map((breadcrumb, index) => (
                <div key={breadcrumb.title} className="flex items-center gap-2">
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href={breadcrumb.url}>
                      {breadcrumb.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < breadcrumbData.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </div>
              ))}
            </BreadcrumbList>
            <ModeToggle />
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {isLoading ? (
            <>
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </>
          ) : (
            children
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
