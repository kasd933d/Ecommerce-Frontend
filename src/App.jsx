import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'


import Navbar from './components/Navbar'
import Home from './components/Home'
import { ProductProvider } from './components/ProductContext'
import AllProducts from './components/AllProducts'
import MoreProducts from './components/MoreProductsPage/MoreProducts'
import ProductDetail from './components/ProductDetailsPage/DetailsPage'
import Cart from './components/CartPage/CartPage'
import Checkout from './components/CheckoutAutoFillPage/CheckoutPage'


import VerifyEmail from './components/VerifyEmail/VerifyEmail'
import ResetPassword from './components/ResetPassword/ResetPassword'
 // 👈 Profile Component Import Kiya
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute/ProtectedRoute'
import Auth from './components/LoginSingup/Auth'
import { AuthProvider } from './components/AuthContext/AuthContext'
import Profile from './components/ProfilePage/Profile'
import AdminRoute from './components/AdminRoute/AdminRoute'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import AddProduct from './components/AddProduct/AddProduct'
import ManageProducts from './components/ViewAllProducts/ManageProducts'


const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <div className="min-h-screen flex flex-col justify-between bg-white">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/moreproducts" element={<MoreProducts />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* If Logged in, user cannot open /Auth (Phek dega Home par) */}
            <Route
              path="/Auth"
              element={
              <PublicOnlyRoute>
                <Auth/>
                </PublicOnlyRoute>
           
              }
            />

            {/* Profile Route protected (Non-logged in user cannot open) */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                 <Profile/>
                </ProtectedRoute>
              }
            />

            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Fallback Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />


            <Route element={<AdminRoute/>}>
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/admin/add-product" element={<AddProduct/>} />
        <Route path="/admin/products" element={<ManageProducts />} />
      </Route>
          </Routes>
        </div>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App;