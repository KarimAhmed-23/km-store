import React from 'react'
import ProductCard from './ProductCard';

function ProductsList({products}) {



  return (
    <>
    
     {products.map(item => <ProductCard key={item._id} product={item}/>)}

    </>
  )
}

export default ProductsList