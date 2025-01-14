import Link from "next/link";

interface Props {
  title: string;
  href: string;
  currentPath: string;
}

export function LinkNavbar({ title, href, currentPath }: Readonly<Props>) {
  return (
    <li className="w-full flex">
      <button
        className={`px-5 py-2 flex-1 ${
          currentPath.toLowerCase() === href.toLowerCase()
            ? "bg-gray-300 text-black"
            : ""
        }`}
      >
        <Link href={href.toLowerCase()}>{title}</Link>
      </button>
    </li>
  );
}
