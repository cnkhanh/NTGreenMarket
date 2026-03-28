"use client"

import { useState } from "react"
import { Menu, X, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavLink {
  href: string
  label: string
  active?: boolean
}

interface NavbarProps {
  links?: NavLink[]
  className?: string
}

function Navbar({ links = [], className }: NavbarProps) {
  const [open, setOpen] = useState(false)

  return (
    <header
      className={cn(
        "sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm",
        className
      )}
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 font-heading font-bold text-xl text-gray-900">
            <Leaf size={24} className="text-accent" />
            NT Green Market
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-[150ms]",
                  link.active
                    ? "text-primary border-b-2 border-primary pb-0.5"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 flex flex-col gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "block px-3 py-2.5 rounded text-sm font-medium transition-colors",
                link.active
                  ? "text-primary bg-primary/5"
                  : "text-gray-700 hover:text-primary hover:bg-gray-50"
              )}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

export { Navbar }
