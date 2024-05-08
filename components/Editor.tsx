"use client";

import { deleteEntry, updateEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }: any) => {
  const router = useRouter();
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);
  const { mood, negative, summary, subject, color } = analysis;
  const analysisData = [
    { name: "summary", value: summary },
    { name: "subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "true" : "false" },
  ];
  useAutosave({
    data: value,
    onSave: async (_value) => {
      if (_value !== entry.content && _value !== "") {
        setIsLoading(true);
        const data = await updateEntry(entry.id, _value);
        setAnalysis(data.analysis);
        setIsLoading(false);
      }
    },
  });
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const del = await deleteEntry(entry.id);
      setIsLoading(false);
      router.replace("/journal");
    } catch (error) {
      console.log(error, "could not delete entry");
    }
  };
  return (
    <div className="w-full h-4/5 flex justify-end flex-col-reverse bg-transparent md:grid grid-cols-3">
      <div className=" md:col-span-2 h-1/2 md:h-auto flex-1">
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center">
            Saving...
          </div>
        )}
        <textarea
          name=""
          id=""
          className="w-full h-full outline-0 focus:ring-blue-500 ring-1 focus:border-blue-500 border bg-[#fcfcfc] p-4 md:p-8 text-xl full"
          value={value}
          disabled={isLoading}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
      <div className="border md:col-span-1 h-fit md:h-auto col-span-full bg-white/50 border-black/10">
        <div
          className="px-6 py-4 sm:py-5 md:py-10"
          style={{ backgroundColor: color }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((data) => (
              <li
                key={data.name}
                className="px-2 space-x-3 py-2 border-b border-t border-black/10 flex items-start justify-between"
              >
                <span className="text-lg font-semibold">{data.name}</span>
                <span className="text-right">{data.value}</span>
              </li>
            ))}
            <button
              disabled={isLoading}
              onClick={handleDelete}
              className="shadow-md rounded-t-none p-2 text-white rounded-md flex justify-between space-x-3 mx-auto bg-red-500 items-center"
            >
              Delete Entry
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
