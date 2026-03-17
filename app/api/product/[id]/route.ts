import { data } from "@/app/types/data";
import { updateProducts } from "@/app/types/type";
import { NextRequest, NextResponse } from "next/server";

interface SingleProduct {
    params: Promise<{ id: string }>;
}

//sigle product
export const GET = async (req: NextRequest, { params }: SingleProduct) => {
    const { id } = await params

    const product = data.find((p) => p.id === parseInt(id))

    if (!product) {
        return NextResponse.json(
            { message: "Product not found" },
            { status: 404 }
        )
    }
    return NextResponse.json(product, { status: 200 })
}

// put product
export const PUT = async (req: NextRequest, { params }: SingleProduct) => {
    const { id } = await params

    const product = data.find((p) => p.id === parseInt(id))
      const body = await req.json() as updateProducts;

    if (!product) {
        return NextResponse.json(
            { message: "Product not found" },
            { status: 404 }
        )
    }
    return NextResponse.json(
	 { message: "Product updated" },
         { status: 200 }
	)
}

// delete product
export const DELETE = async (req: NextRequest, { params }: SingleProduct) => {
    const { id } = await params

    const product = data.find((p) => p.id === parseInt(id))
    if (!product) {
        return NextResponse.json(
            { message: "Product not found" },
            { status: 404 }
        )
    }
    return NextResponse.json(
	 { message: "Product deleted" },
         { status: 200 }
	)
}
