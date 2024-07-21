import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react'



  


// const fetchData = async ()=>{

//     const res =await fetch("https://fakestoreapi.com/products",{next : { revalidate : 0}});

// // await new Promise(resolve => setTimeout(resolve,5000));

//     if(!res.ok){
// notFound()    
//     }

// return res.json();

// }










const Products = () => {
  const [loading,setLoading] =useState(false);


  const [arrData, setstate] = useState([]);
  useEffect(() => {
setLoading(true);

    const fetchData =async ()=>{
      const res =await fetch("http://localhost:3000/api/getProducts");
      if(!res.ok){
        notFound()
      }
const data1 =await res.json(); 


setstate(data1);
setLoading(false)
    }
    fetchData();

  }, []);


 return (
    <section className="products flex">



    {arrData.map((item) =>{
      
    return(
 
      
      
       <article key={item._id} title={item.title} className="card">


          <Link href={`product-details/${item._id}`} style={{background:"#fff"}} >
            <Image width={266} height={260} style={{objectFit:"contain"}} src={item.productImg} alt={item.title} srcSet="" />
          </Link>
          <div style={{ width: 266 }} className="content">
            <h1 className="title">{item.title.slice(0,15)} ...</h1>
            <p className="description">
           {item.description.slice(0,100)} ...
            </p>
            <div
              className="flex"
              style={{ justifyContent: "space-between", paddingBottom: "0.7rem" }}
            >
              <div className="price">{item.price}$</div>
              <button className="add-to-cart flex">
              <FontAwesomeIcon width="1rem" icon={faCartPlus} />
              Add To Cart
              </button>
            </div>
          </div>



        </article>
      

      
      

       


    )
    
    })}
    
{arrData.length === 0 && <h1>No Products Found</h1> }
     
      </section>  )
}

export default Products;