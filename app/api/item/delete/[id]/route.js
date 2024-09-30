import { NextResponse } from "next/server";
import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";

export async function DELETE(request, context) {
    const reqBody = await request.json();

    try {
        await connectDB();
        const singleItem = await ItemModel.findById(context.params.id);
        if (singleItem.email !== reqBody.email) {
            return NextResponse.json({ message: "アイテム削除失敗" });
        }
        await ItemModel.deleteOne({ _id: context.params.id});
        return NextResponse.json({message: "アイテム削除成功"});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "アイテム削除失敗" });
    }
}
