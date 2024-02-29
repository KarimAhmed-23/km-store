import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../utilities/baseUrl";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import actDeleteAddresses from "../../store/addresses/act/actDeleteAddresses";

function AddressBox({
  address,
  activeAddress,
  selectAddress,
  setUpdate
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
   async function deleteAddress(addressId) {
    setLoading(true);
    dispatch(actDeleteAddresses(addressId)).unwrap()
    .then((data)=>{
      setLoading(false);
      toast.success(data.message);
    })
    .catch(data=>{
      setLoading(false);
      toast.error(data);
    });
  }


  return (
    <div className="box-wrap" key={address._id}>
      <div
        className={`address-box ${selectAddress ? "cursor-pointer" : ""} ${
          activeAddress === address._id ? "active" : ""
        }`}
        onClick={()=>{
          if(selectAddress){
            selectAddress(address._id , address);
          }
        }}
      >
        <div className="address-details">
          <p className="details-item fw-bold">{address.name}</p>
          <p className="details-item">{address.details}</p>
          <p className="details-item">{address.city}</p>
          <p className="details-item">{address.phone}</p>
        </div>

        {selectAddress ? (
          <Link
            to={`/edit-address/${address._id}`}
            type="button"
            className="btn edit-btn"
          >
            <i className="fa-solid fa-pen-to-square me-1"></i>
            edit
          </Link>
        ) : (
          <div className="address-actions">
            <Link
              to={`/edit-address/${address._id}`}
              type="button"
              className="btn bg-main text-white"
            >
              <i className="fa-solid fa-pen-to-square me-1"></i>
              edit
            </Link>
            <button
              type="button"
              className={`btn bg-danger text-white loading-btn ${loading ? "loading-overlay" : ""}`}
              onClick={() => deleteAddress(address._id)}
            >
              <i className="fa-solid fa-trash me-1"></i>
              delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddressBox;
