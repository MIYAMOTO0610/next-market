import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    //const token = await request.headers.get("Authorization")?.split(" ")[1];
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTcyNzc3Nzk2OH0.0Uu0Rn15Bas1QPG0-vaogrDZx6hduewyMnsq5uKqmMk";
    if (!token) return NextResponse.json({ message: "トークンがありません" });

    try {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const decodeJWT = await jwtVerify(token, secretKey);
    } catch(error) {
        console.log(error);
        return NextResponse.json({ message: "トークンが無効です" });
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/item/create",
        "/api/item/update/:path*",
        "/api/item/delete/:path*",
    ],
}
