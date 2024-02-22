import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utilities/baseUrl";

function ForgetPassword() {

   const [loading , setLoading]=useState(false);
   const [error , setError] = useState(null);
   const navigate= useNavigate();

   async function handleForgetPassword(values){
    setLoading(true);
    setError(null);
    try {
        let {data} = await axios.post(`${baseUrl}auth/forgotPasswords` , values);
        console.log(data);
        setLoading(false);
        navigate('/verify-code')
        
    } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error.response.data.message);
    }


   } 
  
   const formik = useFormik({
    initialValues :{
        email : ""
    },
    onSubmit:handleForgetPassword,
   }) ;



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
              {error ? (
                <div className="text-danger pt-2">{error}</div>
              ) : null}

              
            </div>

            <div className="btns-container">
              <button
                type="submit"
                className={`btn bg-main text-white loading-btn w-100 ${loading ? "loading-overlay" : ""}`}
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
