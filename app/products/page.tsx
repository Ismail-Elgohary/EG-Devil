export const runtime = "nodejs";
import Link from "next/link";
import { Tpost } from "../types/type";
export default async function Products() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const posts: Tpost[] = await res.json();

  return (
    <>
<div className="min-h-screen bg-gray-100 p-6">
  <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
    Products
  </h1>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
    {posts.map((post, index) => (
      <div
        key={post.id}
        className="bg-white rounded-xl shadow-sm flex flex-col overflow-hidden group"
        style={{
          animation: `fadeSlideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.08}s both`,
        }}
      >
        <div className="relative  from-slate-100 to-slate-200 flex items-center justify-center p-3 overflow-hidden">
          <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-indigo-100 rounded-full opacity-60 transition-transform duration-500 group-hover:scale-150" />
          <img
            className="relative z-10 w-full h-28 object-contain drop-shadow transition-transform duration-500 group-hover:scale-110"
            src={post.image}
            alt={post.name}
          />
        </div>

        <div className="p-3 flex flex-col flex-1 gap-1.5">
          <span className="w-6 h-0.5 bg-indigo-500 rounded-full" />
          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed flex-1">
            {post.description}
          </p>
          {post.price && (
            <p className="text-indigo-600 font-black text-base">
              ${post.price}
            </p>
          )}
          <Link
            href={`/products/${post.id}`}
            className="mt-1 px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg text-center
              shadow-sm shadow-indigo-200
              hover:bg-indigo-700 hover:-translate-y-0.5
              active:scale-95 transition-all duration-200"
          >
            Details
          </Link>
        </div>
      </div>
    ))}
    <style>{`
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(30px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>
</div>

     </>
  );
}
