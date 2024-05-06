import { NextResponse } from "next/server";
import Order from "@/app/lib/orderModel";
import Cart from "@/app/lib/cartModel";
import dbCon from "@/app/lib/dbCon";
import userAuth from "@/app/utils/userAuth";

export async function POST(req) {
    try {
        const { deliveryAdd, phone, products, totalPrice, totalAmount } = await req.json();

        console.log(deliveryAdd, phone, products, totalPrice, totalAmount)
        
        if (!deliveryAdd || !phone || !products || !totalPrice || !totalAmount) {
            return NextResponse.json({
                error: "Please enter all fields"
            }, { status: 400 });
        }

        const user = userAuth(req);

        await dbCon();

        const order = await Order.create({
            user: user._id,
            deliveryAddress: {
                name: user.name,
                address: deliveryAdd,
            },
            phone, // Add phone to the order
            products,
            totalPrice,
            totalAmount,
        });

        if (order) {
            await Cart.deleteMany({ user: user._id });
        }

        return NextResponse.json({
            success: true,
            invoice: order, // Assuming order contains invoice data
            message: "Order placed successfully"
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: error.message,
        }, { status: 400 });
    }
}

export async function GET(req) {
    try {
        const user = userAuth(req);
        await dbCon();
        const invoices = await Order.find({ user: user._id });
        return NextResponse.json({
            success: true,
            invoices,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: error.message,
        }, { status: 400 });
    }
}
