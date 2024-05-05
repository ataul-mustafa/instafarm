import { NextResponse } from "next/server";
import Product from "@/app/lib/productModel"
import dbCon from "@/app/lib/dbCon"


// Get one product by _id
export async function GET(req, cont) {
    try {
        const id = cont.params.id;
        if (!id) {
            return NextResponse.json({ error: 'Product Id not found' },{status: 400});
        }

        //database connection
        await dbCon();

        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, {status: 404});
        }
        return NextResponse.json(product, {status: 200});
    } catch (error) {
        return NextResponse.json({ error: error.message }, {status: 401});
    }
};
