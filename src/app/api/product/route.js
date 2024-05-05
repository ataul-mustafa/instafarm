import { NextResponse } from "next/server";
import Product from "@/app/lib/productModel"
import dbCon from "@/app/lib/dbCon"
import fs from'fs'


// 1. Get all products
// export async function GET(req) {
//     try {
        //database connection
//         await dbCon();

//         const products = await Product.find();
//         return NextResponse.json(products);
//     } catch (error) {
//         return NextResponse.json({ error: error.message });
//     }
// };

export async function GET(req) {
    try {
        const data = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))

        console.log(data)
        await Product.create(data)
        console.log('data successfully imported')
        // to exit the process
        process.exit()
    } catch (error) {
        console.log('error', error)
    }
};



// 2. Get one product by _id
// export async function GET(req) {
//     try {
//         if (!req.params.id) {
//             return NextResponse.json({ error: 'Product Id not found' });
//         }

//         //database connection
//         await dbCon();

//         const product = await Product.findById(req.params.id);
//         if (!product) {
//             return NextResponse.json({ error: 'Product not found' });
//         }
//         res.json(product);
//     } catch (error) {
//         return NextResponse.json({ error: error.message });
//     }
// };

//3. Filter and Sort products
export async function POST(req) {
    try {

        //database connection
        await dbCon();

        const { searchParams } = new URL(request.url);
        const name = searchParams.get("name");

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
                    return NextResponse.status(400).json({ error: 'Invalid sortBy parameter' });
            }
        }

        let products = await Product.find().sort(sortCriteria)

        if (searchParams.get("name")) {
            products = products.filter(product => ((product.name).split(',')[0]).toLowerCase().startsWith((searchParams.get("name")).toLowerCase()))
        }

        if (searchParams.get("headPhoneType")) {
            products = products.filter((product) => (product.headPhoneType == searchParams.get("headPhoneType")))
        }
        if (searchParams.get("brand")) {
            products = products.filter((product) => (product.brand == searchParams.get("brand")))
        }
        if (searchParams.get("color")) {
            products = products.filter((product) => (product.color == searchParams.get("color")))
        }
        if (searchParams.get("price")) {
            products = products.filter((product) => (product.price >= searchParams.get("price").split('-')[0] && product.price <= searchParams.get("price").split('-')[1]))
        }

        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
};
