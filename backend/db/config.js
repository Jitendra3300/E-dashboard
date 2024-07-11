const mongoose=require ('mongoose');
const database=()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/E-dashData");
        
    } catch (error) {
        console.log(error.message);
    }
}

database();
