import Navbar from "@/components/Navbar";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/history", label: "History" },
];

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen flex items-center justify-center w-screen md:overflow-hidden">
      <div className="bg-transparent flex-1 flex flex-col lg:space-y-0 lg:flex-row lg:space-x-10 sm:p-6 sm:my-2  h-full">
        {/* <!-- Navigation --> */}
        <div className="bg-gradient-to-l sm:bg-gradient-to-r from-cyan-500 to-blue-500 px-2 lg:px-4 py-2 lg:py-10 sm:rounded-xl flex lg:flex-col justify-between">
          <Navbar />
          <div className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        {/* <!-- Content --> */}
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
