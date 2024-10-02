"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../../utils/useAuth";


const UpdateItem = (context) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");

    const router = useRouter();
    const loginUserEmail = useAuth();

    useEffect(() => {
        const getSingleItem = async (id) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, { cache: "no-store" });
            const jsonData = await response.json();
            const singleItem = jsonData.singleItem;
            setTitle(singleItem.title);
            setPrice(singleItem.price);
            setImage(singleItem.image);
            setDescription(singleItem.description);
            setEmail(singleItem.email);
        }
        getSingleItem(context.params.id);
    }, [context]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${context.params.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ title, price, image, description, email: loginUserEmail })
            });

            const jsonData = await response.json();
            alert(jsonData.message);
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Error:", error);
            alert("アイテムの更新に失敗しました");
        }
    }

    if (loginUserEmail !== email) return <div>権限がありません</div>;

    return (
        <div>
            <h1 className="page-title">アイテム編集</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="アイテム名" required/>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="価格" required/>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="画像" required/>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="説明" required/>
                <button>編集</button>
            </form>
        </div>
    );
}

export default UpdateItem;
