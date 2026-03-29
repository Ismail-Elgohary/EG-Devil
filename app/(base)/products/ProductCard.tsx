"use client";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../context/Cartshop";
import { useHeart } from "../context/FavoritesContext";
import { Tpost } from "../../types/type";

export default function ProductCard({
	post,
	index,
}: {
	post: Tpost;
	index: number;
}) {
	const { addToCart, removeFromCart, isInCart } = useCart();
	const { toggleFavorite, isFavorite } = useHeart();

	const handleAddToCart = () => {
		if (isInCart(post.id)) {
			removeFromCart(post.id);
		} else {
			addToCart({
				id: post.id,
				name: post.name,
				price: post.price,
				image: post.image,
			});
		}
	};

	return (
		<div
			className="bg-white rounded-xl shadow-sm flex flex-col overflow-hidden group"
			style={{
				animation: `fadeSlideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.08}s both`,
			}}
		>
			<div className="relative flex items-center justify-center p-3 overflow-hidden shadow-sm">
				<div className="absolute -bottom-4 -right-4 w-14 h-14 bg-indigo-100 rounded-full opacity-60 transition-transform duration-500 group-hover:scale-150" />
				<img
					className="relative z-10 w-full h-50 object-contain drop-shadow transition-transform duration-500 group-hover:scale-110"
					src={post.image}
					alt={post.name}
				/>
				<button
					onClick={() => toggleFavorite(post)}
					className={`absolute top-2 right-2 z-20 p-1.5 rounded-full transition-all duration-200 ${
						isFavorite(post.id)
							? "bg-rose-500 text-white"
							: "bg-white text-gray-400 hover:bg-rose-500 hover:text-white"
					}`}
				>
					<Heart
						size={14}
						className={isFavorite(post.id) ? "fill-current" : ""}
					/>
				</button>
			</div>

			<div className="p-3 flex flex-col flex-1 gap-1.5">
				<span className="w-6 h-0.5 bg-indigo-500 rounded-full" />
				{post.price && (
					<p className="text-indigo-600 font-bold text-lg text-start">
						${post.price}
					</p>
				)}
				<p className="text-slate-700/80 text-sm line-clamp-2 tracking-wide leading-relaxed flex-1">
					{post.description}
				</p>
				<div className="flex gap-3 mt-1">
					<Link
						href={`/products/${post.id}`}
						className="flex-1 p-2.5 bg-indigo-600 text-white text-md font-bold rounded-lg text-center hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
					>
						Details
					</Link>
					<button
						onClick={handleAddToCart}
						className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 ${
							isInCart(post.id)
								? "bg-teal-400 text-white"
								: "bg-gray-100 text-gray-600 hover:bg-teal-400 hover:text-white"
						}`}
					>
						<ShoppingCart size={20} />
					</button>
				</div>
			</div>
		</div>
	);
}
