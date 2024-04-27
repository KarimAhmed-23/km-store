import React from "react";
import { Link } from "react-router-dom";
import CatchImage from "../CatchImage";
import "./Brands.css";

function BrandCard({ brand }) {
  return (
    <div className="brand-wrap">
        <Link className="brand-card " to={`/products?brand=${brand._id}`}>
            <CatchImage
                notFoundStyle={<h2 className="fw-bold mb-0">Image Not Found</h2>}
            >
                <img
                className="w-100 img-fluid loading-img"
                src={brand.image || require("../../assets/images/test-img.jpg")}
                alt={brand.name}
                loading="lazy"
                />
            </CatchImage>
      </Link>
    </div>
  );
}

export default BrandCard;
