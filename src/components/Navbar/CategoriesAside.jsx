import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGetApi from "../../customHooks/UseGetApi";
import { baseUrl } from "../../utilities/baseUrl";
import axios from "axios";
import handleUrlName from "../../utilities/handleUrlName";

function CategoriesAside({children}) {

  const userData = JSON.parse(localStorage.getItem("userData"));
  const [openDetails, setOpenDetails] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [mainCategory, setMainCategory] = useState(null);
  const [subcategories, setSubCategories] = useState(null);
  const [loading, setLoading] = useState(false);


  const asideBtn = React.cloneElement(children , {
    onClick : ()=> setShowPanel(!showPanel),
  })

  const [categories, categoriesLoaded, categoriesError] = useGetApi(
    `${baseUrl}categories`
  );

  async function getCategory(category) {
    setLoading(true);
    setOpenDetails(true);
    try {
      let { data } = await axios.get(
        `${baseUrl}categories/${category._id}/subcategories`
      );
      console.log(data);
      setLoading(false);
      setMainCategory(category);
      setSubCategories(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  return (
    <>
      {asideBtn}
      <aside className={`categories-aside  ${showPanel ? "active" : ""}`}>
        <div className="aside-panel">
          <div className="panel-top">
            <div className="user-info">
              Hi Dear {userData && `, ${userData.name.split(" ").splice(0, 1).join(" ")}` }
            </div>
            <button
              type="button"
              className="btn close-btn"
              onClick={() => setShowPanel(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="panel-body">
            <div className="menu-list main-list">
              <div className="list-wrap">
                <h4 className="menu-title">all categories</h4>
                {!categoriesLoaded && (
                  <ul className="list-items skeleton">
                    {[...Array(8)].map((_, index) => (
                      <li className="item-li skeleton-bar" key={index}></li>
                    ))}
                  </ul>
                )}
                {categories && (
                  <ul className="list-items">
                    {categories?.data.map((item) => (
                      <li
                        key={item._id}
                        className="item-li"
                        onClick={() => getCategory(item)}
                      >
                        <div className="item-link">
                          <span>{item.name}</span>
                          <i className="fa-solid fa-chevron-right"></i>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div
              className={`menu-list details-list ${
                openDetails ? "active" : ""
              }`}
            >
              <div className="list-wrap">
                <button
                  type="button"
                  className="back-btn btn"
                  onClick={() => setOpenDetails(false)}
                >
                  <span>
                    <i className="fa-solid fa-arrow-left-long"></i>
                  </span>
                  Home
                </button>
              </div>
              <div className="list-wrap">
                {loading && (
                  <ul className="list-items skeleton">
                    {[...Array(8)].map((_, index) => (
                      <li className="item-li skeleton-bar" key={index}></li>
                    ))}
                  </ul>
                )}
                {subcategories && !loading && (
                  <>
                    <h4 className="menu-title">{mainCategory.name}</h4>
                    <ul className="list-items">
                      <li className="item-li">
                        <Link
                          className="item-link"
                          to={`/categories/${mainCategory._id}/${handleUrlName(
                            mainCategory.name
                          )}`}
                          onClick={() => setShowPanel(false)}
                        >
                          <span>All {mainCategory.name}</span>
                          <i className="fa-solid fa-chevron-right"></i>
                        </Link>
                      </li>
                      {subcategories?.data.map((item) => (
                        <li className="item-li" key={item._id}>
                          <Link
                            className="item-link"
                            to={`/categories/${item._id}/${handleUrlName(
                              item.name
                            )}`}
                            onClick={() => setShowPanel(false)}
                          >
                            <span>{item.name}</span>
                            <i className="fa-solid fa-chevron-right"></i>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="aside-overlay"
          onClick={() => setShowPanel(false)}
        ></div>
      </aside>
    </>
  );

}

export default CategoriesAside;
