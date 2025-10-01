import mongoose  from "mongoose";

const connectMongo = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/notable-app`);
        console.log("mongodb connected successfully");
        
    } catch (error) {
        console.log("error in mongo connections");
    }
}

export default connectMongo;