import { NextResponse } from "next/server"
import { connectMongoDB } from './../../dbConfig/mongoDB';
import UserModal from "@/app/dbConfig/models/user";

import bcrypt from "bcrypt"

export async function POST(req){

    // 1-recive data from Frontend 
     const ODataFromF = await req.json()
  


    // 2-connect to db
await connectMongoDB();





//  # HASHING PASSWORD
const salt =await bcrypt.genSalt()
const hashedPassword = await bcrypt.hash(ODataFromF.password ,salt)


    // 3-try to store obj to db
await UserModal.create({
    
   name: ODataFromF.name,
  password: hashedPassword,
  email:  ODataFromF.email


})
    // 4-Go Back to frontend

    return NextResponse.json({})



}








