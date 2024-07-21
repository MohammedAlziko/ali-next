"use client"





import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const RegisterForm = () => {

const [name ,setname] =useState(null)
const [email ,setemail] =useState(null)
const [password ,setpassword] =useState(null)
const [error ,seterror] =useState(null)
const router =useRouter();
const [loading,setloading] =useState(false);
const [isRed, setisRed] = useState(false);


const handleSubmit = async (eo) => {
  eo.preventDefault();
seterror(null)
setloading(true)
setisRed(false)

// CHECK INPUTS
if( !name|| !email || !password ){
  seterror("ALL INPUTS MUST BE FILLED")
toast.warning("ALL INPUTS MUST BE FILLED")
setloading(false)


  return;
}

const regPassword =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

if (!regPassword.test(password)) {
setisRed(true)
setloading(false);
seterror(
  "Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 special character and 1 numeric."
);
return;
}





//  CHICKING EXIST EMAIL
const isUserEx = await fetch("api/isUserExist", {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  headers: {
    "Content-Type": "application/json",
  },
 body: JSON.stringify({ email}), // body data type must match "Content-Type" header
});

const exuser =await isUserEx.json();

if(exuser.isUserThere){
  seterror("Email Already Exists");
  setloading(false)
toast.error("Email Already Signed")

  return;
}


  // STORING DATA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const response = await fetch("api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ name, email, password }),
  });


  console.log(response)


  if (response.ok) {
    seterror(null)
toast.success("Account Created successfuly")
  eo.target.reset();
  router.push("/signin")
  }else{
    seterror("failed to create account, please try again.")
  }

  setloading(false);

};


  
  
  


  return (
    <form 
    onSubmit={handleSubmit}
    style={{ textAlign: "left" }}>


      


      
    <div className="mb-4">
      <label htmlFor="username" className="form-label">
        Username
      </label>
      <input onChange={(e) => {
        setname(e.target.value)
      }} type="text" className="form-control" id="username" aria-describedby="emailHelp" />
    </div>
    <div className="mb-4">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Email address
      </label>
      <input onChange={(e) => {
        setemail(e.target.value)
      }} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"   />
    </div>
    <div className="mb-4">
      <label htmlFor="exampleInputPassword1" className="form-label">
        Password
      </label>
      <input style={{backgroundColor: isRed?   "#fcaaaa" : null}} onChange={(e) => {
        setpassword(e.target.value)
      }} type="password" className="form-control" id="exampleInputPassword1"    />
    </div>
   
    <button disabled={!name|| !email || !password || loading } type="submit" className="btn btn-primary p-2">
    {loading ?
 <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
      :  "Create Account"}
    </button>

<p style={{marginTop:"20px",color:"#fcaaaa"}} >{error}</p>


  </form>
  )
}

export default RegisterForm


























