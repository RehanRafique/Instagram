"use client"
import { useState } from 'react';
import { adPosts } from '../config/firebase';
import Link from 'next/link';
import "./get.css"

const AddPostForm = () => {
    const [img, setImg] = useState(null);
    const [des, setDes] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImg(file);
    };

    const addItem = async () => {
        if (img && des) {
            await adPosts({
                des,
                img
            });
        }
    };

    return (
        <div className="add-post-form-container">
            <input type="file" onChange={handleImageChange} />
            <textarea
                placeholder="Enter description..."
                value={des}
                onChange={(e) => setDes(e.target.value)}
            />
            <Link href="/route">
                <button onClick={addItem}>Add Post</button>
            </Link>
        </div>
    );
};

export default AddPostForm;
