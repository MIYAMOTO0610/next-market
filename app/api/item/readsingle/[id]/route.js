import { NextResponse } from "next/server";
import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";

export async function GET(request, context) {
    try {
        await connectDB();
        const singleItem = await ItemModel.findById(context.params.id);
        return NextResponse.json({ message: "アイテム取得成功", singleItem: singleItem });
    } catch {
        return NextResponse.json({ message: "アイテム取得失敗" });
    }
}
