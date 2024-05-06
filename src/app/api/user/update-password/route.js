import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import User from "@/app/lib/userModel"
import dbCon from "@/app/lib/dbCon"
import bcrypt from 'bcrypt'
import userAuth from "@/app/utils/userAuth";

export async function POST(req){
    try {
        const { oldPassword, newPassword } = await req.json();

        //checking if any field is missing
        if (!oldPassword || !newPassword ) {
            return NextResponse.json({ error: "Please enter all fields" }, {status: 404});
        }

        if (oldPassword == newPassword ) {
            return NextResponse.json({ error: "Both passowrds should be different" }, {status: 404});
        }

        const user = userAuth(req)

        //database connection
        await dbCon();

        //checking if user already registered
        const finduser = await User.findById(user._id);
        if (!finduser) {
            return NextResponse.json({ error: "user is not registered" }, {status: 404});
        }

        const match = bcrypt.compare(oldPassword, finduser.password);

        if (!match) {
            return NextResponse.json({ error: "Old password is wrong" }, {status: 404});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);


        const newUser = await User.findByIdAndUpdate(user._id, {
            password: hashedPassword,
        })

        const jwtToken = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET_KEY);

        return NextResponse.json({
            success: true,
            jwtToken,
            user: newUser,
            message: "Password updated successfully",
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}