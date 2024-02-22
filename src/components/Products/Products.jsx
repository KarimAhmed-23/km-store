import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useGetApi from "../../customHooks/UseGetApi";
import ProductCardLoading from "./ProductCardLoading";
import ProductsList from "./ProductsList";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../utilities/baseUrl";
import handleUrlName from "../../utilities/handleUrlName";
import queryString from "query-string";
import emptyList from "../../assets/images/empty-cart.svg";

function Products() {
  const { pathname, search } = useLocation();
  const { id: categoryId, categoryName } = useParams();
  const x = useParams();
  const navigate = useNavigate();
  const queryParamsFromUrl = queryString.parse(search, {
    arrayFormat: "comma",
    parseBooleans: true,
    decode: true,
  });
  const [queryParams, setQueryParams] = useState({
    limit: queryParamsFromUrl.limit || 12,
    page: queryParamsFromUrl.page || "1",
    category: categoryId,
    ...queryParamsFromUrl,
  });
  const [priceRange, setPriceRange] = useState({
    from: queryParams["price[gte]"] || 1,
    to: queryParams["price[lte]"] || 1000000,
    change: false,
    submitted: false,
  });

  const [products, productsLoaded, productsError, productsRefetch] = useGetApi(
    `${baseUrl}products`,
    {
      params: queryParams,
    }
  );

  function applyFilters(filters) {
    setQueryParams({ ...queryParams, ...filters });
  }

  const [
    subcategories,
    subcategoriesLoaded,
    subcategoriesError,
    subcategoriesRefetch,
  ] = useGetApi(`${baseUrl}categories/${categoryId}/subcategories`);

  const [categories, categoriesLoaded, categoriesError, categoriesRefetch] =
    useGetApi(`${baseUrl}categories`);

  const [brands, brandsLoaded, brandsError, brandsRefetch] = useGetApi(
    `${baseUrl}brands`
  );

  useEffect(() => {
    if (products) {
      window.scroll(0, 0);
      productsRefetch();
      categoriesRefetch();
      subcategoriesRefetch();
      brandsRefetch();
    }
    const queryStringified = queryString.stringify(queryParams, {
      skipNull: true,
      skipEmptyString: true,
      encode: false,
      arrayFormat: "comma",
    });
    navigate(`${pathname}?${queryStringified}`);
    // console.log(queryStringified);
  }, [pathname, queryParams]);

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
            <div className="col-xl-3 col-lg-4 mt-1">
              <div
                className="accordion filters-accordion"
                id="accordionExample"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="true"
                      aria-controls="collapseFour"
                    >
                      categories
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingFour"
                  >
                    <div className="accordion-body">
                      <div className="body-checks">
                        {!categoriesLoaded &&
                          [...Array(5)].map((_, index) => (
                            <div
                              className="form-check skeleton-bar"
                              key={index}
                            ></div>
                          ))}

                        {categories && categoriesLoaded && (
                          <>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                value="All"
                                id="allCategories"
                                name="categories-checks"
                                defaultChecked={!queryParams.category}
                                onChange={() => {
                                  applyFilters({
                                    category: null,
                                  });
                                  navigate(`/products`);
                                }}
                                disabled={!productsLoaded}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="allCategories"
                              >
                                All
                              </label>
                            </div>
                            {categories?.data.map((item) => (
                              <div className="form-check" key={item._id}>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  value={item.name}
                                  id={item._id}
                                  name="categories-checks"
                                  onClick={() => {
                                    applyFilters({
                                      category: [item._id],
                                      page: "1",
                                    });
                                    navigate(
                                      `/products/${item._id}/${handleUrlName(
                                        item.name
                                      )}`
                                    );
                                  }}
                                  defaultChecked={queryString
                                    .stringify(queryParams)
                                    .includes(item._id)}
                                  disabled={!productsLoaded}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={item._id}
                                >
                                  {item.name}
                                </label>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {subcategories &&
                subcategoriesLoaded &&
                subcategories?.data.length ? (
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        sub categories
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                    >
                      <div className="accordion-body">
                        <div className="body-checks">
                          {!subcategoriesLoaded &&
                            [...Array(5)].map((_, index) => (
                              <div
                                className="form-check skeleton-bar"
                                key={index}
                              ></div>
                            ))}
                          {subcategories && (
                            <>
                              {subcategories?.data.map((item) => (
                                <div className="form-check" key={item._id}>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="subCategories-checks"
                                    value={item.name}
                                    id={item._id}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        applyFilters({
                                          category: Array.isArray(
                                            queryParams.category
                                          )
                                            ? [
                                                ...queryParams.category,
                                                item._id,
                                              ]
                                            : [queryParams.category, item._id],
                                          page: "1",
                                        });
                                      } else {
                                        applyFilters({
                                          category: queryParams.category.filter(
                                            (el) => el !== item._id
                                          ),
                                          page: "1",
                                        });
                                      }
                                    }}
                                    disabled={!productsLoaded}
                                    defaultChecked={queryString
                                      .stringify(queryParams)
                                      .includes(item._id)}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={item._id}
                                  >
                                    {item.name}
                                  </label>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      <p className="d-flex align-items-center gap-1 mb-0">
                        <span>Price (EGP)</span>
                      </p>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingTwo"
                  >
                    <div className="accordion-body">
                      <div className="price-wrap">
                        <input
                          type="tel"
                          value={priceRange.from}
                          min={1}
                          name="min"
                          className="form-control"
                          aria-label="min"
                          onChange={(e) =>
                            setPriceRange({
                              ...priceRange,
                              from: e.target.value,
                              change: true,
                            })
                          }
                          onBlur={(e) =>
                            !priceRange.from &&
                            setPriceRange({
                              ...priceRange,
                              from: e.target.min,
                            })
                          }
                        />
                        <span className="to">TO</span>
                        <input
                          type="tel"
                          value={priceRange.to}
                          name="max"
                          min={2}
                          className="form-control"
                          aria-label="max"
                          onChange={(e) =>
                            setPriceRange({
                              ...priceRange,
                              to: e.target.value,
                              change: true,
                            })
                          }
                          onBlur={(e) =>
                            !priceRange.to &&
                            setPriceRange({
                              ...priceRange,
                              to: e.target.min,
                            })
                          }
                        />

                        <div className="d-flex flex-column gap-1">
                          <button
                            className="btn btn-link p-0"
                            type="button"
                            onClick={() => {
                              applyFilters({
                                "price[gte]": priceRange.from,
                                "price[lte]": priceRange.to,
                                page: "1",
                              });
                              setPriceRange({
                                ...priceRange,
                                change: false,
                                submitted: true,
                              });
                            }}
                            disabled={priceRange.change ? false : true}
                          >
                            go
                          </button>
                          {(priceRange.submitted ||
                            queryParams["price[gte]"] ||
                            queryParams["price[lte]"]) && (
                            <button
                              className="btn btn-link p-0"
                              type="button"
                              onClick={() => {
                                applyFilters({
                                  "price[gte]": null,
                                  "price[lte]": null,
                                  page: "1",
                                });
                                setPriceRange({
                                  from: 1,
                                  to: 1000000,
                                  change: false,
                                  submitted: false,
                                });
                              }}
                            >
                              reset
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="true"
                      aria-controls="collapseThree"
                    >
                      brands
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingThree"
                  >
                    <div className="accordion-body">
                      <div className="body-checks">
                        {!brandsLoaded &&
                          [...Array(5)].map((_, index) => (
                            <div
                              className="form-check skeleton-bar"
                              key={index}
                            ></div>
                          ))}

                        {brands && brandsLoaded && (
                          <>
                            {brands?.data.map((item) => (
                              <div className="form-check" key={item._id}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={item.name}
                                  id={item._id}
                                  name="brands-checks"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      applyFilters({
                                        brand: Array.isArray(queryParams.brand)
                                          ? [...queryParams.brand, item._id]
                                          : queryParams.brand
                                          ? [queryParams.brand, item._id]
                                          : item._id,
                                        page: "1",
                                      });
                                    } else {
                                      if (
                                        Array.isArray(queryParams.brand) &&
                                        queryParams.brand.length > 1
                                      ) {
                                        applyFilters({
                                          brand: queryParams.brand.filter(
                                            (el) => el !== item._id
                                          ),
                                          page: "1",
                                        });
                                      } else {
                                        applyFilters({
                                          brand: null,
                                          page: "1",
                                        });
                                      }
                                    }
                                  }}
                                  defaultChecked={queryString
                                    .stringify(queryParams)
                                    .includes(item._id)}
                                  disabled={!productsLoaded}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={item._id}
                                >
                                  {item.name}
                                </label>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div
                className="d-flex  align-items-center gap-4  mb-5"
                style={{ justifyContent: "space-between" }}
              >
                <h3 className="products-title fw-bold mb-0">
                  {categoryName?.split("+").join(" ") || "Featured Products"}{" "}
                  {products && productsLoaded ? `(${products.results})` : ""}
                </h3>

                <div className="d-flex align-items-center gap-4">
                  <div className="form-group d-flex align-items-center gap-2">
                    <label
                      className="form-label flex-shrink-0 mb-0 fw-bold"
                      style={{ fontSize: "14px" }}
                      htmlFor="sortSelect"
                    >
                      Sort By
                    </label>
                    <select
                      className="form-select"
                      style={{ fontSize: "14px" }}
                      id="sortSelect"
                      onChange={(e) => {
                        applyFilters({
                          sort:
                            e.target.value === "default"
                              ? null
                              : e.target.value,
                          page: "1",
                        });
                      }}
                      value={queryParams.sort || "default"}
                    >
                      <option value="default">Default</option>
                      <option value="-price">Price: High to Low</option>
                      <option value="+price">Price: Low to High</option>
                    </select>
                  </div>

                  <div className="form-group d-flex align-items-center gap-2">
                    <label
                      className="form-label flex-shrink-0 mb-0 fw-bold"
                      style={{ fontSize: "14px" }}
                      htmlFor="displaySelect"
                    >
                      Display
                    </label>
                    <select
                      className="form-select"
                      style={{ fontSize: "14px" }}
                      id="displaySelect"
                      onChange={(e) => {
                        applyFilters({
                          limit: e.target.value,
                          page: "1",
                        });
                      }}
                      value={queryParams.limit || "12"}
                    >
                      <option value="12">12 items </option>
                      <option value="20">20 items </option>
                      <option value="30">30 items </option>
                      <option value="40">40 items </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="products-wrapper">
                <div className="row row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-sm-2">
                  {!productsLoaded ? (
                    [...Array(12)].map((_, index) => (
                      <ProductCardLoading key={index} />
                    ))
                  ) : productsError ? (
                    <div className="alert alert-danger w-100">
                      {productsError}
                    </div>
                  ) : (
                    products?.data &&
                    (products?.data.length ? (
                      <ProductsList products={products.data} />
                    ) : (
                      <div className="pt-4 d-flex flex-column gap-3 align-items-center text-center w-100">
                        <img
                          src={emptyList}
                          alt="empty"
                          width={200}
                          height={200}
                        />
                        <h2 className="mb-0 fw-bold text-main">
                          No Products Found
                        </h2>
                      </div>
                    ))
                  )}
                </div>

                {products && products?.data?.length ? (
                  <nav aria-label="Page navigation example">
                    <ul
                      className="pagination mb-0 mt-5 "
                      style={{ justifyContent: "center" }}
                    >
                      <li
                        className={`page-item ${
                          products.metadata.prevPage ? "" : "disabled"
                        }`}
                      >
                        <div
                          className="page-link cursor-pointer"
                          aria-label="Previous"
                          onClick={() => {
                            if (products.metadata.prevPage) {
                              applyFilters({
                                page: products.metadata.prevPage,
                              });
                            }
                          }}
                        >
                          <span aria-hidden="true">«</span>
                        </div>
                      </li>

                      {[...Array(products.metadata.numberOfPages)].map(
                        (_, index) => (
                          <li
                            className={`page-item ${
                              products.metadata.currentPage === index + 1
                                ? "active "
                                : ""
                            }`}
                            key={index}
                          >
                            <div
                              className="page-link cursor-pointer"
                              onClick={() => {
                                applyFilters({
                                  page: index + 1,
                                });
                              }}
                            >
                              {index + 1}
                            </div>
                          </li>
                        )
                      )}

                      <li
                        className={`page-item ${
                          products.metadata.nextPage ? "" : "disabled"
                        }`}
                      >
                        <div
                          className="page-link cursor-pointer"
                          aria-label="Next"
                          onClick={() => {
                            if (products.metadata.nextPage) {
                              applyFilters({
                                page: products.metadata.nextPage,
                              });
                            }
                          }}
                        >
                          <span aria-hidden="true">»</span>
                        </div>
                      </li>
                    </ul>
                  </nav>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
