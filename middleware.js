// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken'
// import { headers } from 'next/headers';

// export function middleware(req) {
    
//     const token = headers().get('authorization')
    
//     if (!token) {
//         return NextResponse.json({ error: "Please login to access this page" }, { status: 400 });
//     }

//     try {
//         const user = jwt.decode(token);
//         // console.log(user)
//         req.headers.user = user;
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({ error: error.message }, { status: 400 });
//     }
// }


// export const config = {
//     // matcher: '/about/:path*',
//     matcher: ['/api/cart/:path*', ]
//   };
  