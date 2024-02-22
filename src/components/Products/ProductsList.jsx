import React from "react";
import ProductCard from "./ProductCard";
import useGetApi from "../../customHooks/UseGetApi";
import { baseUrl } from "../../utilities/baseUrl";

function ProductsList({ products }) {
  
  const [favItems, , , fetchData] = useGetApi(
    `${baseUrl}wishlist`,
    { headers: { token: localStorage.getItem("token") } },
    "withAuth"
  );

  return (
    <>
      {products?.map((item) => (
        <ProductCard
          key={item._id}
          product={item}
          favItems={favItems}
          reFetchFav={fetchData}
        />
      ))}
    </>
  );
}

export default ProductsList;
