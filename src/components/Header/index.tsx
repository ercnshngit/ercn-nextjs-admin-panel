import Image from "next/image";
import React from "react";
import Logo from "@/assets/images/cosmos2523.jpg";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation"
import Cookies from 'universal-cookie'

export default function Header({ className, mail }: { className?: string, mail: string }) {
  const router = useRouter();
  const cookies = new Cookies()

  const handleLogoClick = () => {
    // Remove cookies
    cookies.remove('accessToken', { path: '/' });


    // Navigate to the home page
    router.push('/');
    router.refresh(); // Optionally refresh the page
  };

  return (
    <div
      className={clsx(
        "pl-8 pr-4 w-full h-24 flex-row flex justify-end items-center relative bg-white shadow",
        className
      )}
    >
     
      <div className="flex flex-row items-center">
        <p className="mr-4">{mail}</p>
        <div className="flex items-center justify-center h-16 mr-5 border-2 rounded-full">
          <button onClick={handleLogoClick}>
            <Image
              src={Logo}
              alt="Teknopark Logo"
              className="relative object-cover w-16 h-16 p-1 rounded-full"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
