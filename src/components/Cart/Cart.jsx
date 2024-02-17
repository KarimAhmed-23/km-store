import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { Helmet } from "react-helmet";
import { CartContext } from "../../context/cartContext/CartContext";
import CartBox from "./CartBox";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CartBoxLoading from "./CartBoxLoading";
import emptyCart from "../../assets/images/empty-cart.svg"
import SummaryBoxLoading from "./SummaryBoxLoading";

function Cart() {

  const { cartId , cartItems, setCartItems, getCart, removeFromCart , updateQty } = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  async function getCartItems() {
    let data = await getCart();
    setIsLoaded(true);
    console.log(data);
    if (data) {
      
      setCartProducts(data.data.products);
      setCartData(data);
      
    }else{
      setError("error , try again");
    }
  }

  async function removeCartItem(productId) {

    const data = await removeFromCart(productId);
    console.log(data);

    if (data) {
      setCartProducts(data.data.products);
      setCartData(data);
      toast.success("item deleted successfully");
    } else {
      toast.error("oops !! , something went wrong please try again");
    }
  }

  async function updateItemQty(productId , count){

    let data = await updateQty(productId , count);
    console.log(data);

    if(data){
      setCartProducts(data.data.products);
      setCartData(data);
      toast.info("item updated successfully");
    }else{
      toast.error("oops !! , something went wrong please try again");
    }

  }

  useEffect(() => {
    getCartItems();
  }, []);

  
  return (
    <>
      <Helmet>
        <title>FreshCart | Cart</title>
      </Helmet>

      <section className="section-style cart-section">
        <div className="container">
          
          {
            isLoaded && !cartProducts?.length && !error  ?  (

              <div className="empty-box d-flex align-items-center justify-content-center flex-column text-center gap-4">
                    <img src={emptyCart} alt="empty-box" width={150} height={150} loading="lazy"/>
                    <h2 className="mb-0 fw-bold">Your shopping cart is empty <br/> go and check out some products</h2>
                    <Link className="btn bg-main text-white px-5" to={"/products"}>
                      Shopping Now 
                    </Link>
                </div>
            ) : (

              <div className="row">
               <h1 className="main-title col-12">shop cart</h1>
                <div className="col-lg-8">
                  <div className="cart-items-area">
                    {!isLoaded && !error && 
                    
                      [...Array(5)].map((_ , index) => <CartBoxLoading key={index}/> )
                    
                    }
                   

                    {
                        cartProducts && cartItems  && (
                          cartProducts?.map((item) => (
                            <CartBox
                              key={item.product._id}
                              product={item}
                              cartItems={cartItems}
                              removeCartItem={removeCartItem}
                              updateItemQty = {updateItemQty}
                            />
                          )) )
                        
                      }
                    
                  </div>
                </div>
                <div className="col-lg-4">
                  {
                    !isLoaded && !error   ? (

                      <SummaryBoxLoading/>

                    ) : isLoaded && !error &&(
                      <div className="summary-box">
                        <div className="box-wrap box-head">
                          <h6 className="head-title">Order Summary</h6>
                          <div className="coupon-input input-group">
                                                
                                <input type="text" className="form-control" placeholder="Coupon Code" inputMode="tel"/>
                                <button className="btn bg-main text-white" type="button">Apply</button>

                            </div>
                        </div>
                        <div className="box-wrap box-body">
                          <ul className="order-details">
                            <li className="list-item">
                              <span className="name">Subtotal({cartData?.data.products.length} item)</span>
                              <span className="val"> {cartData ? `${cartData?.data.totalCartPrice} EGP`  : "loading..."}</span>

                            </li> 
                            <li className="list-item">
                              <span className="name">Coupon</span>
                              <span className="val discount">- 0 EGP</span>

                            </li> 
                            <li className="list-item">
                              <span className="name">Shipping price</span>
                              <span className="val free d-none">Free</span>
                              <span className="val">depend on address</span>

                            </li> 
                          </ul>
                        </div>
                        <div className="box-wrap box-footer">
                        <ul className="order-details">
                            <li className="list-item order-total">
                              <span className="name">Total (Incl. VAT)</span>
                              <span className="val text-main">{cartData ? `${cartData?.data.totalCartPrice} EGP`  : "loading..."}</span>

                            </li> 

                          </ul>
                          <Link to={"/checkout"}  className="btn w-100 text-white bg-main text-center mt-4">Checkout</Link>
                        </div>
                    </div>
                    )
                  }
                  
                </div>
            </div>
            )
          }
          {error &&  <div className="alert alert-danger w-100">{error}</div> }
          
        </div>
      </section>
    </>
  );
}

export default Cart;
