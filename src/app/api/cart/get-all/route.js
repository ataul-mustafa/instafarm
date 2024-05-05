import { NextResponse } from "next/server";
import dbCon from "@/app/lib/dbCon"
import Cart from '@/app/lib/cartModel'
import userAuth from "@/app/utils/userAuth";


export async function GET(req) {
    try {
        // const {user} = await req.json()
        const user = userAuth(req);

        await dbCon();
        const products = await Cart.find({user: user._id});

        return NextResponse.json({ 
            success: true,
            products
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, {status: 400})
    }
};