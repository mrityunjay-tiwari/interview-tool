import {Tooltip, TooltipContent, TooltipTrigger} from "../ui/tooltip";
import {CircleDot} from "lucide-react";
import Link from "next/link";

import { redirect } from "next/navigation";

export default function Footer() {
  return (
    <footer className="mb-10 mx-2 md:mx-0 flex flex-col items-center gap-6">
    
      <div className="text-xs md:text-sm text-neutral-400">
        © 2026 <Link href={'https://mrityunjay.site'} target="_blank" className="text-neutral-400 hover:text-neutral-500 transition-colors duration-200">Mrityunjay Tiwari</Link>
      </div>
    </footer>
  );
}

// © 2026
