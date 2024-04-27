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
import { getAddresses, useGetAddressesQuery } from "../../store/api/apiSlice";
import { useQuery } from "react-query";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

function Addresses() {
  const {
    data: addresses,
    isLoading: addressesLoading,
    error: addressesError,
    isError,
  } = useQuery(["getAddresses"], getAddresses, {
    select: (data) => data.data,
  });

  return (
    <>
      <Helmet>
        <title>Biod | Addresses</title>
      </Helmet>

      <Breadcrumb
        data={[
          {
            name: "addresses",
            link: null,
          }
        ]}
      />

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
                      {addressesLoading && <LoadingBox text="addresses" />}
                      {isError && (
                        <div className="alert alert-danger w-100">
                          {addressesError?.data?.message}
                        </div>
                      )}
                      {addresses &&
                        !addressesLoading &&
                        (addresses.data.length ? (
                          addresses.data.map((item) => (
                            <AddressBox key={item._id} address={item} />
                          ))
                        ) : (
                          <div className="w-100"><EmptyAddresses imgWidth={150} imgHeight={150} /></div>
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
