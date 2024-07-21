import productModal from "@/app/dbConfig/models/product";
import { connectMongoDB } from "@/app/dbConfig/mongoDB";
import { NextResponse } from "next/server";

const cloudinary =require("cloudinary").v2;


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY,
  });
   

export async function DELETE(request){
const receivedData = await request.json();

await connectMongoDB();


 await productModal.deleteOne({
    _id:receivedData.productId
})

await cloudinary.uploader.destroy(receivedData.imgPuplicId)

return NextResponse.json({})

} 










