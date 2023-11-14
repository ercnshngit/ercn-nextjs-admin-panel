"use client";
import React from "react";
import MenuItem from "../MenuItem";
import { MENU } from "@/constants/menu-items";
import { BiSolidExit } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { SubstractIcon } from "@/assets/icons/SubtractIcon";
export default function Menu({element}:{element:boolean}) {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/auth/login");
  };

  return (
    <aside className="flex flex-col justify-between h-full bg-white shadow-md">
       <div>
       <div className="flex flex-row justify-center w-full p-8">
        <div className="text-lg md:text-2xl">AdminPaneli</div>
      </div>
    <div className="flex flex-col gap-1 md:w-[14vw] w-0">
    
      {MENU.map((item) => (
        <MenuItem
          key={item.label}
          label={item.label}
          Icon={item.icon}
          href={item.href}
        />
      ))}
    </div>
       </div>
    <div className="mb-10">
      <MenuItem
        label="Çıkış Yap"
        Icon={SubstractIcon}
        onClick={handleLogout}
      />
    </div>
  </aside>
  );
}
