import React, {  Suspense , useState } from 'react'
import { RouterProvider , createBrowserRouter , useLocation} from 'react-router-dom'
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




function App() {

  const queryClient = new QueryClient();
  const routes =  createBrowserRouter([

    { path:"/" ,
      element : <Layout/> , 
      children:
      [

        {index:true , element: <Home/> },
        {path:"/login" , element: <Login/> },
        {path:"/register" , element: <Register/> },
        {path:"/products" , element: <Products/> },
        {path:"/categories/:id/:categoryName" , element: <Products/> },
        {
          path:"/products/:id/:productName" ,
          element: <SingleProduct/> ,
          loader: ({ params, request }) => {
            console.log(params);
            console.log(request);
            return switchLoader(`https://ecommerce.routemisr.com/api/v1/products/${params.id}`); 
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


      <ToastContainer theme='colored' autoClose={2500} closeOnClick={true} icon={false} position="bottom-right"/>
      
      {/* <ReactQueryDevtools initialIsOpen="false" position='bottom-right'/> */}

    </QueryClientProvider>

    {/* <Offline>
      <div className='offline'>
        you are offline
      </div>
    </Offline> */}

    </>
  );
}

export default App;
