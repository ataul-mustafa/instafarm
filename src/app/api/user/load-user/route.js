import { NextResponse } from "next/server";
import userAuth from "@/app/utils/userAuth";

export async function GET(req){
    try {
        const user = userAuth(req)
        return NextResponse.json({
            success: true,
            user
        }, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}