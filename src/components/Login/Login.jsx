import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";
import { Helmet } from "react-helmet";
import { CartContext } from "../../context/cartContext/CartContext";
import PasswordInput from "./PasswordInput";

function Login() {
  const navigate = useNavigate();
  const { getCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUserToken, setUserData } = useContext(AuthContext);

  async function handleLogin(values) {
    try {
      setIsLoading(true);
      setError(null);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log(data);
      setIsLoading(false);
      localStorage.setItem("token", data.token);
      setUserToken(data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      setUserData(data.user);
      getCart();
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      
      if(error.response?.data?.message){
        setError(error.response.data.message);
      }else{
        setError(error.message);
        console.log(error.message);
      }


    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("email is required"),
    password: Yup.string().min(6).required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <Helmet>
        <title>FreshCart | Login</title>
      </Helmet>
      <section className="section-style  sign-section login-section">
        <div className="container">
          <form
            className="sign-form login-form mb-0"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="form-title">Login</h2>

            {error ? (
              <div className="alert alert-danger mb-4">{error}</div>
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
