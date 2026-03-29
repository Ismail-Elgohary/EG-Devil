"use client";
import { useCart } from "../context/Cartshop";
import { useHeart } from "../context/FavoritesContext";
import { ShoppingCart, Heart} from "lucide-react";

export default function MensPage() {
  const { addToCart } = useCart();
  const { favourites, toggleFavorite } = useHeart();

  const isFavorite = (id: number) => favourites?.some((item: any) => item.id === id);

  const jackets = [
    { id: 101, name: "Adidas Football Anthem Jacket in Navy", price: 71, image: "https://images.asos-media.com/products/adidas-football-arsenal-zne-anthem-jacket-in-navy/208942239-1-nightnavy?$n_640w$&wid=513&fit=constrain" },
    { id: 102, name: "Jack & Jones Hooded Puffer Jacket in Sand", price: 26, image: "https://images.asos-media.com/products/jack-jones-hooded-puffer-jacket-in-sand/208949256-1-elmwood?$n_640w$&wid=513&fit=constrain" },
    { id: 103, name: "Adidas Originals arch track top in navy and off white", price: 103, image: "https://images.asos-media.com/products/adidas-originals-arch-track-top-in-navy-and-off-white/209110242-2?$n_480w$&wid=476&fit=constrain" },
    { id: 104, name: "JJ Rebel bomber jacket in black", price: 43, image: "https://images.asos-media.com/products/jj-rebel-bomber-jacket-in-black/210216690-2?$n_480w$&wid=476&fit=constrain" },
  ];

  const tshirts = [
    { id: 105, name: "Tommy Jeans Flag Logo T-Shirt in Red", price: 32, image: "https://images.asos-media.com/products/tommy-jeans-flag-logo-t-shirt-with-mountain-peak-back-print-in-red/209491918-2?$n_480w$&wid=476&fit=constrain" },
    { id: 106, name: "COLLUSION Skater fit t-shirt in yellow with blue back print", price: 18, image: "https://images.asos-media.com/products/collusion-skater-fit-t-shirt-in-yellow-with-blue-back-print/208614955-2?$n_480w$&wid=476&fit=constrain" },
    { id: 107, name: "Reclaimed Vintage x Stranger Things oversized t-shirt in black", price: 14, image: "https://images.asos-media.com/products/reclaimed-vintage-x-stranger-things-unisex-oversized-t-shirt-with-character-back-print-in-black/209571857-2?$n_480w$&wid=476&fit=constrain" },
    { id: 108, name: "ASOS DESIGN Essentials oversized t-shirt in black", price: 9, image: "https://images.asos-media.com/products/asos-design-essentials-oversized-t-shirt-in-black/209198203-2?$n_480w$&wid=476&fit=constrain" },
  ];

  const ProductGrid = ({ products }: { products: typeof jackets }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="group bg-white overflow-hidden hover:shadow-lg transition-all duration-300">

          <div className="overflow-hidden bg-gray-100 aspect-[3/4] relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            <button
              onClick={() => toggleFavorite(product)}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
                isFavorite(product.id)
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-400 hover:text-red-500"
              }`}
            >
              <Heart size={15} className={isFavorite(product.id) ? "fill-current" : ""} />
            </button>
          </div>

          <div className="pt-3 px-1 pb-3">
            <h3 className="text-sm text-gray-900 leading-snug line-clamp-2">{product.name}</h3>
            <div className="flex items-center gap-3 mt-1 mb-3">
              <span className="text-sm text-gray-400 line-through">${(product.price * 2).toFixed(2)}</span>
              <span className="text-sm font-bold text-red-500">${product.price.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-2">
                <button
                onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                className="w-9 h-9 flex items-center justify-center bg-gray-900 hover:bg-indigo-600 text-white rounded-lg transition-colors"
              >
                <ShoppingCart size={15} />
              </button>
            </div>
          </div>

        </div>
      ))}
    </div>
  );

  return (
    <div className="px-10 py-10 flex flex-col gap-12">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Jackets</h2>
        <ProductGrid products={jackets} />
      </section>
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">T-Shirts</h2>
        <ProductGrid products={tshirts} />
      </section>
    </div>
  );
}
