import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import {ProductProvider} from './components/ProductContext'
import AllProducts from './components/AllProducts'
import MoreProducts from './components/MoreProductsPage/MoreProducts'
import ProductDetail from './components/ProductDetailsPage/DetailsPage'
import Cart from './components/CartPage/CartPage'
import Checkout from './components/CheckoutAutoFillPage/CheckoutPage'



const App = () => {
  return (
    <ProductProvider>
      <div className="min-h-screen flex flex-col justify-between bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {/* Main Products Page Route */}
          <Route path="/products" element={<AllProducts />} />
          {/* Agar nested path chahiye toh: */}
          <Route path="/products/moreproducts" element={<MoreProducts/>} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      </div>
    </ProductProvider>
  )
}

export default App