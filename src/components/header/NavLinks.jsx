"use client"



import React from 'react'
import {  faCartShopping, faPlus, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut, useSession } from 'next-auth/react';
import "./header.css"

const NavLinks = ({isRegistered ,isSignedIn,isAdmin}) => {

const {data:session,status} =useSession()


if(status === "loading"){

  return <p> Loading... </p>

}






if(status === "authenticated" && session.user.email === "admin@admin.com"){
  return(
    <nav className="links flex ">

<Link
            className={`register ${isAdmin ? "border" : null} `}
            href="/admin"
            style={{marginInline:"20px"}}
          >
            <FontAwesomeIcon
              className="fa-solid fa-user-plus"
              style={{
                width: "0.8rem",
              }}
              icon={faPlus}
            />
          Add Product
          </Link>

          <p className='header_p' style={{alignSelf:"center"}} >Welcome {session.user.name} ❤️ </p>
          
          <button className="sign-in" onClick={() => {
            signOut()
          }}>Sign out</button>

</nav>

  )
}










  return (
    <nav className="links">
{
status ==="authenticated" && (
  <>
   <Link
      style={{ position: "relative" }}
      className="cart"
      href="/cart"
    >
      <FontAwesomeIcon width=".8rem" style={{marginRight:".3rem"}}  icon={faCartShopping} />
      $0.00
      <span className="products-number">2</span>
    </Link>
  </>
)}


    {status === "authenticated" && (
<>
          <button className="sign-in" onClick={() => {
            signOut()
          }}>Sign out</button>
          <p className='header_p' style={{alignSelf:"center"}} >Welcome {session.user.name}</p>
</>
      )}

      {status === "unauthenticated" && (
        <>
          <Link
            className={`sign-in ${isSignedIn ? "border" : null}`}
            href="/signin"
          >
            <FontAwesomeIcon
              className="fa-solid fa-right-to-bracket"
              style={{
                width: "0.8rem",
              }}
              icon={faRightToBracket}
            />
            Sign in
          </Link>

          <Link
            className={`register ${isRegistered ? "border" : null}`}
            href="/register"
          >
            <FontAwesomeIcon
              className="fa-solid fa-user-plus"
              style={{
                width: "0.8rem",
              }}
              icon={faUserPlus}
            />
            Register
          </Link>
        </>
      )}
  </nav>
  )
}

export default NavLinks