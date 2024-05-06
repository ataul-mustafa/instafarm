import { NextResponse } from "next/server";
import { Cashfree } from 'cashfree-pg'
import crypto from 'crypto'

function generateOrderId() {
    const uniqueId = crypto.randomBytes(16).toString('hex');

    const hash = crypto.createHash('sha256');
    hash.update(uniqueId);

    const orderId = hash.digest('hex');

    return orderId.substr(0, 12);
}

Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_API_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

export async function POST(req) {
    try {
        const { orderData } = await req.json();
        // console.log(orderData)

        const orderId = generateOrderId();

        const request = {
            // "cart_details": orderData.cartData,
            "order_amount": orderData.orderAmount,
            "order_currency": "INR",
            "order_id": orderId,
            "customer_details": {
                "customer_id": orderData.customerPhone + orderId,
                "customer_phone": `+91${orderData.customerPhone}`,
                "customer_name": orderData.customerName,
                "customer_email": orderData.customerEmail
            },
        };

        const { data } = await Cashfree.PGCreateOrder("2023-08-01", request);

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};
