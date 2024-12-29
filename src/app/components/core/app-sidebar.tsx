"use client";

import * as React from "react";

import { SearchForm } from "@/app/components/core/search-form";
import { VersionSwitcher } from "@/app/components/core/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation"; // Replace router import
import { useEffect } from "react";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
      {
        title: "Main",
        items: [
          {
            title: "Dashboard",
            url: "/dashboard",
            isActive: pathname === "/dashboard",
          },
          {
            title: "Browse Coaches",
            url: "/coaches",
            isActive: pathname === "/coaches",
          },
          {
            title: "Player Directory",
            url: "/players",
            isActive: pathname === "/players",
          },
        ],
      },
      {
        title: "Games & Analysis",
        items: [
          {
            title: "Game Analysis",
            url: "/analyse",
            isActive: pathname === "/analyse",
          },
          {
            title: "Game Library",
            url: "/library",
            isActive: pathname === "/library",
          },
          {
            title: "Play a Game",
            url: "/play",
            isActive: pathname === "/play",
          },
          {
            title: "My Sessions",
            url: "/sessions",
            isActive: pathname === "/sessions",
          },
          {
            title: "My Analytics",
            url: "/analytics",
            isActive: pathname === "/analytics",
          },
        ],
      },
      {
        title: "Tournaments",
        items: [
          {
            title: "Upcoming Tournaments",
            url: "/tournaments/upcoming",
            isActive: pathname === "/tournaments/upcoming",
          },
          {
            title: "My Tournaments",
            url: "/tournaments/mine",
            isActive: pathname === "/tournaments/mine",
          },
          {
            title: "Create a Tournament",
            url: "/tournaments/create",
            isActive: pathname === "/tournaments/create",
          },
        ],
      },
      {
        title: "Profile",
        items: [
          {
            title: "My Profile",
            url: "/profile",
            isActive: pathname === "/profile",
          },
          {
            title: "My Chess Stats",
            url: "/profile/stats",
            isActive: pathname === "/profile/stats",
          },
          {
            title: "Achievements",
            url: "/profile/achievements",
            isActive: pathname === "/profile/achievements",
          },
        ],
      },
      {
        title: "Resources",
        items: [
          {
            title: "Learning Center",
            url: "/resources/learning-center",
            isActive: pathname === "/resources/learning-center",
          },
          {
            title: "Chess News",
            url: "/resources/news",
            isActive: pathname === "/resources/news",
          },
          {
            title: "Chess Tools",
            url: "/resources/tools",
            isActive: pathname === "/resources/tools",
          },
        ],
      },
      {
        title: "Community",
        items: [
          {
            title: "Forums",
            url: "/community/forums",
            isActive: pathname === "/community/forums",
          },
          {
            title: "Events & Webinars",
            url: "/community/events",
            isActive: pathname === "/community/events",
          },
          {
            title: "Groups",
            url: "/community/groups",
            isActive: pathname === "/community/groups",
          },
        ],
      },
      {
        title: "Settings",
        items: [
          {
            title: "Account Settings",
            url: "/settings/account",
            isActive: pathname === "/settings/account",
          },
          {
            title: "Notification Settings",
            url: "/settings/notifications",
            isActive: pathname === "/settings/notifications",
          },
          {
            title: "Payment Settings",
            url: "/settings/payments",
            isActive: pathname === "/settings/payments",
          },
          {
            title: "App Settings",
            url: "/settings/app",
            isActive: pathname === "/settings/app",
          },
        ],
      },
      {
        title: "Help & Support",
        items: [
          {
            title: "FAQs",
            url: "/help/faqs",
            isActive: pathname === "/help/faqs",
          },
          {
            title: "Contact Support",
            url: "/help/contact",
            isActive: pathname === "/help/contact",
          },
          {
            title: "Tutorials",
            url: "/help/tutorials",
            isActive: pathname === "/help/tutorials",
          },
          {
            title: "Terms & Conditions",
            url: "/help/terms",
            isActive: pathname === "/help/terms",
          },
          {
            title: "About Us",
            url: "/about",
            isActive: pathname === "/about",
          }
        ],
      }
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-background" >
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="mb-6 bg-background">
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url} className={`hover:bg-muted/50 dark:hover:text-white  ${item.isActive ? '!bg-primary !text-white' : ''}`}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
