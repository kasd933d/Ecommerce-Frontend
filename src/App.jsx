import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ProductProvider from './components/ProductContext'

const App = () => {
  return (
    <ProductProvider>
    <Home/>
    
    </ProductProvider>
  )
}

export default App