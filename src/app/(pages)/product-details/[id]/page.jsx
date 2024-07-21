import React from 'react'

import "./pd.css"
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import AdminBtn from './AdminBtn'
import { useSession } from 'next-auth/react'



const getData =async (pp)=>{
const res =await fetch(`http://localhost:3000/api/getOneProduct?id=${pp}`)
if (!res.ok){
  notFound()    
};
return res.json()
}


export async function generateMetadata({params}){


  const dataa =await getData(params.id)

return {
  title:dataa.title ,
  description:dataa.description
}


}





const page =async ({params}) => {

  const data =await getData(params.id)


  return (

<div className="pro-details "

style={{height:"100vh", display: "flex", flexDirection: "column",
  justifyContent: "space-between"}}

>


  
<Header/>


<div className='p-2' >

    <main style={{ textAlign: "center",padding:"50px" }} className="flex">
   <Image width={266} height={260} style={{objectFit:"contain",borderRadius:"30px !important"}} src={data.productImg} alt={data.title}  />

    <div className="product-details" style={{width:"50%"}} >
      <div style={{ justifyContent: "space-between" }} className="flex">
        <h2>{data.title}</h2>
        <p className="price">${data.price}</p>
      </div>
      <p className="description">
       {data.description}
      </p>
      <button className="flex add-to-cart">
        <FontAwesomeIcon width="1.5rem" icon={faCartPlus} />
        Add To Cart
      </button>
    </div>
  </main>

  <AdminBtn  productId={params.id} imgPuplicId={data.imgPuplicId} />




</div>

 
<Footer/>

</div>

 
  
  )
}

export default page