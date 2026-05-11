import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
 const products = [
  {
   "id": "1",
   "title": "Men's T-Shirt",
   "price": 100.99,
   "description": "Under Armour Men's Tech 2.0 Short-Sleeve T-Shirt",
   "category": "t-shirt",
   "image": "https://m.media-amazon.com/images/I/81cX5SrwD8L._AC_UL480_QL65_.jpg",
   "rating": { "rate": 1.9, "count": 100 }
  },
  {
   "id": "2",
   "title": "Men's Hoodie",
   "price": 2100,
   "description": "Nike Boy's NSW Pull Over Hoodie Club",
   "category": "Hodies",
   "image": "https://m.media-amazon.com/images/I/71zdwdDgt-L._AC_UL480_QL65_.jpg",
   "rating": { "rate": 2.9, "count": 470 }
  },
  {
   "id": "3",
   "title": "Men's Hoodie",
   "price": 1700,
   "description": "SOLY HUX Boy's Zip Up Hoodies Sweatshirt Y2k Letter Graphic Long Sleeve Streetwear Jacket",
   "category": "Hody",
   "image": "https://m.media-amazon.com/images/I/61291tTiTpL._AC_SY500_.jpg",
   "rating": { "rate": 4.8, "count": 319 }
  },
  {
   "id": "4",
   "title": "Men's Hoodie",
   "price": 1317,
   "description": "wangstar Graphic Hoodies for Boys Sweatshirts Baseball Gifts for Teen Boys Fashion Hoodies Size 14-16 Cool Football Stuff",
   "category": "hody",
   "image": "https://m.media-amazon.com/images/I/61qRavw1nDL._AC_SY500_.jpg",
   "rating": { "rate": 4.8, "count": 400 }
  },
  {
   "id": "5",
   "title": "Men's Hoodie",
   "price": 1299,
   "description": "wangstar Graphic Hoodies for Boys Sweatshirts Baseball Gifts for Teen Boys Fashion Hoodies Size 14-16 Cool Football Stuff",
   "category": "hody",
   "image": "https://m.media-amazon.com/images/I/61zDhh8th3L._AC_SY500_.jpg",
   "rating": { "rate": 2.9, "count": 250 }
  },
  {
   "id": "6",
   "title": "Men's Jacket",
   "price": 1700,
   "description": "TACVASEN Men's Bomber Jacket Lightweight Casual Spring Fall Windbreaker Zip Up Coat with Pocket",
   "category": "jacket",
   "image": "https://m.media-amazon.com/images/I/71rNJdgvB1L._AC_SX569_.jpg",
   "rating": { "rate": 2.2, "count": 140 }
  },
 ];
 return (
  <div className="min-h-screen bg-[#0F172A] text-white px-4 py-8 md:px-8">
   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
    <div>
     <h1 className="text-4xl font-bold tracking-tight">
      Our Products
     </h1>

     <p className="text-slate-400 mt-2 text-sm md:text-base">
      Discover the latest fashion and trending products.
     </p>
    </div>
   </div>

   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {products.map((product) => (
     <div
      key={product.id}
      className="group bg-[#1E293B] rounded-3xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 shadow-lg"
     >
      <div className="relative h-[320px] overflow-hidden">
       <Image
        src={product.image}
        alt={product.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
       />
      </div>

      <div className="p-5">
       <div className="flex items-center justify-between mb-3">
        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">
         {product.category}
        </span>
       </div>

       <h2 className="text-xl font-semibold mb-2 line-clamp-1">
        {product.title}
       </h2>

       <div className="flex items-center justify-between mt-5">
        <p className="text-2xl font-bold text-indigo-400">
         ${product.price}
        </p>

        <Link
         href={`/products/${product.id}`}
         className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-sm font-medium transition"
        >
         View
        </Link>
       </div>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
}
