"use client"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import React from 'react'
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";






const UpdateForm = ({ProductId}) => {




const router =useRouter();



    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState(null);
  
    const [isLoading, setisLoading] = useState(false);
    const [error, seterror] = useState(null);
  

 const handleSubmit = async (eo) => {
    eo.preventDefault();
    setisLoading(true);
seterror(null);

if(!title || !price || !description){

  seterror("All Inputs Must Be Filled");
  setisLoading(null);
return;

}



const res =await fetch("api/update_product",{

method:"PUT",
headers:{
  "Content-Type":"application-json"
},

body: JSON.stringify({
  title,
  price,
  description,
  ProductId
})

})

if(res.ok){
toast.success("product updated successfully");
router.push("/")
}else{
  setisLoading(false);
  seterror("failed to Update Data")
}

    setisLoading(false);

 }



 const [Data, setData] = useState(null);
 useEffect(() => {
  setisLoading(true);

   const fetchData =async (id)=>{
     const res =await fetch(`http://localhost:3000/api/getOneProduct?id=${id}`);
     if(!res.ok){
       notFound()
     }
const data1 =await res.json(); 


setData(data1);

setTitle(data1.title);
setPrice(data1.price);
setDescription(data1.description);


setisLoading(false)
   }
   fetchData(ProductId);

 }, []);

if(!Data){
return <p>Loading ...</p>
}




  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
  
    <div className="mb-4">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Product Title:
      </label>
      <input
      defaultValue={Data.title}
        required
        onChange={(eo) => {
          setTitle(eo.target.value)
        }}
        type="text"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="T-shirt"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="exampleInputPassword1" className="form-label">
        Product Price:
      </label>
      <input
      defaultValue={Data.price}

      step={.01}
        placeholder="$99.99"
        required
        onChange={(eo) => {
          setPrice(eo.target.value)
        }}
        type="number"
        className="form-control"
        id="exampleInputPassword1"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="exampleInputPassword1" className="form-label">
        Product Description:
      </label>

      <textarea
        placeholder="Product Description....."
        defaultValue={Data.description}
      required
        onChange={(eo) => {
          setDescription(eo.target.value)
        }}
        rows={3}
        className="form-control"
        id="exampleInputPassword1"
      />
    </div>

    <button
      type="submit"
      className="btn btn-primary"
    >
      {isLoading ? (
   
        <div
          style={{ width: "1.5rem", height: "1.5rem" }}
          className="spinner-border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        "Update Product"
      )}
    </button>

    <p style={{ color: "#ff7790", fontSize: "1.1rem", marginTop: "1rem" }}>
      {" "}
      {error}
    </p>
  </form>
  )
}

export default UpdateForm