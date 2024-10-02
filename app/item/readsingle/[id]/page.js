import Image from "next/image";
import Link from "next/link";

const getSingleItem = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`);
    const jsonData = await response.json();
    return jsonData.singleItem;
}

const ReadSingleItem = async (context) => {
    const singleItem = await getSingleItem(context.params.id);

    return (
        <div className="grid-container-in">
            <Image src={singleItem.image} width={750} height={500} alt="item-image" priority/>
            <div>
                <h2>{singleItem.price}</h2>
                <h3>{singleItem.title}</h3>
                <p>{singleItem.description}</p>
                <Link href={`/item/update/${singleItem._id}`}>編集</Link>
                <Link href={`/item/delete/${singleItem._id}`}>削除</Link>
            </div>
        </div>
    )
}

export default ReadSingleItem;
