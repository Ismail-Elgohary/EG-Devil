import { data } from "@/app/types/data"
import { AddProducts, Tpost } from "@/app/types/type";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
export const GET = (req: NextRequest) => {
	console.log(req)
	return NextResponse.json(data, {
	   status: 200,
	})
};

export const POST = async (req: NextRequest) => {
    const body = (await req.json()) as AddProducts;
	console.log(body)
	const createZod = z.object({
		name: z.string(),
		description: z.string(),
		price: z.number(),
		category: z.string(),
	})
	const  vlaidation = createZod.safeParse(body);

	if (!vlaidation.success) {
	return NextResponse.json (
    {message: vlaidation.error.issues[0].message},
    { status: 400 }
		);
		}

    const newProduct: Tpost = {
        id: `prod${data.length + 1}`,
        name: body.name,
        description: body.description,
        price: body.price,
        category: body.category,
        images: body.images ?? [],
    };

    data.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
}
