import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productsSearchList } from "../../constant";
import ProductCard from "../Products/ProductCard";
import ProductsList from "../Products/ProductsList";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import emptyList from "../../assets/images/empty-cart.svg"

function GeneralSearch() {
  const searchKeyword = useSelector((state) => state.general.searchKeyword);
  const navigate = useNavigate();

  const products =
    searchKeyword &&
    productsSearchList.filter(
      (el, index) =>
        el.title
          .toLocaleLowerCase()
          .includes(searchKeyword.toLocaleLowerCase()) ||
        el.description
          .toLocaleLowerCase()
          .includes(searchKeyword.toLocaleLowerCase())
    );


  const rowGrid = products?.length % 2 ? "row-grid" : "";

  useEffect(() => {
    if (!searchKeyword) {
      navigate("/");
      return;
    }

    window.scrollTo(0,0);

  }, [searchKeyword]);


  

  console.log(products);

  return (
    <>
      <Helmet>
        <title>FreshCart | Search</title>
      </Helmet>

      <Breadcrumb
        data={[
          {
            name: "search",
            link: null,
          },
        ]}
      />

      <section className="section-style search-products products-section shop-section">
        <div className="container">
          <h3 className="products-title fw-bold text-capitalize mb-sm-5 mb-4">
            results for{" "}
            <span className="text-main d-inline-block">{searchKeyword} </span>{" "}
            {products?.length ? (
              <small
                className="text-muted d-inline-block"
                style={{ fontSize: ".875rem" }}
              >
                ({products?.length} result)
              </small>
            ) : null}
          </h3>
          <div className="products-wrapper">
            <div className={`row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 ${rowGrid}`}>
              {products?.length ? (
                <ProductsList products={products} />
              ) : (
                <div
                  className="products-empty py-4 px-3 d-flex flex-column gap-3 align-items-center text-center w-100 mx-auto w-100"
                >
                  <img src={emptyList} alt="empty" width={200} height={200} />
                  <h2 className="mb-0 fw-bold text-main">No Products Found</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GeneralSearch;
