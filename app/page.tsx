"use client";
import { useCart } from "./context/Cartshop";
import { ShoppingCart, Heart, ArrowRight, Truck, ShieldCheck, Zap, Star } from 'lucide-react';
import { useHeart } from "./context/FavoritesContext";
import Link from "next/link";

const HomePage = () => {

  const { addToCart } = useCart();
  const { favourites, toggleFavorite } = useHeart();

  const products = [
    { id: 1, name: "ساعة ذكية Ultra", price: 299, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500", category: "إلكترونيات" },
    { id: 2, name: "سماعات لاسلكية Pro", price: 150, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", category: "إكسسوارات" },
    { id: 3, name: "حقيبة ظهر عصرية", price: 85, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", category: "موضة" },
    { id: 4, name: "نظارات شمسية كلاسيك", price: 120, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500", category: "موضة" },
  ];

  const isFavorite = (id: number) => favourites?.some((item: any) => item.id === id);

  return (
    <div className="min-h-screen bg-white" dir="rtl">

      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
          <span className="bg-blue-600 text-sm font-bold px-4 py-1 rounded-full mb-4 animate-bounce">
            خصومات تصل إلى 50%
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="text-blue-500"> Find  the best  Products</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            Our store offers the latest products with quality and affordability
          </p>
          <div className="flex gap-4">
            <Link href="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition flex items-center gap-2">
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 border-b">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
            <Truck className="text-blue-600 w-8 h-8" />
            <div>
              <h4 className="font-bold">شحن سريع</h4>
              <p className="text-sm text-gray-600">توصيل خلال 48 ساعة</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
            <ShieldCheck className="text-green-600 w-8 h-8" />
            <div>
              <h4 className="font-bold">ضمان الجودة</h4>
              <p className="text-sm text-gray-600">منتجات أصلية 100%</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
            <Zap className="text-orange-600 w-8 h-8" />
            <div>
              <h4 className="font-bold">دفع آمن</h4>
              <p className="text-sm text-gray-600">خيارات دفع متعددة</p>
            </div>
          </div>
        </div>
      </section>

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

      <section className="bg-blue-50 py-16 px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">انضم إلى مجتمعنا</h2>
          <p className="text-gray-600 mb-8">اشترك للحصول على آخر العروض والخصومات.</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input type="email" placeholder="بريدك الإلكتروني" className="flex-1 px-4 py-3 rounded-lg outline-none" />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">اشترك</button>
          </div>
      </section>
    </div>
  );
};

export default HomePage;
