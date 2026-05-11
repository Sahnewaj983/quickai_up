"use client";

import { useClerk, useUser} from "@clerk/nextjs";
import {
    Eraser,
    FileText,
    Hash,
    House,
    Image as ImageIcon,
    LogOut,
    Scissors,
    SquarePen,
    Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
    { to: "/ai", label: "Dashboard", Icon: House },
    { to: "/ai/write-article", label: "Write Article", Icon: SquarePen, },
    { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash, },
    { to: "/ai/generate-images", label: "Generate Images", Icon: ImageIcon, },
    { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser, },
    { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors, },
    { to: "/ai/review-resume", label: "Review Resume", Icon: FileText, },
    { to: "/ai/community", label: "Community", Icon: Users, },
];

interface SidebarProps {
    sidebar: boolean;
    setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ sidebar, setSidebar }: SidebarProps) => {

    const pathname = usePathname();

    const { user } = useUser();

    const { signOut, openUserProfile } = useClerk();

    return (
        <div
            className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 
            ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full" } transition-all duration-300 ease-in-out`}>
            <div className="my-7 w-full">
                {user && (
                    <>
                        <Image
                            src={user.imageUrl}
                            alt="user avatar"
                            width={52}
                            height={52}
                            className="rounded-full mx-auto"
                        />

                        <h1 className="mt-1 text-center">
                            {user.fullName}
                        </h1>
                    </>
                )}

                <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
                    {navItems.map(
                        ({ to, label, Icon }) => {
                            const isActive =
                                pathname === to;

                            return (
                                <Link
                                    key={to}
                                    href={to}
                                    onClick={() =>
                                    setSidebar(false)
                                    }
                                    className={`px-3.5 py-2.5 flex items-center gap-3 rounded transition ${isActive ? "bg-linear-to-r from-[#3c81f6] to-[#9234ea] text-white"  : "hover:bg-gray-100" }`} >
                                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                                    {label}
                                </Link>
                            );
                        }
                    )}
                </div>
            </div>

            <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
                {user && (
                    <>
                        <div
                            className="flex gap-2 items-center cursor-pointer"
                            onClick={() => openUserProfile()} >
                            <Image
                                src={user.imageUrl}
                                alt="user"
                                width={32}
                                height={32}
                                className="rounded-full"
                            />

                            <div>
                                <h1 className="text-sm font-medium">
                                    {user.fullName}
                                </h1>
                            </div>
                        </div>

                        <LogOut
                            onClick={() => signOut()}
                            className="w-4 h-4 text-gray-400 hover:text-gray-700 transition cursor-pointer"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;