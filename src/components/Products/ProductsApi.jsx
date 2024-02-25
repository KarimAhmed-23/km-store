import React, { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductCardLoading from './ProductCardLoading';
import useGetApi from '../../customHooks/UseGetApi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Search from '../Search';
import {ReactQueryDevtools} from "react-query/devtools";
import CatchImage from '../CatchImage';
import { toast } from 'react-toastify';

 function ProductsApi() {

  const queryClient = useQueryClient();

  const [searchedProducts , setSearchedProducts] = useState([]);
  const [searchKeyword , setSearchKeyword] = useState(null);
  const [debounce , setDebounce] = useState(null);

  // function getProducts(){
  //   return  axios.get("https://ecommerce.routemisr.com/api/v1/products?category[in]=6439d2d167d9aa4ca970649f&limit=30");
  // }


  const {isLoading , isError , error:queryError   , isFetching , data , refetch } = useQuery("products" , ()=>{
    return  axios.get("https://ecommerce.routemisr.com/api/v1/products?category[in]=6439d2d167d9aa4ca970649f&limit=30");
  } , {

    // cacheTime:3000, // control the cacheTime

    // refetchOnMount:false // control if we want to refetch (compare with cashed res) or not 

    // staleTime:5000 // control the time we want to show old cashed res and then refetchOnMount or updates
    // The time in milliseconds after data is considered stale

    // refetchInterval:1000 // control the time to refetch

    // refetchOnWindowFocus :false,

    // refetchOnReconnect : true ,

    // enabled:false,

    select:(data) => data?.data?.data

  });

  const {data:brands} = useQuery("brands" , ()=>{
    return  axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  });


  function addTOCard(productId){
    return  axios.post("https://ecommerce.routemisr.com/api/v1/cart" , {
      productId
    } ,{
      headers:{
        token:localStorage.getItem("token")
      }
    });
  }

  const {data:cartData , isLoading:cartLoading , isError:cartISError , error:cartError , mutate} =useMutation(addTOCard , {
    onSuccess:(data)=>{
    console.log(data);
     toast.success(data?.data?.message)
      // queryClient.invalidateQueries("key");
    },
    onError:(error)=>{
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
    }
  });


  

  
  
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

  
function search(e){
  clearTimeout(debounce);
  let term = e.target.value.toLowerCase().trim();
  setDebounce(setTimeout(() => {

      setSearchKeyword(term);

      const searchProducts = data.filter((el) =>  el.title.toLowerCase().includes(term));
      setSearchedProducts(searchProducts);

      if(searchProducts.length){

      }else{
        console.log("no found")
      }
      
    }, 500)
  )
}

  
  return (
    <>
      <div className="container">
        <div className="actions-btns my-5">
          <button
            type="button"
            className="btn bg-main text-white w-100 mb-4"
            onClick={() => refetch()}
          >
            Refetch Products
          </button>
          <button
            type="button"
            className="btn btn-danger w-100"
            onClick={() => queryClient.resetQueries("products")}
          >
            Reset Products
          </button>
        </div>

        <div className='form-group p-4 bg-main-light '>
           <input className='form-control' type='text'  placeholder='search....' onChange={search} />
        </div>
        <div className="row row-cols-lg-5 my-5">
          
         

          {isLoading && (
            <div
              className="text-center col-12 w-100 text-main"
              style={{ fontSize: "100px" }}
            >
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            </div>
          )}

          {isError && (
            <div className="alert alert-danger w-100">
              {queryError.response.data.message}
            </div>
          )}

          {searchedProducts.length ? (
            searchedProducts.map(product => (
              <ProductCard product={product} key={product._id}/>
            ))
          ) : searchKeyword && (
            <h2 className='fw-bold w-100 text-center' style={{textTransform:"capitalize"}}>no result found for {searchKeyword}</h2>
          )}

              

         { data && !searchKeyword && !searchedProducts.length && (
            data?.length ? (
              data.map((product) => (
                <div className="product-wrap" key={product._id}>
                  <div className="product product-card ">
                    <Link
                      className="product-img"
                      to={`/product/${product._id}/${product.title
                        .replace(/[^\w\s\-]/gi, "")
                        .replace(/\s+/g, "+")}`}
                    >
                      <CatchImage
                        loadingStyle={
                          <i className="fa-solid fa-spinner fa-spin"></i>
                        }
                        notFoundStyle={
                          <h2 className="fw-bold mb-0">Image Not Found</h2>
                        }
                      >
                        <img
                          className={`img-fluid loading-img`}
                          src={
                            product.imageCover ||
                            require("../../assets/images/test-img.jpg")
                          }
                          alt={product.title}
                          loading="lazy"
                        />
                      </CatchImage>
                    </Link>
                    <div className="product-body">
                      <div className="product-titles">
                        <span className="product-category">
                          {product.category.name}
                        </span>
                        <h5 className="product-name">
                          <Link
                            to={`/product/${product._id}/${product.title
                              .replace(/[^\w\s\-]/gi, "")
                              .replace(/\s+/g, "+")}`}
                          >
                            {product.title}
                          </Link>
                        </h5>
                      </div>
                      <div className="product-info">
                        <div className="product-price">{product.price} EGP</div>
                        <div className="product-rate">
                          <i className="fa-solid fa-star rating-color"></i>
                          <span>{product.ratingsAverage}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {mutate(product._id)}}
                        type="button"
                        role="add to card"
                        className={`btn bg-main text-white text-center w-100 card-btn loading-btn ${
                          cartLoading ? "loading-overlay" : ""
                        }`}
                        disabled={cartLoading}
                      >
                        {cartLoading ? "loading..." : "Add To Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-danger w-100">no data found</div>
            )
          )}
          
        </div>
      </div>

      <ReactQueryDevtools initialIsOpen="false" position="bottom-right" />
    </>
  );
}

export default ProductsApi;
