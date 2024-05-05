import { NextResponse } from "next/server";
import dbCon from "@/app/lib/dbCon"
import Cart from '@/app/lib/cartModel'
import userAuth from "@/app/utils/userAuth";


export async function POST(req) {
    try {
        const user = userAuth(req)
        const {id, quantity} = await req.json();
        if(!id){
            return NextResponse.json({
                error: "give a valid id"
            }, {status: 401})
        }

        await dbCon();
        
        const product = await Cart.findOne({productId: id, user: user._id});
        product.quantity = quantity;
        product.totalPrice = quantity * (product.product.price);

        await Cart.findOneAndUpdate({productId: id, user: user._id}, product);
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