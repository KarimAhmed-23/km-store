import React from 'react'
import CatchImage from '../CatchImage'
import { Link } from 'react-router-dom'
import "./Categories.css";

function CategoryCard({category}) {
  return (
    <Link className='category-card' to={`/products/${category._id}/${category.name.replace(/[^\w\s\-]/gi, '').replace(/\s+/g, '+')}`}>
        <div className='category-img'>
            <CatchImage 
            notFoundStyle={<h2 className='fw-bold mb-0'>Image Not Found</h2>}>

                <img className='img-fluid loading-img' src={category.image ||  require("../../assets/images/test-img.jpg") } alt={category.name}/>
            </CatchImage>
            
        </div>
        <p className='category-title'>{category.name}</p>
    </Link>
  )
}

export default CategoryCard