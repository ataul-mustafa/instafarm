import { NextResponse } from "next/server";
import { Cashfree } from 'cashfree-pg'

export async function POST(req) {
    try {

        Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
        Cashfree.XClientSecret = process.env.CASHFREE_API_SECRET;
        Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

        // Extract orderId from the request body
        const { orderId } = await req.json();

        // Check if orderId exists
        if (!orderId) {
            return NextResponse.json({ error: "orderId is missing from the request" }, { status: 400 });
        }

        // Assuming orderId is a string, pass it to PGCreateOrder
        const { data } = await Cashfree.PGCreateOrder("2023-08-01", orderId);

        console.log(data)

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        // console.log(error)
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};
