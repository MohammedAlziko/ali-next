import { NextResponse } from "next/server";
import { uploadStream } from '@/helper/uploadimgtocloud';
import { connectMongoDB } from "@/app/dbConfig/mongoDB";
import productModal from "@/app/dbConfig/models/product";


  // 1-RECEIVE DATA FROM FRONTEND
// 2-Convert img into buffer & upload img to cloudinary
 // 3-GETTING THE IMG URL & ID
  // 4- connect to DB
  // 5-Store obj to DB
  // 6- Go back to frontend







export async function POST(request) {

  // 1-RECEIVE DATA FROM FRONTEND
  const objFromFrontEnd = await request.formData();
const productImg = objFromFrontEnd.get("img")



// 2-Convert img into buffer & upload img to cloudinary
const bytes = await productImg.arrayBuffer();
const buffer = Buffer.from(bytes);
const uploadedImg =  await uploadStream(buffer);

 // 3-GETTING THE IMG URL & ID
const imgURL = uploadedImg.url;
const imgPuplicId = uploadedImg.public_id;

  // 4- connect to DB
  await connectMongoDB();

  
  // 5-Store obj to DB
  await productModal.create({
    productImg:imgURL,
    imgPuplicId:imgPuplicId,
    title: objFromFrontEnd.get("title"),
    price: objFromFrontEnd.get("price"),
    description: objFromFrontEnd.get("description"),
  });

  
  // 6- Go back to frontend
  return NextResponse.json(  {message: "product added successfully"}   );
}