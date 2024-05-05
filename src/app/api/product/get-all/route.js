import { NextResponse } from "next/server";
import Product from "@/app/lib/productModel"
import dbCon from "@/app/lib/dbCon"


// 1. Get all products
export async function GET(req) {
    try {
        // database connection
        await dbCon();

        const products = await Product.find();
        return NextResponse.json(products, {status: 200});
    } catch (error) {
        return NextResponse.json({ error: error.message }, {status: 400});
    }
};
