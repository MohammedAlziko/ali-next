import productModal from "@/app/dbConfig/models/product";
import { connectMongoDB } from "@/app/dbConfig/mongoDB";
import { NextResponse } from "next/server";





export async function GET(request){

await connectMongoDB();

const res = await productModal.findOne({

_id:request.nextUrl.searchParams.get("id")

})


return NextResponse.json(res);

}












