"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { assets } from "@/public/assets/assets";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function DashboardShell({ children }: { children: React.ReactNode; }) {

  const router = useRouter()

  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="flex flex-col items-start justify-start h-screen">

      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
        <Image src={assets.logo} className="cursor-pointer w-32 sm:w-44" onClick={() => router.push('/')} alt="" />
        {
          sidebar ? <X onClick={() => setSidebar(false)} className="w-6 h-6 text-gray-600 sm:hidden" />
            : <Menu onClick={() => setSidebar(true)} className="w-6 h-6 text-gray-600 sm:hidden" />
        }
      </nav>

      <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        <main className="flex-1 bg-[#f4f7fb] overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </div>
  );
}