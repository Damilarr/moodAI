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
    // <div className="h-screen w-screen relative">
    //   <div className="absolute top-0 left-0 h-full border border-black/10 w-[200px]">
    //     <div>Mood</div>
    //     <ul>
    //       {links.map((link) => (
    //         <li key={link.href} className="px-2 py-6 text-xl">
    //           <Link href={link.href}>{link.label}</Link>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    //   <div className="ml-[200px] h-full">
    //     <header className="relative h-[60px] border-b border-black/10 ">
    //       <div className="h-full w-full px-6 flex items-center justify-end">
    //         <UserButton />
    //       </div>
    //     </header>
    //     <div className="h-[calc(100vh-60px)]">{children}</div>
    //   </div>
    // </div>
    <div className="h-fit flex items-center justify-center w-screen md:overflow-hidden">
      <div className="bg-[#244547] flex-1 flex flex-col  lg:space-y-0 lg:flex-row lg:space-x-10 sm:p-6 sm:my-2  h-full">
        {/* <!-- Navigation --> */}
        <div className="bg-gray-900 px-2 lg:px-4 py-2 lg:py-10 sm:rounded-xl flex lg:flex-col justify-between">
          <Navbar />
          <div className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        {/* <!-- Content --> */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
