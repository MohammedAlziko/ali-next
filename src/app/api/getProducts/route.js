import productModal from "@/app/dbConfig/models/product";
import { connectMongoDB } from "@/app/dbConfig/mongoDB";
import { NextResponse } from 'next/server';




export  async function GET(){
  // Connect to mongo Db
  await  connectMongoDB()
  // Fetch all the Data
 const res =await productModal.find()

// Return to frontend
return NextResponse.json(res)

}



