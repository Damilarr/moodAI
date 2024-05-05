import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen text-white h-screen flex justify-center items-center px-4 bg-black">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-5xl md:text-6xl mb-4 text-left">
          The Best journal app.
        </h1>
        <p className="text-xl md:text-2xl text-white/60 mb-4">
          This is the best app for tracking your mood throughout your life, all
          you have to do is be honest.
        </p>
        <div>
          <Link href="/journal">
            <button className="bg-blue-500 px-4 py-2 rounded-lg text-xl ">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
