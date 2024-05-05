import { NextResponse } from "next/server";
import dbCon from "@/app/lib/dbCon"
import Cart from '@/app/lib/cartModel'
import userAuth from "@/app/utils/userAuth";

export async function POST(req) {
    try {

        const user = userAuth(req)

         // database connection
         await dbCon();

        const {product} = await req.json();
        const isAleadyExists = await Cart.findOne({productId: product._id, user: user._id});
        console.log(isAleadyExists)
        if(isAleadyExists){
            if(isAleadyExists.quantity >= 10){
                return NextResponse.json({
                    error: "Product quantity can't excedd more than 8"
                }, {status: 404})
            }
            
            isAleadyExists.quantity += 1;
            await Cart.findOneAndUpdate({productId: product._id, user: user._id}, isAleadyExists);
            const cartProducts = await Cart.find({user: user._id})
            return NextResponse.json({
                success: true,
                products: cartProducts,
                message: "Product added successfully"
            }, {status: 200})
        }

        product.quantity = 1;
        product.totalPrice = product.price;

        const prod = await Cart.create({
            productId: product._id,
            user: user._id,
            product,
            quantity: 1,
            totalPrice: product.price,
        })

        let cartProducts = [];

        if (prod){
            cartProducts = await Cart.find({user: user._id})
        }

        return NextResponse.json({
            success: true,
            products: cartProducts,
            message: "Product added successfully"
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, {status: 400})
    }

};