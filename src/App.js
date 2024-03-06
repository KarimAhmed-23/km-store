import React, {  Suspense , useEffect, useLayoutEffect, useState , lazy } from 'react'
import { RouterProvider , createBrowserRouter , createHashRouter, useLocation} from 'react-router-dom'
import Layout from './layouts/Layout';
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Products from './components/Products/Products'
import SingleProduct from './components/SingleProduct/SingleProduct'
import NotFound from './components/NotFound/NotFound'
import Cart from './components/Cart/Cart';
import Wishlist from './components/Wishlist/Wishlist';
import Account from './components/Account/Account';
import AuthContextProvider from './context/authContext/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";
import { Offline, Online } from "react-detect-offline";
import { switchLoader } from './customHooks/switchLoader';
import CartContextProvider from './context/cartContext/CartContext';
import { ToastContainer} from 'react-toastify';
import Checkout from './components/Checkout/Checkout';
import Addresses from './components/Addresses/Addresses';
import EditAddress from './components/Addresses/EditAddress';
import AddAddress from './components/Addresses/AddAddress';
import AllOrders from './components/Orders/AllOrders';
import WishlistContextProvider from './context/wishlistContext/WishlistContext';
import ForgetPassword from './components/RestPassword/ForgetPassword';
import VerifyResetCode from './components/RestPassword/VerifyResetCode';
import RestPassword from './components/RestPassword/RestPassword';
import ProductsApi from './components/Products/ProductsApi'
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import { checkAuth } from './store/auth/authSlice';





function App() {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  const queryClient = new QueryClient();

  const routes =  createBrowserRouter([

    { path:"/" ,
      element : <Layout/> , 
      children:
      [

        {index:true , element: <Home/> },
        {path:"/login" , element: <Login/> },
        {path:"/forget-password" , element: <ForgetPassword/> },
        {path:"/verify-code" , element: <VerifyResetCode/> },
        {path:"/rest-password" , element: <RestPassword/> },
        {path:"/register" , element: <Register/> },
        {path:"/products" , element: <Products/>},
        {path:"/products/:id/:categoryName/*" , element: <Products/> },

        
        {
          path:"/product/:id/:productName" ,
          element: <SingleProduct/> ,
          loader: ({ params, request }) => {
            return switchLoader(`https://ecommerce.routemisr.com/api/v1/products/${params.id}` , null ); 
          },
        },
        {path:"/cart" , element: <ProtectedRoute> <Cart/> </ProtectedRoute> },
        {path:"/checkout" , element:<ProtectedRoute> <Checkout/> </ProtectedRoute> },
        {path:"/wishlist" , element: <ProtectedRoute> <Wishlist/> </ProtectedRoute> },
        {path:"/account" , element:<ProtectedRoute> <Account/> </ProtectedRoute> },
        {path:"/addresses" , element:<ProtectedRoute> <Addresses/> </ProtectedRoute> },
        {path:"/add-address/" , element:<ProtectedRoute> <AddAddress/> </ProtectedRoute> },
        {path:"/edit-address/:id" , element:<ProtectedRoute> <EditAddress/> </ProtectedRoute> },
        {path:"/allorders" , element:<ProtectedRoute> <AllOrders/> </ProtectedRoute> },
        {path:"test" , element : <ProductsApi/> },
        {path:"*" , element : <NotFound/> }

      ]
    }

  ]);
  


  

  return (
    <>


    <QueryClientProvider client={queryClient}>

      <AuthContextProvider>
          
        <CartContextProvider>

        
        <WishlistContextProvider>

              <RouterProvider router={routes}/> 

        </WishlistContextProvider>
            

        </CartContextProvider>
      
        
      </AuthContextProvider>

      <ReactQueryDevtools initialIsOpen="false" position="bottom-right" />

    </QueryClientProvider>

    <ToastContainer theme='colored' autoClose={2500} closeOnClick={true} icon={false} position="bottom-right"/>

    <Offline>
      <div className='offline'>
        You Are Offline
      </div>
    </Offline>

    </>
  );
}

export default App;
