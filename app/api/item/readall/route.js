import { NextResponse } from "next/server";
import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";

export async function GET() {
    try {
        await connectDB();
        const allItems = await ItemModel.find();
        return NextResponse.json({ message: "アイテム一覧取得成功", allItems: allItems });
    } catch {
        return NextResponse.json({ message: "アイテム一覧取得失敗" });
    }
}

export const revalidate = 0;

