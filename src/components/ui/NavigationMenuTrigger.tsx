import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shadcn/lib/utils";

const navigationMenuTriggerStyle = cva(
  "group h-9 w-25 items-center justify-center rounded-4xl bg-white py-6 text-xl font-medium gap-3 cursor-pointer"
);

export function NavigationMenuTriggerDemo({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      asChild
      data-slot="navigation-menu-trigger"
      className={cn(
        navigationMenuTriggerStyle(),
        "[&>span]:hidden", // ← دي السطر المهم
        className
      )}
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Trigger>
  );
}
