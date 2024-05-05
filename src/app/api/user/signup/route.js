import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import User from "@/app/lib/userModel"
import dbCon from "@/app/lib/dbCon"
import mongoose from "mongoose";

export async function POST(req){
    try {
        const { name, email, password } = await req.json();

        //checking if any field is missing
        if (!name || !email || !password ) {
            return NextResponse.json({ error: "Please enter all fields" }, {status: 404});
        }

        //database connection
        await dbCon();

        //checking if user already registered
        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({ error: "Email or Phone is already registered" }, {status: 401});
        }

        //generating the password hash or encrypting the password
        const hashedPassword = await bcrypt.hash(password, 12);

        //if no error then saving into db or creating new user
        const newUser = await User.create({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password: hashedPassword,
        })
        
        //generating jwt token for a user
        const jwtToken = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET_KEY);

        return NextResponse.json({
            success: true,
            jwtToken,
            message: "User signed up successfully",
        }, {status: 201})
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}