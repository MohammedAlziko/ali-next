import Header from '@/components/header/Header'
import React from 'react'
import SigninForm from './SigninForm'


export const metadata ={
  title:"Signin Page ",
  description:"description for signin page  "
}

const page = () => {
  return (

<>

<Header isSignedIn={true} />

    <main className="px-3 pt-5">

<SigninForm  />

</main>
</>




  )
}

export default page