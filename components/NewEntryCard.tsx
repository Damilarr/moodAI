"use client";

import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";

const NewEntryCard = () => {
  const router = useRouter();
  const handleClick = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
  };
  return (
    <button
      onClick={handleClick}
      className="group bg-gray-900/30 py-10 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover"
    >
      <div className="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      <span className="text-white/50 group-hover:text-white group-hover:smooth-hover text-center">
        New Entry
      </span>
    </button>
  );
};

export default NewEntryCard;
