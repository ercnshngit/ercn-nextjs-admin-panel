"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row h-full max-w-full">
      <div className="w-1/5 min-h-full shadow">
        <Sidebar className="flex-shrink hidden sm:block" />
      </div>
      <div className="flex flex-col flex-1 w-4/5 min-h-screen bg-gray-50 ">
        <Header mail="admin" />

        <div className="w-full ">
          {/* bir kere providers a sardığımız için tekrar eklemeye gerek yok */}
          {children}
        </div>
      </div>
    </div>
  );
}
