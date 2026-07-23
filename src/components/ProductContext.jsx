import React, { createContext, useState, useEffect, useContext } from 'react';
import IPhoneNotification from './Notification';


// 1. Create Context
export const ProductContext = createContext();

// 2. Custom Hook for using context directly
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

// 3. Named Export Provider Function
export const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [savedUserInfo, setSavedUserInfo] = useState(null);
  
  // iPhone Style Notification state
  const [notificationProduct, setNotificationProduct] = useState(null);

  // LocalStorage se saved user address/info load karna
  useEffect(() => {
    const localData = localStorage.getItem('daraz_user_info');
    if (localData) {
      try {
        setSavedUserInfo(JSON.parse(localData));
      } catch (err) {
        console.error("Error parsing stored user info", err);
      }
    }
  }, []);

  // Add To Cart Functionality + Trigger Notification
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    // iPhone Dynamic Island Toast Trigger
    setNotificationProduct(product);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const saveUserInfo = (info) => {
    setSavedUserInfo(info);
    localStorage.setItem('daraz_user_info', JSON.stringify(info));
  };

  return (
    <ProductContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        selectedProduct,
        setSelectedProduct,
        savedUserInfo,
        saveUserInfo,
      }}
    >
      {children}

      {/* Jab bhi koi product add hoga, yeh iPhone Popup top screen par auto show hoga */}
      {notificationProduct && (
    <IPhoneNotification
         product={notificationProduct}
          onClose={() => setNotificationProduct(null)}
    />
      )}
    </ProductContext.Provider>
  );
};