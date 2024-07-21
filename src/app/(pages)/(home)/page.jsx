"use client"
import React, { Suspense } from 'react'

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { signIn, signOut, useSession } from "next-auth/react";


import "./home.css"
import Products from './products';
import Loading from './loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';





const Home = () => {
  const { data: session, status } = useSession();

  return (
    <> 
    <div className="top-img">
     <Header />

     <section className="content">
      <p className="lifestyle">Mohammed Mansour</p>
      <p className="men">MEN</p>
      <p className="sale">
        SALE UP TO <span>30% OFF</span>
      </p>
      <p className="free-shipping">Get Free Shipping on orders over $99.00</p>
      <button>Shop Now</button>
    </section>
</div>
    <main  >
  <h1  style={{display:"flex",alignItems:"center"}}  className="recommended">
   
    <FontAwesomeIcon style={{width:"2rem",marginRight:"1rem" , }} icon={faCheck} />
    Recommended for you
  </h1>



{status === "loading" && <Loading />}

{status == "unauthenticated" && (
  <h3
    style={{
      display: "flex",
      justifyContent: "center",
      marginBlock: "4rem",
    }}
  >
    You must be signed in to view the protected content on this page.
  </h3>
)}

{status === "authenticated" && (
  <Suspense fallback={<Loading />}>
    <Products />
  </Suspense>
)}

</main>


<Footer/></>
  )
}

export default Home