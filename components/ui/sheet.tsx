"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetTitle = SheetPrimitive.Title;
export const SheetDescription = SheetPrimitive.Description;


export const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
    side?: "left" | "right";
  }
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPrimitive.Portal>
    {/* Background overlay */}
    <SheetPrimitive.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-99998" />

    {/* CONTENT PANEL */}
    <SheetPrimitive.Content
      ref={ref}
      {...props}
      className={cn(
        "fixed z-99999 top-0 h-full w-72 bg-[#071425] border-l border-white/10 shadow-xl",
        side === "right" && "right-0",
        className
      )}
    >
      {/* X BUTTON */}
      <SheetClose className="absolute right-4 top-4 text-slate-300 text-xl hover:text-white transition">
        ✕
      </SheetClose>

      <VisuallyHidden>
        <SheetTitle>Mobil Menü</SheetTitle>
      </VisuallyHidden>

      <div className="pt-16 px-6 pb-8 flex flex-col gap-8">{children}</div>
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
));

SheetContent.displayName = SheetPrimitive.Content.displayName;
