"use client";

import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
      <Link
        className={` link ${
          pathname === "/"
            ? "bg-gray-800 text-white"
            : "text-white/50 hover:text-white"
        } p-4 relative group inline-flex justify-center rounded-md hover:bg-gray-800  smooth-hover`}
        href="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <span className="group-hover:opacity-100 transition-opacity bg-black px-3 py-1 text-sm text-gray-100 rounded-md absolute right-0 -top-3  translate-x-12 opacity-0 m-4 mx-auto">
          Home
        </span>
      </Link>
      <Link
        className={` link ${
          pathname === "/journal"
            ? "bg-gray-800 text-white"
            : "text-white/50 hover:text-white"
        } hover:bg-gray-800 relative group  p-4 inline-flex justify-center rounded-md`}
        href="/journal"
      >
        <FontAwesomeIcon className="text-xl" icon={faFolderOpen} />
        <span className="group-hover:opacity-100 transition-opacity bg-black px-3 py-1 text-sm text-gray-100 rounded-md absolute right-0 -top-3  translate-x-3/4 opacity-0 m-4 mx-auto">
          Journals
        </span>
      </Link>
      <Link
        className={` group link ${
          pathname === "/history"
            ? "bg-gray-800 text-white"
            : "text-white/50 hover:text-white"
        } relative p-4 inline-flex justify-center rounded-md hover:bg-gray-800  smooth-hover`}
        href="/history"
      >
        <FontAwesomeIcon className="text-xl" icon={faChartLine} />
        <span className="group-hover:opacity-100 transition-opacity bg-black px-3 py-1 text-sm text-gray-100 rounded-md absolute right-0 -top-3  translate-x-3/4 opacity-0 m-4 mx-auto">
          History
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
