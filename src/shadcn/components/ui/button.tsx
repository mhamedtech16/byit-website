import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shadcn/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-primary hover:text-white dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        outlineSecoundry:
          "border bg-primary text-white shadow-xs hover:bg-background hover:text-primary dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        languageFlag: "bg-background",
        languageFlagMobile:
          "border bg-background shadow-xs hover:bg-primary hover:text-white dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        iconENClose: "absolute top-6 right-8 text-gray-500 bg-white text-md",
        iconARClose: "absolute top-6 left-8 text-gray-500 bg-white text-md",
        iconARTooltip: "absolute top-6 right-8 text-gray-500 bg-white text-md",
        iconENTooltip: "absolute top-6 left-8 text-gray-500 bg-white text-md",
        linkUnderline:
          "text-primary hover:underline hover:translate-x-1 transition-transform duration-200",
        scrollUp: `bg-primary text-white border-2 border-white shadow-md transition duration-300 hover:bg-white hover:text-primary hover:border-primary hover:shadow-lg active:scale-95`,
        icon: "bg-white text-primary hover:text-white shadow-xs hover:bg-primary/90 items-center justify-center flex",
        login: "bg-white text-black underline",
      },
      size: {
        default: "h-9 px-10 py-6 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        languageFlag: "p-1",
        languageFlagMobile: "h-9 px-0 py-6 has-[>svg]:px-3",
        iconClose: "px-2",
        linkUnderline: "p-0",
        login: "p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
