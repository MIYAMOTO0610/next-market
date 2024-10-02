import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";

export async function POST(request) {
    const reqBody = await request.json();

    try {
        await connectDB();
        const user = await UserModel.findOne({ email: reqBody.email });

        // ユーザーが見つからないとき
        if (!user) return NextResponse.json({ message: "ユーザーが見つかりません" });
        // パスワードが間違っているとき
        if (reqBody.password !== user.password) return NextResponse.json({ message: "パスワードが間違っています" });

        const secretKey = new TextEncoder().encode("next-market-app-book");
        const payload = { email: reqBody.email};
        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("1d")
            .sign(secretKey);

        return NextResponse.json({ message: "ログイン成功", token: token });
    } catch(error) {
        console.log(error);
        return NextResponse.json({ message: "ユーザー登録失敗" });
    }


}
