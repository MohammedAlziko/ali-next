import { NextResponse } from "next/server"
import { connectMongoDB } from './../../dbConfig/mongoDB';
import UserModal from "@/app/dbConfig/models/user";



export async function POST(req){

    // 1-recive data from Frontend 
     const ODataFromF = await req.json()
  


    // 2-connect to db
await connectMongoDB();
    // 3-try to store obj to db
 const isUserThere = await UserModal.findOne(ODataFromF);
    // 4-Go Back to frontend

console.log("isUserThere");
console.log(isUserThere);



    return NextResponse.json({isUserThere})



}








