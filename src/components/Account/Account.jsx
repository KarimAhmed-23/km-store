import React, { useContext, useEffect, useState } from "react";
import "./Account.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useFormik } from "formik";
import axios from "axios";
import { baseUrl } from "../../utilities/baseUrl";
import { toast } from "react-toastify";
import useGetApi from "../../customHooks/UseGetApi";
import AddressBox from "../Addresses/AddressBox";
import AccountTabs from "./AccountTabs";
import { useDispatch, useSelector } from "react-redux";
import actUpdateProfile from "../../store/auth/act/actUpdateProfile";
import { removeAsyncStates, setUserData } from "../../store/auth/authSlice";
import { updateProfile, useUpdateProfileMutation } from "../../store/api/authApi";
import { useMutation } from "react-query";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

function Account() {
  
  const dispatch = useDispatch();
  const {userData} = useSelector((state=>state.auth));
  // const [ updateProfile , {isLoading:updateLoading}] = useUpdateProfileMutation();

  const {mutate:mutateUpdateProfile , isLoading:updateLoading} = useMutation(updateProfile,{
    onSuccess:({data})=>{
      dispatch(setUserData(data));
      toast.success("profile updated successfully");
    },
    onError:(error)=>{
      console.log(error);
      toast.error("oops !! , something went wrong please try again");
    }
  })


  const formik = useFormik({
    initialValues: {
      name: typeof userData === "string" ?  JSON.parse(userData)?.name : userData?.name,
      phone: typeof userData === "string" ?  JSON.parse(userData)?.phone || "01228594886" : userData?.phone || "01228594886",
    },
    enableReinitialize:true,
    validate: (values) => {
      let errors = {};
      if (!values.name) {
        errors.name = "name is required";
      }

      if (!values.phone) {
        errors.phone = "phone is required";
      } else if (!/^(002)?01[0125][0-9]{8}$/.test(values.phone)) {
        errors.phone = "Invalid phone";
      }

      return errors;
    },
    
    onSubmit: (values) => mutateUpdateProfile(values),
  });

  useEffect(()=>{
    dispatch(removeAsyncStates());
  },[dispatch]);


  return (
    <>
      <Helmet>
        <title>Biod | My Account</title>
      </Helmet>


      <Breadcrumb
        data={[
          {
            name: "account",
            link: null,
          }
        ]}
      />

      <section className="section-style account-section">
        <div className="container">
          <div className="row gx-lg-5">
            <div className="col-lg-3">
              <AccountTabs active={"account"}/>
            </div>
            <div className="col-lg-9">
              <div className="account-wrapper">
                <div className="wrapper-head">
                  <h1 className="wrapper-title">Profile Info</h1>
                </div>
                <div className="profile-info">
                  <form className="profile-form" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="name"
                      />
                      {formik.errors.name && formik.touched.name && (
                        <div className="mt-2 text-danger">
                          {formik.errors.name}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        disabled
                        readOnly
                        value={typeof userData === "string" ?  JSON.parse(userData)?.email : userData?.email}
                        name="email"
                       
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="phone"
                      />
                      {formik.errors.phone && formik.touched.phone && (
                        <div className="mt-2 text-danger">
                          {formik.errors.phone}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className={`btn bg-main text-white text-center py-2 px-4 loading-btn ${
                        updateLoading ? "loading-overlay" : ""
                      }`}
                      disabled={!(formik.isValid && formik.dirty)}
                    >
                      Update Profile
                    </button>
                  </form>
                </div>

                      
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Account;
