import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shadcn/lib/utils";

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-25 items-center justify-center rounded-4xl bg-background py-6 text-xl font-medium gap-4 hover:bg-primary/80 cursor-pointer text-gray-300 bg-primary"
);

export function NavigationMenuTriggerDemo({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
    </NavigationMenuPrimitive.Trigger>
  );
}
