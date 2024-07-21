import productModal from "@/app/dbConfig/models/product";
import { connectMongoDB } from "@/app/dbConfig/mongoDB";
import { NextResponse } from "next/server";





export  async function PUT(request){
    
    const DataFromFrontEnd = await request.json();
  
    await connectMongoDB();

await productModal.updateOne({_id:DataFromFrontEnd.ProductId},{
   title:DataFromFrontEnd.title ,
    price: DataFromFrontEnd.price,
    description: DataFromFrontEnd.description,
    


})



return NextResponse.json({})

}
















