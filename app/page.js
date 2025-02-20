import React from 'react'
import ProductPage from './products/page'
import HeroHome from './components/HeroHome'

export const dynamic = 'force-dynamic';

const page = () => {
  return (
   <>
   <HeroHome />
   <ProductPage /> 
   </>
  )
}

export default page