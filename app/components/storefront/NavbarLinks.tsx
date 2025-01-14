"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const links = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  { id: 1, name: "All Products", href: "/products/all" },
  { id: 2, name: "Men", href: "/products/men" },
  { id: 3, name: "Women", href: "/products/women" },
  { id: 4, name: "Kids", href: "/products/kids" },
];

export function NavbarLinks() {
  const location = usePathname();
  return (
    <div className="hidden sm:flex justify-center items-center gap-x-2 ml-8">
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={cn(
            location === link.href
              ? "bg-muted"
              : " hover:bg-muted hover:bg-opacity-75",
            "px-3 py-2 rounded-md font-medium",
          )}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}
