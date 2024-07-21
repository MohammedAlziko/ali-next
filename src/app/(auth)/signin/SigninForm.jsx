"use client"

import React, { useState } from 'react';
import {signIn, signOut, useSession} from "next-auth/react";
import { useRouter } from 'next/navigation';





const SigninForm = () => {

  const {data:session,status}=useSession();
const router=useRouter();

       const [email,setemail] =useState(null)
       const [password,setpassword] =useState(null)
       const [Loading,setLoading] =useState(false)
       const [Error,setError] =useState(null)


const handleSubmit =async (e)=>{
e.preventDefault();
setError(null);
setLoading(true);

const res = await signIn("credentials", {
  email,
  password,
  redirect: false,
});

console.log("111111111111111111111111111111111111")
console.log(res)
if (!res.ok) {
  setError("invalid email or password");
  setLoading(false);
  return
} else {

  console.log("WELCOME ♥♥")
  setLoading(false);
  router.replace("/")
}


}



  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>

    <div className="mb-4">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Email address
      </label>
      <input
        type="email"
        className="form-control"
        id="exampleInputEmail1"
onChange={(e) => {
    setemail(e.target.value);
}}

        aria-describedby="emailHelp"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="exampleInputPassword1" className="form-label">
        Password
      </label>
      <input
        type="password"
        onChange={(e) => {
            setpassword(e.target.value);
 
          }}
        className="form-control"
        id="exampleInputPassword1"
      />
    </div>

    <button disabled={ !email || !password || Loading } type="submit" className="btn btn-primary p-2">
    {Loading ?
 <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
      :  "Login"}
    </button>

<p style={{color:"#ff0000", marginTop:"15px", fontSize:'20px'}} >{Error}</p>




{status === "authenticated" && (
  <p>Signed in as {session.user.name}</p>
)}
<br/>
{status === "authenticated" && (
  <button onClick={
  ()=>{
    signOut()
  }
  } className="btn btn-danger p-2 mt-3" >sign out</button>

)}



  </form>
  )
}

export default SigninForm