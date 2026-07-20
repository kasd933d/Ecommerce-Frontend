import { createContext } from "react";

import { useContext } from "react";

import { Products } from "@/data/Product";

 const ProductContext = createContext();


 function ProductProvider({children}){
    


return(

<ProductContext.Provider value={{Products}}>

{children}

</ProductContext.Provider>

)


}
export const Product1 = () => {
  return useContext(ProductContext);
};

export default ProductProvider