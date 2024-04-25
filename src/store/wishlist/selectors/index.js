export const checkProductFavSelector = createSelector(
    (state, productId) => productId,
    (state) => state.wishlist.wishlistProductsID,
    (productId, wishlistProductsID) => {
      console.log("from wishlist");
      const result = wishlistProductsID?.some(el => el === productId);
      return result;
    }
);