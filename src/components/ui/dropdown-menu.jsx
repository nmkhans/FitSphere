"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const DropdownMenu = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("relative inline-block text-left", className)} {...props}>
    {children}
  </div>
))
DropdownMenu.displayName = "DropdownMenu"

const DropdownMenuTrigger = React.forwardRef(({ className, children, asChild = false, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)
  
  const toggleDropdown = () => setIsOpen(!isOpen)

  const Comp = asChild ? React.cloneElement(children, { onClick: toggleDropdown, ref }) : "button"

  if (asChild) {
    return React.cloneElement(children, {
      onClick: toggleDropdown,
      ref,
      "data-state": isOpen ? "open" : "closed"
    })
  }

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={toggleDropdown}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
    </button>
  )
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef(({ className, children, align = "end", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95",
        align === "end" ? "right-0" : "left-0",
        "top-full mt-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
DropdownMenuItem.displayName = "DropdownMenuItem"

// Simple dropdown implementation
const SimpleDropdown = ({ trigger, children, className }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef(null)

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {React.cloneElement(trigger, {
          className: cn(trigger.props.className, "flex items-center gap-2"),
          children: [
            trigger.props.children,
            <ChevronDown key="chevron" className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
          ]
        })}
      </div>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-md border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95 z-50">
          <div className="p-1">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

const DropdownItem = ({ children, onClick, className }) => (
  <div
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className
    )}
    onClick={onClick}
  >
    {children}
  </div>
)

export { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  SimpleDropdown,
  DropdownItem
}
