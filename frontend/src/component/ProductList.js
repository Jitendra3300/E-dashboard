import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList=()=>{
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts=async()=>{
        let result=await fetch('http://localhost:5000/products',{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        });
        result=await result.json();
        setProducts(result);
    };
    const deleteProduct=async(id)=>{
        let result=await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete"
        });
        result=await result.json();
        if(result){
            getProducts();
        }
    };
    const searchHandle= async(event)=>{
        let key=event.target.value;
        if(key){
let result=await fetch(`http://localhost:5000/search/${key}`);
        result= await result.json();
        if(result){
            setProducts(result);
        }
        }
        else{
            getProducts();
        }
        
    }
    return(
        <div className="productList">
            <h1>ProductList</h1>
            <input type="search" placeholder="Search here" className="search" onChange={searchHandle}/>
            <ul>
                <li>S.No.</li>
                <li>Name</li>
                <li>Model</li>
                <li>Category</li>
                <li>Price</li>
                <li>Operation</li>
            </ul>
            {
                products.map((item,index)=>
                <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.model}</li>
                <li>{item.category}</li>
                <li>{item.price}</li>
                <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                <Link to={"/update/"+item._id}  >Update</Link>
                </li>
                </ul>
                )
            }
        </div>
    )
}
export default ProductList