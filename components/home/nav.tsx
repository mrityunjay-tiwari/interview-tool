import Link from "next/link";
import React from "react";
import {cn} from "@/lib/utils";


import {sans} from "@/lib/fonts";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { Loader, Loader2Icon, LoaderCircle, LoaderPinwheel, LoaderPinwheelIcon, LucideLoader } from "lucide-react";
import { Spinner } from "../ui/spinner";
import Image from "next/image";
import { auth } from "@/utils/auth";

const menuItems = [
  {name: "Dashboard", href: "/dashboard"},
  {name: "Progress Log", href: "/progress"},
];

export const Navbar = async() => {
    const user = await auth();

    const userImage = user?.user?.image;

  return (
    <header>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-200 ",
        )}
      >
        {/* FULL-WIDTH SHELL (IMPORTANT) */}
        <div className="w-full px-3.5 md:px-0">
          {/* CENTERED CONTENT COLUMN */}
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-between gap-3 py-3 lg:py-4">
              {/* LEFT SIDE */}
              <div className="flex items-center gap-4 md:gap-12">
                <Link
                  href="/"
                  aria-label="home"
                  className="flex items-center grayscale-0 md:grayscale-50 scale-x-70 md:scale-x-100"
                >
                  <LucideLoader className="size-4" />
                </Link>

                <ul className="flex gap-3 sm:gap-6 md:gap-8 text-[12.5px] md:text-sm">
                  {menuItems.map((item) => {
                    

                    return (
                      <li key={item.href} className="relative">
                        <Link
                          href={item.href}
                          className={cn(
                            "relative block transition-colors duration-150",
                            sans.className,
                           
                          )}
                        >
                          <span>{item.name}</span>

                          {/* underline */}
                          <span
                            className={cn(
                              "absolute left-0 -bottom-0.5 h-[0.5px] w-full origin-left scale-x-0 bg-foreground transition-transform duration-300",
                             
                            )}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex items-center gap-2 sm:gap-3">
                {userImage && <Image src={userImage} alt="Profile" width={20} height={20} className="rounded-full" />}
                <AnimatedThemeToggler />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
