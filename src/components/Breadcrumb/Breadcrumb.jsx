import React from "react";
import "./Breadcrumb.css";
import { Link } from "react-router-dom";

function Breadcrumb({ data }) {
  return (
    <section className="breadcrumb-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="breadcrumb-nav" aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>

                {data?.map((el , idx) => (
                  el.name ? (
                    <li className={`breadcrumb-item ${el.link ? "" : "active"}`} key={idx}>
                    {el.link ? <Link to={el.link}>{el.name}</Link> : el.name}
                  </li>
                  ): null
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Breadcrumb;
