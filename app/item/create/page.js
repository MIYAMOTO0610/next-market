"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../utils/useAuth";

const CreateItem = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    const router = useRouter();
    const loginUserEmail = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
                method: "POST",
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
            alert("アイテムの作成に失敗しました");
        }
    }


    if (!loginUserEmail) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="page-title">アイテム作成</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="アイテム名" required/>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="価格" required/>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="画像" required/>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="説明" required/>
                <button>Create</button>
            </form>
        </div>
    );
}

export default CreateItem;
