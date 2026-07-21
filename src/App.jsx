import React from 'react'
import {  Routes, Route, } from 'react-router-dom'
import Home from './components/Home'
import ProductProvider from './components/ProductContext'
import AllProducts from './components/AllProducts'

const App = () => {
  return (
   <ProductProvider>
    
        <div className="min-h-screen flex flex-col justify-between bg-white">
          
        
          <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
  <Route path="/products" element={<AllProducts/>} />
         
          </Routes>

        
         

        </div>
  
    </ProductProvider>
  )
}

export default App