import React from "react";
import { Helmet } from "react-helmet";
import useGetApi from "../../customHooks/UseGetApi";
import ProductCardLoading from "./ProductCardLoading";
import ProductsList from "./ProductsList";
import { useParams } from "react-router-dom";

 function Products() {
  const { id, categoryName } = useParams();

  const [data, isLoaded, error] = useGetApi(
    `https://ecommerce.routemisr.com/api/v1/products?${id ? `category[in]=${id}` : ''}`
  );
  const products = data?.data;

  return (
    <>
      <Helmet>
        <title>
          FreshCart | {categoryName?.split("+").join(" ") || "Products"}
        </title>
      </Helmet>

      <section className="section-style shop-section">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    defaultValue
                    aria-label="..."
                  />
                  filter checkbox
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    defaultValue
                    aria-label="..."
                  />
                  filter checkbox
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    defaultValue
                    aria-label="..."
                  />
                  filter checkbox
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    defaultValue
                    aria-label="..."
                  />
                  filter checkbox
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    defaultValue
                    aria-label="..."
                  />
                  filter checkbox
                </li>

                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    defaultValue
                    aria-label="..."
                  />
                  filter checkbox
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    defaultValue
                    aria-label="..."
                  />
                  filter checkbox
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    defaultValue
                    aria-label="..."
                  />
                  filter checkbox
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    defaultValue
                    aria-label="..."
                  />
                  filter checkbox
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    defaultValue
                    aria-label="..."
                  />
                  filter checkbox
                </li>
              </ul>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="products-wrapper">
                <div className="row row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-sm-2">
                  {!isLoaded ? (
                    [...Array(10)].map( ( _ , index) => <ProductCardLoading key={index} /> )
                  ) : error ? (
                    <div className="alert alert-danger w-100">
                      {error}
                    </div>
                  ) : (
                    products &&
                    (products.length ? (
                      <ProductsList products={products}  />
                    ) : (
                      <div className="alert alert-danger w-100">
                        no data found
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Products
