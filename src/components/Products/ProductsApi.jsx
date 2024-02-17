import React, { useEffect, useState } from 'react';
import "./Products.css";
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductCardLoading from './ProductCardLoading';
import useGetApi from '../../customHooks/UseGetApi';
import { useQuery, useQueryClient } from 'react-query';
import Search from '../Search';

 function ProductsApi() {
  const queryClient = useQueryClient();

  

  // const [products , setProducts] = useState([]);
  // const [originalProducts, setOriginalProducts] = useState([]);
  // const [isLoading , setIsLoading] = useState(false);
  // const [error , setError] = useState(null);

  // async function getProducts() {
      
  //   try {

  //     setIsLoading(true);
  //     let {data:{data:products}} = await axios.get("https://ecommerce.routemisr.com/api/v1/products?category[in]=6439d2d167d9aa4ca970649f");
  //     console.log(products);
  //     setProducts(products);
  //     setOriginalProducts(products);
  //     setIsLoading(false);
  //     setError(null);

  //   } catch (error) {
  //     console.log(error);
  //     setProducts([]);
  //     setOriginalProducts([]);
  //     setIsLoading(false);
  //     setError(error.response.data.message);
      
  //   }

  // }

  // useEffect(()=>{
  //   getProducts();
  // },[]);


  // const [data , isLoading , error] = useGetApi('https://ecommerce.routemisr.com/api/v1/products'); 
  // const products = data?.data;
 

  function getProducts(){
    return  axios.get("https://ecommerce.routemisr.com/api/v1/products?category[in]=6439d2d167d9aa4ca970649f");
  }
  const {isLoading , isError , error:queryError   , isFetching , data , refetch } = useQuery("products" , getProducts , {

    // cacheTime:3000, // control the cacheTime

    // refetchOnMount:false // control if we want to refetch (compare with cashed res) or not 

    // refetchInterval:1000 // control the time to refetch

    // enabled:false,

    // refetchOnWindowFocus :false,

    // refetchOnReconnect : true ,

    // staleTime:5000 // control the time we want to show old cashed res and then refetchOnMount or updates
    // The time in milliseconds after data is considered stale

    
  

  });
  const products = data?.data.data;
  
  
  // search with mutate the state
  // 
  // function getSearchKeyword(keyword){

  //   if(keyword.trim().length){

  //     const searchProducts = originalProducts.filter((el) =>  el.title.includes(keyword));
      
  //     setProducts(searchProducts);

  //     console.log(searchProducts , products , originalProducts);
      
  
  //   }else{
  //     setProducts(originalProducts);
  //   }
    
  // }


  // // search with don't mutate the state 
  // const [searchKeyword , setSearchKeyword] = useState("");
  // function getSearchKeyword(keyword){
  //   setSearchKeyword(keyword);
  // }
  // function productsHandler(){
  //   if(searchKeyword.length){
  //     return products.filter(el => el.title.includes(searchKeyword))
  //   }
  //   return products
  // }

  


  
  return (
    <>
        

        {/* <div className='actions-btns mb-5 d-none'>
           <button type='button' className='btn btn-info w-100 mb-4' onClick={()=>refetch()}>Refetch Products</button>
          <button type='button' className='btn btn-info w-100' onClick={()=>queryClient.resetQueries("products")}>Reset Products</button>
        </div> */}

        
          {/* <Search getSearchKeyword={getSearchKeyword}/> */}

    
          {
              isLoading ? (
                <ProductCardLoading/>
              ) :  isError ? (
              <div className='alert alert-danger w-100'>{queryError.response.data.message}</div>
              ) : products?.length ? (
                products.map(item => <ProductCard key={item._id} product={item}/>)
              ): (<div className='alert alert-danger w-100'>no data found</div>)

          }

          {/* {
              isLoading ? (
                <ProductCardLoading/>
              ) :  error ? (
              <div className='alert alert-danger w-100'>{error.response.data.message}</div>
              ) : <ProductCard products={productsHandler()}/>
          } */}




    
    </>
  )
}

export default ProductsApi;
