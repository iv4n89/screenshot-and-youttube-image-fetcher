"use client";

import { usePathname } from "next/navigation";
import { LinkNavbar } from "./LinkNavbar";

interface Props {
  types: Array<string>;
}

export default function LeftNavbar({
  types,
}: Readonly<Props>): React.JSX.Element {
  const pathname = usePathname();

  return (
    <ul className="space-y-2 grid grid-cols-1">
      {types.map((type) => (
        <LinkNavbar
          key={type}
          title={type}
          href={`/${type}`}
          currentPath={pathname}
        />
      ))}
    </ul>
  );
}
