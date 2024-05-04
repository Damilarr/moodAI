const EntryCard = ({ entry }: any) => {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <div className="relative divide-y  divide-gray-200 group bg-white py-5 sm:py-10 px-4 flex flex-col space-y-2 cursor-pointer rounded-lg hover:bg-white/95 hover:smooth-hover">
      <h4 className="text-black text-2xl font-bold capitalize text-left">
        {entry.analysis?.subject || "Subject"}
      </h4>
      <div className="flex w-full text-lg py-2 items-center justify-between">
        <span>Mood</span>
        <span className="capitalize">{entry.analysis?.mood}</span>
      </div>
      <div className="flex w-full text-lg py-2 items-center justify-between">
        <span>Created On</span>
        <span>{date}</span>
      </div>
      <div className="py-2"></div>
      <p className="absolute right-4 top-2 inline-flex items-center text-xs">
        <span
          style={{ backgroundColor: entry.analysis?.color }}
          className={`ml-2 w-3 h-3 block rounded-full shadow-md shadow-black group-hover:animate-pulse`}
        ></span>
      </p>
    </div>
  );
};

export default EntryCard;
