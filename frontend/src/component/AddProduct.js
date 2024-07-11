import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState(false)
    const navigate=useNavigate();
    const addproduct = async () => {
        if (!name || !model || !category || !price) {
            setError(true)
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.log(userId);
        let result = await fetch('http://localhost:5000/add-products', {
            method: 'post',
            body: JSON.stringify({ name, model, category, price }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result);
        if(result){
            navigate("/product")
        }

    }

    return (
        <div className="product">
            <input type='text' placeholder='Enter Product Name' value={name} onChange={(e) => { setName(e.target.value) }} />
            {error && !name && <span>Enter valid name</span>}
            <input type='text' placeholder='Enter Product Model' value={model} onChange={(e) => { setModel(e.target.value) }} />
            {error && !model && <span>Enter valid model</span>}
            <input type='text' placeholder='Enter Product Category' value={category} onChange={(e) => { setCategory(e.target.value) }} />
            {error && !category && <span>Enter valid category</span>}
            <input type='text' placeholder='Enter Product Price' value={price} onChange={(e) => { setPrice(e.target.value) }} />
            {error && !price && <span>Enter valid price</span>}
            <button onClick={addproduct}>Add Product</button>

        </div>
    )
}
export default AddProduct;