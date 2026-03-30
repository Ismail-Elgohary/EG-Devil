import { Tpost } from "@/app/types/type";
import data from "../../../api/db.json";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Product({ params }: Props) {
  const { id } = await params;
  const posts: Tpost []= data as Tpost[];
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-4xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
        <div className="relative md:w-1/2 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-10 overflow-hidden" style={{ minHeight: "360px" }}>
          <div className="absolute -top-10 -left-10 w-50 h-50 bg-indigo-100 rounded-full opacity-50" />
          <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-pink-100 rounded-full opacity-40" />
          <img
            className="relative z-10 w-full object-contain drop-shadow-2xl"
            src={post.image}
            alt={post.title}
          />
        </div>
        <div className="md:w-1/2 p-10 flex flex-col justify-center gap-5">
          <span className="inline-block w-fit bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-100">
            {post.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-snug">
            {post.title}
          </h1>
          <div className="w-12 h-1 bg-indigo-500 rounded-full" />
          <p className="text-slate-500 text-base leading-relaxed">
            {post.description}
          </p>
          {post.price && (
            <p className="text-3xl font-black text-indigo-600 mt-2">
              ${post.price}
            </p>
          )}
          <button className="mt-4 w-full md:w-fit bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-200 shadow-lg shadow-indigo-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
