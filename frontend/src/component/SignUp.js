import React,{ useState} from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const SignUp=()=>{
    const[fname,setFname]=useState("");
    const[lname,setLname]=useState("");
    const[email,setEmail]=useState("");
    const[contact,setContact]=useState("");
    const[password,setPassword]=useState("");
    const[address,setAddress]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/product');
        }
    })
    const collectData= async ()=>{
        console.warn(fname,lname,email,contact,password,address);
        let result=await fetch('http://localhost:5000/signup',{
            method:'post',
            body:JSON.stringify({fname,lname,email,contact,password,address}),
            headers:{
                'Content-Type':'application/json'
            },
            

        });
        result=await result.json();
        console.warn(result);   
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.token));

        if(result){
            navigate('/product');
        }
    }
    
    return(
        <div className="register">
            <h1>Register here</h1>
            <input type="text" value={fname} onChange={(e)=>setFname(e.target.value)} placeholder="First Name" />
            <input type="text" value={lname} onChange={(e)=>setLname(e.target.value)} placeholder="Last Name"/>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
            <input type="tel" value={contact} onChange={(e)=>setContact(e.target.value)} placeholder="Contact"/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
            <textarea  value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Address"></textarea><br/>
            <button onClick={collectData}>SignUp</button>
        </div>
    );
}
export default SignUp;