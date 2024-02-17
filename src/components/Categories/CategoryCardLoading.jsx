import React from 'react'

function CategoryCardLoading() {
  return (
    <div className='category-card skeleton'>
        <div className='category-img skeleton-bar'>
        </div>
        <div className='category-title skeleton-bar' style={{width:"100px"}}></div>
    </div>
  )
}

export default CategoryCardLoading