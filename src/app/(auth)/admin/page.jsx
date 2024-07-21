import Header from '@/components/header/Header'
import React from 'react'
import ProductForm from './ProductForm'

const page = () => {
  return (
<>
<Header isAdmin={true}/>

<main  className="px-3 pt-5 "  >

<ProductForm  />

</main>


</>
  )
}

export default page