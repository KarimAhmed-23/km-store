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

function Account() {
  const { userData, setUserData } = useContext(AuthContext);
  const [updateLoading, setUpdateLoading] = useState(false);
  const userObj = localStorage.getItem("userData") !== "undefined" ? JSON.parse(localStorage.getItem("userData")) : "";

  console.log(userData);

  async function updateProfile(values, { resetForm }) {
    setUpdateLoading(true);
    try {
      let { data } = await axios.put(`${baseUrl}users/updateMe`, values, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUpdateLoading(false);

      localStorage.setItem("userData", JSON.stringify(data.user));
      setUserData(data.user);
      toast.success("profile updated successfully");
      resetForm();  
      
    } catch (error) {
      console.log(error);
      setUpdateLoading(false);
      toast.error("oops !! , something went wrong please try again");
    }
  }
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
    
    onSubmit: (values, { resetForm }) => updateProfile(values, { resetForm }),
  });

useEffect(() => {

  // if(userData){
  //   formik.setValues({
  //     name: typeof userData === "string" ?  JSON.parse(userData)?.name : userData?.name ,
  //     phone: typeof userData === "string" ?  JSON.parse(userData)?.phone || "01228594886" : userData?.phone || "01228594886",
  //   });
  //   formik.setTouched({});  
    
  // }
  
  
}, [userData , setUserData]);



  return (
    <>
      <Helmet>
        <title>FreshCart | My Account</title>
      </Helmet>

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
