import { NextResponse } from "next/server";
import Product from "@/app/lib/productModel"
import dbCon from "@/app/lib/dbCon"

//3. Filter and Sort products
export async function GET(req) {
    try {

        //database connection
        await dbCon();

        const { searchParams } = new URL(req.url);

        const sortBy = searchParams.get("sortBy");
        let sortCriteria = {};
        if (sortBy) {
            switch (sortBy) {
                case 'priceAscending':
                    sortCriteria = { price: 1 };
                    break;
                case 'priceDescending':
                    sortCriteria = { price: -1 };
                    break;
                case 'nameAscending':
                    sortCriteria = { name: 1 };
                    break;
                case 'nameDescending':
                    sortCriteria = { name: -1 };
                    break;
                default:
                    return NextResponse.status(400).json({ error: 'Invalid sortBy parameter' }, {status: 400});
            }
        }

        let products = await Product.find().sort(sortCriteria)

        if (searchParams.get("name")) {
            products = products.filter(product => ((product.name).split(',')[0]).toLowerCase().startsWith((searchParams.get("name")).toLowerCase()))
        }

        if (searchParams.get("category")) {
            products = products.filter((product) => (product.category == searchParams.get("category")))
        }
        if (searchParams.get("price")) {
            products = products.filter((product) => (product.price >= searchParams.get("price").split('-')[0] && product.price <= searchParams.get("price").split('-')[1]))
        }
        if (searchParams.get("availability")) {
            products = products.filter((product) => (product.availability == searchParams.get("availability")))
        }

        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: error.message }, {status: 400});
    }
};

