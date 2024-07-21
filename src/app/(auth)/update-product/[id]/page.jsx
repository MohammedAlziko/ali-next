import Header from '@/components/header/Header'
import React from 'react'
import UpdateForm from './UpdateForm'

const page = ({params}) => {
  return (
    <>
<Header />

<main className="px-3 pt-5" >


<UpdateForm ProductId={params.id} />
</main>



    </>
  )
}

export default page