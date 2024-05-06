import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import User from "@/app/lib/userModel"
import dbCon from "@/app/lib/dbCon"
import userAuth from "@/app/utils/userAuth";

export async function POST(req){
    try {
        const { name, email } = await req.json();

        //checking if any field is missing
        if (!name || !email ) {
            return NextResponse.json({ error: "Please enter all fields" }, {status: 404});
        }

        const user = userAuth(req)

        //database connection
        await dbCon();

        //checking if user already registered
        const finduser = await User.findById(user._id);
        if (!finduser) {
            return NextResponse.json({ error: "user is not registered" }, {status: 404});
        }


        const newUser = await User.findByIdAndUpdate(user._id, {
            name,
            email
        })

        const jwtToken = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET_KEY);

        return NextResponse.json({
            success: true,
            jwtToken,
            user: newUser,
            message: "Profile updated successfully",
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}