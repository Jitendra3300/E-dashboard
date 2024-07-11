import React from "react";

const Profile = () => {
    const user = localStorage.getItem('user');
    return (
        <div>
            <h1>Profile of Mr. {JSON.parse(user).fname}</h1>
        
        <form className="profile">
            <label>First Name:</label>
            <input type="text" value={JSON.parse(user).fname} /><br/>
            <label>Last Name:</label>
            <input type="text" value={JSON.parse(user).lname} /><br/>
            <label>Email:</label>
            <input type="email" value={JSON.parse(user).email} /><br/>
            <label>Contact:</label>
            <input type="tel" value={JSON.parse(user).contact} /><br/>
            <label>Address:</label>
            <input type="text" value={JSON.parse(user).address} /><br/>

        </form>
        
         </div>
    )
}
export default Profile;