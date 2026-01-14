"use client";

import { NAV_ITEMS } from "@/lib/contants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

const Navitems = () => {
  const pathname: string = usePathname();

  const isActive: (path: string) => boolean | undefined = (path: string) => {
    if (path === "/") return pathname === "/";

    return pathname.startsWith(path);
  };
  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map(({ href, label }) => (
        <li key={label}>
          <Link
            href={href}
            className={`hover:text-yellow-500 transition-colors ${
              isActive(href) ? "text-gray-100" : ""
            }`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navitems;
