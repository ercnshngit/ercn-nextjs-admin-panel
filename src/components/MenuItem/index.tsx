"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

export default function MenuItem({
  label,
  href,
  Icon,
  ...rest
}: {
  label: string;
  href?: string;
  Icon: React.FC<{ fill: string }>;
  [key: string]: any;
}) {
  const pathname = usePathname();

  return (
    <div className="hidden md:block">
      <Link
        href={href || ""}
        {...rest}
        className={clsx(
          " flex flex-row items-center gap-1 px-16 mt-1 mb-1 mx-2 pl-4 rounded-[5px]  py-2 ",
          pathname === href && " bg-[#3040d6]/20 font-bold "
        )}
      >
        <Icon fill={pathname === href ? "#3040d6" : "#ccc"} />
        <p
          className={clsx(
            "ml-2 text-sm",
            pathname === href ? "text-[#3040d6]" : "text-[#000]"
          )}
        >
          {label}
        </p>
      </Link>
    </div>
  );
}
