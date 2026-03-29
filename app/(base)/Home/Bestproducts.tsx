 "use client";
import { useCart } from "../context/Cartshop";
import { ShoppingCart, Heart,  Star } from 'lucide-react';
import { useHeart } from "../context/FavoritesContext";
export default function BestProducts() {

  const { addToCart } = useCart();
  const { favourites, toggleFavorite } = useHeart();

  const products = [
    { id: 1, name: "ساعة ذكية Ultra", price: 299, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500", category: "إلكترونيات" },
    { id: 2, name: "سماعات لاسلكية Pro", price: 150, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", category: "إكسسوارات" },
    { id: 3, name: "حقيبة ظهر عصرية", price: 85, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", category: "موضة" },
    { id: 4, name: "نظارات شمسية كلاسيك", price: 120, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500", category: "موضة" },
  ];

  const isFavorite = (id: number) => favourites?.some((item: any) => item.id === id);


  return(
<>
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Best Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-square overflow-hidden bg-gray-100 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <button
                  onClick={() => toggleFavorite(product)}
                  className={`absolute top-4 left-4 p-2 rounded-full shadow-md transition ${
                    isFavorite(product.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="p-6">
                <span className="text-xs text-blue-600 font-bold uppercase">{product.category}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">{product.name}</h3>

                <div className="flex items-center gap-1 mt-2 mb-4 text-orange-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-gray-400 text-xs mr-2">(4.8)</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-gray-900">${product.price}</span>

                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gray-900 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
</>
);
 }


