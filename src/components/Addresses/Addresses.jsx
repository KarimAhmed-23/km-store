import React, { useEffect, useState } from "react";
import "./Addresses.css";
import useGetApi from "../../customHooks/UseGetApi";
import { baseUrl } from "../../utilities/baseUrl";
import AddressBox from "./AddressBox";
import AccountTabs from "../Account/AccountTabs";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AddressBoxLoading from "./AddressBoxLoading";
import EmptyAddresses from "./EmptyAddresses";
import { Helmet } from "react-helmet";
import LoadingBox from "../LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import actGetData from "../../store/general/act/actGetData";
import actGetAddresses from "../../store/addresses/act/actGetAddresses";

function Addresses() {
 
  const dispatch = useDispatch();
  const {addresses , isLoaded:isAddressesLoaded , error:addressesError} = useSelector((state) => state.addresses)
  console.log(addresses);
  useEffect(() => {
    const promise= dispatch(actGetAddresses());
    return()=>{
      promise.abort();
    }
  }, [dispatch]);



  return (
    <>
      <Helmet>
        <title>FreshCart | Addresses</title>
      </Helmet>
      <section className="section-style account-section">
        <div className="container">
          <div className="row gx-lg-5">
            <div className="col-lg-3">
              <AccountTabs active={"addresses"} />
            </div>
            <div className="col-lg-9">
              <div className="addresses-wrapper">
                <div className="wrapper-head">
                  <h1 className="wrapper-title">Addresses</h1>
                  <Link to={`/add-address`} className="btn bg-main text-white">
                    <i className="fa-solid fa-plus me-1"></i>
                    Add Address
                  </Link>
                </div>
                <div className="addresses-boxes">
                  <div className="boxes-wrapper">
                    <div className="row row-cols-xl-2 gy-4">
                      {!isAddressesLoaded && <LoadingBox text="addresses" />}
                      {addressesError && (
                        <div className="alert alert-danger w-100">
                          {addressesError}
                        </div>
                      )}
                      {addresses && isAddressesLoaded &&
                        (addresses.data.length ? (
                          addresses.data.map((item) => (
                            <AddressBox
                              key={item._id}
                              address={item}
                              
                            />
                          ))
                        ) : (
                          <EmptyAddresses imgWidth={150} imgHeight={150} />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Addresses;
