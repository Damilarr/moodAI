"use client";

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }: any) => {
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
      if (_value !== entry.content) {
        setIsLoading(true);
        const data = await updateEntry(entry.id, _value);
        setAnalysis(data.analysis);
        setIsLoading(false);
      }
    },
  });
  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="  col-span-2">
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center">
            Saving...
          </div>
        )}
        <textarea
          name=""
          id=""
          className="w-full h-full p-8 outline-0 text-xl full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((data) => (
              <li
                key={data.name}
                className="px-2 py-2 border-b border-t border-black/10 flex items-center justify-between"
              >
                <span className="text-lg font-semibold">{data.name}</span>
                <span>{data.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
