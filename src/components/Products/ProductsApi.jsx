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

    // cacheTime:3000, // control the cache data Time 
    // or
    //gcTime : 5 * (60*1000) 

    // refetchOnMount:false // control if we want to refetch on mount (compare with cashed res) or not 

    //The maximum time (in milliseconds) that cached data can be considered fresh before it's marked as stale and needs to be refetched.
    // staleTime:5000 //Consider data fresh for 5000 seconds
    
    // refetchInterval:1000 // control the time to refetch

    // refetchIntervalInBackground: true, // Refetch even when tab is in background

    // refetchOnReconnect: true, // Refetch query when network reconnects

    // refetchOnWindowFocus: true, // Refetch query when window/tab regains focus

    // retryOnMount: true, // Retry query if it contains an error when component mounts

    // retryDelay: attemptIndex => attemptIndex * 1000, // Delay between retry attempts

    // enabled:false, // control the query executed 

    // this value will be used as the initial data for the query cache (as long as the query hasn't been created or cached yet)
    //Initial data is considered stale by default unless a staleTime has been set and it is persisted to the cache
    // initialData: [], 

    // initialDataUpdatedAt: Date.now(), // Initial data update timestamp

    // Placeholder data to display temporary content while fetching the actual data and no initialData has been provided.is not  persisted to the cache
    // placeholderData: { name: 'Loading...' }, 


    //Array of props to watch for changes and trigger a refetch fn when they change.
    //If set, the component will only re-render if any of the listed properties change.
    // notifyOnChangeProps: ['userId'], 

    // If set, the component will not re-render if any of the listed properties change.
    // Exclude userId prop from triggering refetch
    // notifyOnChangePropsExclusions: ['userId'], 

    //Check if the newly fetched data is equal to the previously fetched data using custom function. Useful for optimizing re-renders.
    // isDataEqual: (oldData, newData) => JSON.stringify(oldData) === JSON.stringify(newData),

    // keepPreviousData:true , //keep the previous data while fetching new data. This can be useful for preserving UI state.

    // useErrorBoundary:true , wrap the query in an error boundary to catch and handle errors.

    // suspense: false, // use React Suspense for rendering while the query is fetching.

    // queryKeyHashFn: keys => keys.join('_'), // Customize how query keys are hashed

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

  const {data:cartData , isLoading:cartLoading , isError:cartISError , error:cartError , mutate , reset} =useMutation(addTOCard , {
    onSuccess:(data)=>{
    console.log(data);
     toast.success(data?.data?.message)
      // queryClient.invalidateQueries("key");
    },
    onError:(error)=>{
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
    },

    // before mutation executed
    //It's useful for performing actions or storing the previous state before the mutation executed.
    onMutate : (variables)=>{
      console.log(variables)
    },

    // after mutation completed (either successfully resolved or rejected)
    //It's useful for performing actions or cleanup after the mutation is completed.
    onSettled : (data , error , variables , context) =>{
      console.log(data , error , variables , context)
    },

    // Retry the mutation up to 3 times if there's a network error or (failed mutations | failed query)
    //If set to true, the mutation will automatically retry in case of a failed . You can also provide a custom function to determine when to retry.
    retry: 3, 

    // Wait for 1 second before retrying (delay between retry attempts)
    retryDelay: 1000, 

    //  Custom metadata attached to the mutation useful for passing information related to the mutation.
    meta : {info:"test"}, 
    
    // Key to identify the mutation
    mutationKey: 'mutateUpdateCartQty', 

    
      

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

      
    </>
  );
}

export default ProductsApi;





// data: The fetched data from the query.

// dataUpdatedAt: data last updated Timestamp.

// error: Error object if an error occurred during the query.

// errorUpdatedAt: data error last updated Timestamp .

// failureCount: Number of times the query has failed.

// isError: Boolean indicating if an error occurred during the query.

// isFetched: Boolean indicating whether the query has been fetched at least once.

// isFetchedAfterMount: Boolean indicating whether the query has been fetched after the component mounted.

// isFetching: Boolean indicating whether the query is currently fetching data.

// isIdle: Boolean indicating if the query is in an idle state (neither fetching nor being fetched).

// isLoading: Boolean indicating whether the query is currently loading .

// isLoadingError: Boolean indicating if the query failed while fetching for the first time.

// isPlaceholderData: Boolean indicating if the query is currently displaying placeholder data.

// isPreviousData: Boolean indicating if the query's data is the previous data (used when keepPreviousData is set).

// isRefetchError: Boolean indicating if the query failed while refetching.

// isRefetching: Boolean indicating if the query is currently refetching.

// isStale: Boolean indicating if the query's data is stale and needs to be refetched or data in cache is invalidated

// isSuccess: Boolean indicating if the query was successful.

// refetch: Function to manually refetch the query.

// remove: Function to manually remove the query from the cache.

// status: Current status of the query (idle, loading, error, success).




// queryKey: The key or array of keys used to identify the query. It's used to differentiate between different queries in the cache.

// queryFn: A function that returns a promise or asynchronous function that fetches the data for the query. This is typically where you perform your data fetching logic.


// cacheTime: 300000 The time in milliseconds that unused/inactive cache data remains in memory

// enabled: A boolean indicating whether the query should be enabled or disabled. If set to false, the query will not be executed.

// initialData: Initial data to be used while the query is fetching data for the first time.

// initialDataUpdatedAt: Timestamp indicating when the initial data was updated.

// isDataEqual: Custom function to determine if the newly fetched data is equal to the previously fetched data. Useful for optimizing re-renders.

// keepPreviousData: Boolean indicating whether to keep the previous data while fetching new data. and the previous data remains accessible until the new data arrives.

// meta: Additional metadata attached to the query.

// notifyOnChangeProps: Array of props to watch for changes and trigger a refetch when they change.

// notifyOnChangePropsExclusions: Array of props to exclude from the notifyOnChangeProps behavior.

// onError: Callback function called when an error occurs during the query.

// onSettled: Callback function called when the query settles (regardless of success or failure).

// onSuccess: Callback function called when the query is successful.

// placeholderData: Placeholder data to display while fetching the actual data.

// queryKeyHashFn: Function to customize how query keys are hashed for caching purposes.

// refetchInterval: Interval (in milliseconds) for automatically refetching the query.

// refetchIntervalInBackground: Boolean indicating whether to refetch the query on the defined interval even when the tab is in the background.

// refetchOnMount: Boolean indicating whether to refetch the query when the component mounts.

// refetchOnReconnect: Boolean indicating whether to refetch the query when the network reconnects.

// refetchOnWindowFocus: Boolean indicating whether to refetch the query when the window/tab regains focus.

// retry: Number of times to retry the query in case of a fetch error.

// retryOnMount: Boolean indicating whether to retry the query when the component mounts.

// retryDelay: Delay (in milliseconds) before retrying the query.

// select: Function to transform the data returned by the query.

// staleTime: The maximum time (in milliseconds) that cached data can be considered fresh before it's marked as stale and needs to be refetched.

// structuralSharing: Boolean indicating whether to share data structures between query instances.

// suspense: Boolean indicating whether to use React Suspense for rendering while the query is fetching.

// useErrorBoundary: Boolean indicating whether to wrap the query in an error boundary to catch and handle errors.
//throwOnError