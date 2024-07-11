import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
const Login =()=>{
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const navigate=useNavigate();

const handleLogin=async()=>{
    console.log(email,password);
    let result=await fetch("http://localhost:5000/login",{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{

            'Content-Type':'application/json'
        }
    
    });
    result=await result.json();
    console.log(result);
    if(result.token){
        localStorage.setItem("user" ,JSON.stringify(result.customer));
        navigate("/product");
    }
    if(result.token){
        localStorage.setItem("token" ,JSON.stringify(result.token));
        navigate("/product");
    }

    else {
        alert("please enter correct detail");
    }
}
    return(
        <div className="login">
            <h1>Login component</h1>
            <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <button onClick={handleLogin}>Login</button>

        </div>
    )
}
export default Login