"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { ChevronRight } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuPortal = ContextMenuPrimitive.Portal;
const ContextMenuSub = ContextMenuPrimitive.Sub;

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPortal>
      <ContextMenuPrimitive.Content
        className={cn(
          "z-50 min-w-[200px] overflow-hidden rounded-lg border-[1.5px] border-[rgba(59,35,20,0.12)] bg-[#F5EBD9] p-1 text-[#3B2314] shadow-[0_8px_24px_rgba(59,35,20,0.18)]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      />
    </ContextMenuPortal>
  );
}

function ContextMenuItem({
  className,
  destructive,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  destructive?: boolean;
}) {
  return (
    <ContextMenuPrimitive.Item
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-[13px] outline-none",
        "focus:bg-[rgba(212,88,26,0.12)] focus:text-[#D4581A]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        destructive && "text-[#B33A1A] focus:bg-[rgba(179,58,26,0.1)] focus:text-[#B33A1A]",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      className={cn("my-1 h-px bg-[rgba(59,35,20,0.1)]", className)}
      {...props}
    />
  );
}

function ContextMenuSubTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger>) {
  return (
    <ContextMenuPrimitive.SubTrigger
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-[13px] outline-none",
        "focus:bg-[rgba(212,88,26,0.12)] focus:text-[#D4581A]",
        "data-[state=open]:bg-[rgba(212,88,26,0.12)] data-[state=open]:text-[#D4581A]",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-3.5 w-3.5" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPortal>
      <ContextMenuPrimitive.SubContent
        className={cn(
          "z-50 min-w-[180px] overflow-hidden rounded-lg border-[1.5px] border-[rgba(59,35,20,0.12)] bg-[#F5EBD9] p-1 text-[#3B2314] shadow-[0_8px_24px_rgba(59,35,20,0.18)]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      />
    </ContextMenuPortal>
  );
}

function ContextMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label>) {
  return (
    <ContextMenuPrimitive.Label
      className={cn(
        "px-2 py-1 text-[10px] uppercase tracking-[1px] text-[#7A5C42] font-semibold",
        className,
      )}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuLabel,
};
