import { NextResponse } from "next/server";
import Product from "@/app/lib/productModel"
import dbCon from "@/app/lib/dbCon"


// 1. Create a product
export async function POST(req){
    try {

        const {name, images, price, availability, category} = await req.json();

        if(!name || !images || !price || !availability || !category){
            return NextResponse.json({error: "Enter all fields"})
        }

        await dbCon();

        await Product.create({
            name,
            images,
            price,
            availability,
            category
        })

        return NextResponse.json({
            success: true,
            message: "Product created successfully"
        })
        
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}