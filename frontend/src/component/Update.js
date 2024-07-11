import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const params = useParams();
    const navigate=useNavigate();
    
    useEffect( ()=>{
        getProductDetails();
        }, []);

    const getProductDetails = async () => {
        console.log(params);
        let result = await fetch(`http://localhost:5000/updateproduct/${params.id}`);
        result = await result.json();
        console.log(result);
        setName(result.name);
        setModel(result.model);
        setCategory(result.category);
        setPrice(result.price);
    }
    

const update= async () =>{
let result=await fetch(`http://localhost:5000/Update-product/${params.id}`,{
    method:'Put',
    body:JSON.stringify({name,model,category,price}),
    headers:{
        'Content-Type':'application/json'
    }
});
result= await result.json();
navigate("/product")
console.log(result);
}
    return (
        <div className="product">
            <input type='text' placeholder='Enter Product Name' value={name} onChange={(e) => { setName(e.target.value) }} />
            <input type='text' placeholder='Enter Product Model' value={model} onChange={(e) => { setModel(e.target.value) }} />
            <input type='text' placeholder='Enter Product Category' value={category} onChange={(e) => { setCategory(e.target.value) }} />
            <input type='text' placeholder='Enter Product Price' value={price} onChange={(e) => { setPrice(e.target.value) }} />
            <button onClick={update}>Update</button>

        </div>
    )
}
export default UpdateProduct;