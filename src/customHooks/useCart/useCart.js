async function getCartItems() {
  let data = await getCart();
  setIsLoaded(true);
  console.log(data);
  if (data?.data?.status === "success") {
    setCartProducts(data.data.data.products);
    setCartData(data.data);
  } else {
    if (!data?.response?.data?.statusMsg) {
      setError("error , try again");
    }
  }
}

async function addProductToCart(productId) {
  setCartBtnLoading(true);
  const { data, errorMsg } = await addToCart(productId);
  console.log(data);

  if (data) {
    setCartBtnLoading(false);
    toast.success(data.message);
  } else {
    setCartBtnLoading(false);
    toast.error(errorMsg);
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

async function updateItemQty(productId, count) {
  let data = await updateQty(productId, count);
  console.log(data);

  if (data) {
    setCartProducts(data.data.products);
    setCartData(data);
    toast.info("item updated successfully");
  } else {
    toast.error("oops !! , something went wrong please try again");
  }
}



