//this by  em
"use client";
import Link from "next/link";

interface IError {
  error: Error;
  reset: () => void;
}
export default function Error({ error, reset }: IError) {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 mt-10">
        <h1 className="text-red-700 text-2xl font-bold">Error</h1>
        <p className="text-lg text-red-700">{error?.message}</p>
		<button className="bg-blue-400 rounded-md hover:bg-blue-500 p-4 text-white" onClick={() => reset()}>Try Again</button>

        <Link
          href={"/"}
          className="bg-blue-400 p-4 rounded-md hover:bg-blue-500 text-white"
        >
          Go to home page
        </Link>
      </div>
    </>
  );
}
