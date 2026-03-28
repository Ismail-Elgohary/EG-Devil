export const runtime = "nodejs";
import { Tpost } from "../../types/type";
import ProductCard from "./ProductCard";

export default async function Products() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
		cache: "no-store",
	});
	if (!res.ok) {
		throw new Error("Failed to fetch products");
	}
	const posts: Tpost[] = await res.json();

	return (
		<div className="bg-gray-50">
			<div className="container mx-auto  min-h-screen py-10 px-20">
				<h1 className="text-3xl font-bold mb-6">
					<span className="text-blue-600 border-b-3">Products</span>
				</h1>
				<div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
					{posts.map((post, index) => (
						<ProductCard key={post.id} post={post} index={index} />
					))}
				</div>

				<style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
			</div>
		</div>
	);
}
