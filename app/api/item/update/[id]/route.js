import { NextResponse} from "next/server";
import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";

export async function PUT(request, context) {
    const reqBody = await request.json();

    try {
        // アイテム更新のロジックをここに実装する
        await connectDB();
        const singleItem = await ItemModel.findById(context.params.id);
        if (singleItem.email !== reqBody.email) {
            return NextResponse.json({ message: "アイテム更新失敗" });
        }
        await ItemModel.updateOne({ _id: context.params.id }, reqBody)
        return NextResponse.json({ message: "アイテム更新成功" });
    } catch(error) {
        console.log(error);
        return NextResponse.json({ message: "アイテム更新失敗" });
    }
}
