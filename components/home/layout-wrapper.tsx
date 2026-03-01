"use client";

import {usePathname} from "next/navigation";

export default function LayoutWrapper({
  children,
  navbar,
  bgGradient,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  bgGradient: React.ReactNode;
}) {
  const pathname = usePathname();
  const isInterviewPage = pathname.startsWith("/interview");

  return (
    <>
      {!isInterviewPage && navbar}
      {!isInterviewPage && bgGradient}
      {children}
    </>
  );
}
