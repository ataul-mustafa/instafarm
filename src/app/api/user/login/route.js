import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import User from "@/app/lib/userModel"
import dbCon from "@/app/lib/dbCon"

export async function POST(req){
    try {
        const { email, password } = await req.json();

        //checking if any field is missing
        if ( !email || !password ) {
            return NextResponse.json({ error: "Please enter all fields" }, {status: 404});
        }

        //database connection
        await dbCon();

        //checking if user already registered
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({ error: "user is not registered" }, {status: 404});
        }

        //compare the password
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            return NextResponse.json({error: "Invalid password"},{status: 400});
        }
        
        //generating jwt token for a user
        const jwtToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY);

        return NextResponse.json({
            success: true,
            jwtToken,
            message: "User signed in successfully",
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}