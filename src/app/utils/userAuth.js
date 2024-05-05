const { headers } = require("next/headers");
const jwt = require('jsonwebtoken')


const userAuth = (req) =>{
    const token = headers().get('authorization')
    if (!token) {
        return NextResponse.json({ error: "Please login to access this page" }, { status: 400 });
    }

    let data = undefined;

    try {
        const user = jwt.decode(token);
        // console.log(user)
        // req.headers.user = user;
        data = user;
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return data
}

module.exports = userAuth;