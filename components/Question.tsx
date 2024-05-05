"use client";

import { askQuestion } from "@/utils/api";
import { useState } from "react";
import { set } from "zod";

const Question = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const answer = await askQuestion(value);
    setResponse(answer);
    setValue("");
    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          className="focus:ring-blue-500 outline-0 ring-1 focus:border-blue-500 border px-4 py-2 text-lg rounded-lg"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Ask about your mood/entries"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded-lg text-lg"
        >
          Ask
        </button>
      </form>
      {loading && <p>Searching...</p>}
      {response && <p className="py-2 text-black">{response}</p>}
    </div>
  );
};

export default Question;
