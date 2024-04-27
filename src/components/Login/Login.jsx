import React, { useContext, useState ,useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";
import { Helmet } from "react-helmet";
import { CartContext } from "../../context/cartContext/CartContext";
import PasswordInput from "./PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import actLogin from "../../store/auth/act/actLogin";
import { removeAsyncStates, setUserData, setUserId, setUserToken } from "../../store/auth/authSlice";
import { login, useLoginMutation } from "../../store/api/authApi";
import { useMutation } from "react-query";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {mutate:mutateLogin , isLoading, isError , error } = useMutation(login,{
    onSuccess:({data})=>{
      dispatch(setUserToken(data));
      dispatch(setUserData(data));
      dispatch(setUserId(data));
      navigate("/" , {replace:true});
    },
    onError:(error)=>{
      console.log(error);
    }
  });


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values)=> mutateLogin(values) ,
  });


  useEffect(()=> {
    dispatch(removeAsyncStates());
  },[dispatch]);


  return (
    <>
      <Helmet>
        <title>Biod | Login</title>
      </Helmet>
      <section className="section-style  sign-section login-section">
        <div className="container">
          <form
            className="sign-form login-form mb-0"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="form-title">Login</h2>

            {isError ? (
              <div className="alert alert-danger mb-4">{error.response.data.message}</div>
            ) : null}

            <div className="form-group ">
              <label className="form-label" htmlFor="email">
                email :
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                required
              />

              {formik.errors.email && formik.touched.email ? (
                <div className="text-danger pt-2">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                password :
              </label>
              <PasswordInput>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  required
                />
              </PasswordInput>

              <Link
                className="mt-2 d-inline-block forget-pass"
                to={"/forget-password"}
              >
                Forget Password ?{" "}
              </Link>

              {formik.errors.password && formik.touched.password ? (
                <div className="text-danger pt-2">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="btns-container">
              <button
                type="submit"
                className={`btn bg-main text-white loading-btn w-100 ${
                  isLoading ? "loading-overlay" : ""
                }`}
              >
                Login
              </button>
              <p className="note-btn">
                Don't have an account ? <Link to="/register">Register Now</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
