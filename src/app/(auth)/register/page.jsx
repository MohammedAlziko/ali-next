
import Header from '@/components/header/Header'
import React from 'react'
import RegisterForm from './RegisterForm'

export const metadata ={
  title:"Register Page ",
  description:"description for Register page  "
}


const page = () => {
  return (
    <div  >

<Header  isRegistered={true} />

      <main className="px-3 pt-5">
<RegisterForm />
</main>






    </div>
  )
}

export default page