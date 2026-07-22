import React from 'react'
import Navbar from './Navbar'
import ProductSection1 from './ProductSection1'
import ProductSection2 from './ProductSection2'
import ProductSection3 from './ProductSection3'
import ProductSection4 from './ProductsSection4'
import Footer from './Footer'

const AllProducts = () => {
  return (
    <div>
      <Navbar/>
      <ProductSection1/>
      <ProductSection2/>
      <ProductSection3/>
      <ProductSection4/>
      <Footer/>
    </div>
  )
}

export default AllProducts
