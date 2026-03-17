import { data } from "@/app/types/data"
import { AddProducts, Tpost } from "@/app/types/type";
import { NextRequest, NextResponse } from "next/server"

export const GET = (req: NextRequest) => {
	console.log(req)
	return NextResponse.json(data, {
	   status: 200,
	})
};

export const POST = async (req: NextRequest) => {
    const body = (await req.json()) as AddProducts;

    const newProduct: Tpost = {
        id: `prod${data.length + 1}`,
        name: body.name,
        slug: body.name.toLowerCase().replace(/ /g, "-"),
        description: body.description,
        price: body.price,
        discount_price: body.discount_price ?? null,
        category: body.category,
        subcategory: body.subcategory ?? "",
        brand: body.brand ?? "",
        sku: body.sku ?? "",
        stock: body.stock ?? 0,
        rating: 0,
        reviews_count: 0,
        images: body.images ?? [],
        colors: body.colors ?? [],
        sizes: body.sizes ?? [],
        tags: body.tags ?? [],
        is_featured: false,
        is_new: true,
        created_at: new Date().toISOString()
    };

    data.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
}
