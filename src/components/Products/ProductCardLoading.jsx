import React from 'react'

export default function ProductCardLoading() {
  return (

    <>
        <div className='product-wrap'>
            <div className='product skeleton'>
                <div className='product-img skeleton-bar'></div>
                <div className='product-body'>
                    <div className='product-titles'>
                    <div className='product-category skeleton-bar' style={{width:'50px'}}></div>
                    <div className='product-name skeleton-bar w-100'></div>
                    </div>
                    <div className='product-info'>
                    <div className='product-price skeleton-bar' style={{width:'50px'}}></div>
                    <div className='product-rate skeleton-bar' style={{width:'50px'}}></div>
                    </div>
                </div>
            </div>
         </div>
         
    </>
    
    
  )
}
