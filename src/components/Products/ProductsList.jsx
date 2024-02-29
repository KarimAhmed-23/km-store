import React from "react";
import ProductCard from "./ProductCard";
import useGetApi from "../../customHooks/UseGetApi";
import { baseUrl } from "../../utilities/baseUrl";

function ProductsList({ products }) {
  
  return (
    <>
      {products?.map((item) => (
        <ProductCard
          key={item._id}
          product={item}
        />
      ))}
    </>
  );
}

export default ProductsList;
