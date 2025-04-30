"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
export function NavMain({ items }) {
  const pathName = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              pathName === item.url ||
              (pathName.startsWith(item.url) && item.url !== "/");

            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collection"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <Link href={item.url}>
                      <SidebarMenuButton
                        size="lg"
                        className={`${isActive
                          ? "text-primary-600 bg-primary-100"
                          : "text-gray-700 hover:bg-primary-100 hover:text-primary-600"
                          } hover:text-primary-600 cursor-pointer transition-colors`}
                        tooltip={item.title}
                      >
                        {item.icon && <item.icon />}
                        <span className="text-base">{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const subItemIsActive = pathName === subItem.url;

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <Link href={subItem.url}>
                              <SidebarMenuSubButton
                                asChild
                                className={`${subItemIsActive
                                  ? "text-primary-600 bg-primary-100"
                                  : "text-gray-700 hover:bg-primary-100 hover:text-primary-600"
                                  } hover:text-primary-600 cursor-pointer transition-colors`}
                              >
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </Link>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
