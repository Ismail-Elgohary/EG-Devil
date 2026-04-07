import { ArrowRight, ShieldCheck, Truck, Zap } from 'lucide-react';
import Link from "next/link";
import BestProducts from './Home/Bestproducts';
import MensPage from './Home/mens';
export default async function HomePage() {

	return (
		<div className="mt-20 container mx-auto px-4 py-4 min-h-screen bg-white" dir="rtl">

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
			<BestProducts />
			<MensPage />
			<section className="bg-blue-50 py-16 px-6 text-center">
				<h2 className="text-3xl font-bold mb-4">انضم إلى مجتمعنا</h2>
				<p className="text-gray-600 mb-8">اشترك للحصول على آخر العروض والخصومات.</p>
				<div className="max-w-md mx-auto flex gap-2">
					<input type="email" placeholder="بريدك الإلكتروني" className="flex-1 px-4 py-3 rounded-lg outline-none" />
					<button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">اشترك</button>
				</div>
			</section>
		</div >
	);
};
