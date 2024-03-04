import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utilities/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import actForgetPassword from "../../store/auth/act/actForgetPassword";
import { useEffect } from "react";
import { removeAsyncStates } from "../../store/auth/authSlice";
import { useForgotPasswordMutation } from "../../store/api/authApi";

function ForgetPassword() {

  const navigate= useNavigate();
  const dispatch =useDispatch();

  const [forgetPassword , {isLoading , isError , error}] =  useForgotPasswordMutation();

  const formik = useFormik({
    initialValues :{
        email : ""
    },
    onSubmit:(values)=>{
      forgetPassword(values)
      .unwrap()
      .then(_=>{
        navigate("/verify-code")
      })
      .catch(error=>{
        console.log(error);
      })
    },
   }) ;
  

  useEffect(()=> {
    dispatch(removeAsyncStates());
  },[dispatch]);



  return (
    <>
      <Helmet>
        <title>FreshCart | Forget Password</title>
      </Helmet>
      <section className="section-style  sign-section forget-password-section">
        <div className="container">
          <form className="sign-form login-form mb-0" onSubmit={formik.handleSubmit}>
            <div className="form-head">
              <h2 className="form-title">Forget Password</h2>
              <p className="mb-0">Enter your email to reset password</p>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                email :
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                required
               
              />
              {isError ? (
                <div className="text-danger pt-2">{error.data.message}</div>
              ) : null}

              
            </div>

            <div className="btns-container">
              <button
                type="submit"
                className={`btn bg-main text-white loading-btn w-100 ${isLoading ? "loading-overlay" : ""}`}
              >
                Next
              </button>
              <p className="note-btn">
               <Link to="/login">back to login </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default ForgetPassword;
