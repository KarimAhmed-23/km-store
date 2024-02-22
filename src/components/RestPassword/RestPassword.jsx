import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utilities/baseUrl";
import { AuthContext } from "../../context/authContext/AuthContext";
import { CartContext } from "../../context/cartContext/CartContext";
import PasswordInput from "../Login/PasswordInput";
import { toast } from "react-toastify";

function RestPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUserToken, setUserData } = useContext(AuthContext);
  const { getCart } = useContext(CartContext);
  const navigate = useNavigate();

  async function handleResetPassword(values) {
    setLoading(true);
    setError(null);
    try {
      let { data } = await axios.put(`${baseUrl}auth/resetPassword`, values);
      console.log(data);
      setLoading(false);
      toast.success("password change successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.response.data.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: handleResetPassword,
  });

  return (
    <>
      <Helmet>
        <title>FreshCart | Rest Password</title>
      </Helmet>
      <section className="section-style  sign-section forget-password-section">
        <div className="container">
          <form
            className="sign-form login-form mb-0"
            onSubmit={formik.handleSubmit}
          >
            <div className="form-head">
              <h2 className="form-title">Rest Password</h2>
              <p className="mb-0">enter your email and new password</p>
            </div>

            {error ? (
              <div className="alert alert-danger mb-4">{error}</div>
            ) : null}

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
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="newPassword">
                new password :
              </label>
              <PasswordInput>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  id="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  required
                />
              </PasswordInput>
            </div>

            <div className="btns-container">
              <button
                type="submit"
                className={`btn bg-main text-white loading-btn w-100 ${
                  loading ? "loading-overlay" : ""
                }`}
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

export default RestPassword;
