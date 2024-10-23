"use client";

import { usePathname } from "next/navigation";
import { LinkNavbar } from "./LinkNavbar";

export default function LeftNavbar() {
  const pathname = usePathname();

  return (
    <ul className="space-y-2 grid grid-cols-1">
      <LinkNavbar title="General" href="/general" currentPath={pathname} />
      <LinkNavbar
        title="Javascript"
        href="/javascript"
        currentPath={pathname}
      />
      <LinkNavbar
        title="Typescript"
        href="/typescript"
        currentPath={pathname}
      />
      <LinkNavbar title="React" href="/react" currentPath={pathname} />
      <LinkNavbar title="Angular" href="/angular" currentPath={pathname} />
      <LinkNavbar title="Tailwind" href="/tailwind" currentPath={pathname} />
    </ul>
  );
}
