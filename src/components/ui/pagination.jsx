"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ className, ...props }) {
  return (
    <li
      className={cn("", className)}
      {...props}
    />
  )
}

function PaginationLink({ className, isActive, ...props }) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        isActive ? "bg-accent text-accent-foreground" : "bg-background",
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({ className, ...props }) {
  return (
    <PaginationLink
      className={cn("px-2.5", className)}
      {...props}
    />
  )
}

function PaginationNext({ className, ...props }) {
  return (
    <PaginationLink
      className={cn("px-2.5", className)}
      {...props}
    />
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
}
