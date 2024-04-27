import axios from "axios";
import { useFormik } from "formik";
import React, { useState,useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utilities/baseUrl";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import actVerifyRestCode from "../../store/auth/act/actVerifyRestCode";
import { removeAsyncStates } from "../../store/auth/authSlice";
import { useVerifyResetCodeMutation, verifyResetCode } from "../../store/api/authApi";
import { useMutation } from "react-query";

function VerifyResetCode() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {mutate:mutateVerifyResetCode , isLoading, isError , error } = useMutation( verifyResetCode ,{
    onSuccess:({data})=>{
      navigate("/rest-password");
    },
    onError:(error)=>{
      console.log(error);
    }
  });

  const validationSchema = Yup.object({
    code1: Yup.number().required(),
    code2: Yup.number().required(),
    code3: Yup.number().required(),
    code4: Yup.number().required(),
    code5: Yup.number().required(),
    code6: Yup.number().required(),
  });

  const formik = useFormik({
    initialValues: {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
    },
    validationSchema,
    onSubmit: (values)=>{
      const verificationCode = `${values.code1}${values.code2}${values.code3}${values.code4}${values.code5}${values.code6}`;
      mutateVerifyResetCode(verificationCode);
    },
  });

  const moveFocus = (event, nextFieldName, prevFieldName) => {
    if (event.target.value.length === 0 && prevFieldName) {
      document.getElementById(prevFieldName).focus();
    } else if (event.target.value.length === 1 && nextFieldName ) {
      document.getElementById(nextFieldName).focus();
    }
  };

  useEffect(()=> {
    dispatch(removeAsyncStates());
  },[dispatch]);

  

  return (
    <>
      <Helmet>
        <title>Biod | Verify Code</title>
      </Helmet>
      <section className="section-style  sign-section forget-password-section">
        <div className="container">
          <form
            className="sign-form login-form mb-0"
            onSubmit={formik.handleSubmit}
          >
            <div className="form-head">
              <h2 className="form-title">Verify Code</h2>
              <p className="mb-0">reset code sent to your email</p>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="resetCode">
                code :
              </label>
            

              <div className="code-wrap">
                <input
                  className="form-control"
                  type="text"
                  name="code1"
                  id="code1"
                  maxLength={1}
                  autoFocus
                  onChange={(event) => {
                    formik.handleChange(event);
                    moveFocus(event, 'code2', null);
                    
                  }}
                  value={formik.values.code1}
                />
                <input
                  className="form-control"
                  type="text"
                  name="code2"
                  id="code2"
                  maxLength={1}
                  onChange={(event) => {
                    formik.handleChange(event);
                    moveFocus(event, 'code3', 'code1');
                  }}
                  value={formik.values.code2}
                />
                <input
                  className="form-control"
                  type="text"
                  name="code3"
                  id="code3"
                  maxLength={1}
                  onChange={(event) => {
                    formik.handleChange(event);
                    moveFocus(event, 'code4', 'code2');
                  }}
                  value={formik.values.code3}
                />
                <input
                  className="form-control"
                  type="text"
                  name="code4"
                  id="code4"
                  maxLength={1}
                  onChange={(event) => {
                    formik.handleChange(event);
                    moveFocus(event, 'code5', 'code3');
                  }}
                  value={formik.values.code4}
                />
                <input
                  className="form-control"
                  type="text"
                  name="code5"
                  id="code5"
                  maxLength={1}
                  onChange={(event) => {
                    formik.handleChange(event);
                    moveFocus(event, 'code6', 'code4');
                  }}
                  value={formik.values.code5}
                />
                <input
                  className="form-control"
                  type="text"
                  name="code6"
                  id="code6"
                  maxLength={1}
                  onChange={(event) => {
                    formik.handleChange(event);
                    moveFocus(event, 'code6', 'code5');
                  }}
                  value={formik.values.code6}
                />
              </div>

              {isError ? <div className="text-danger pt-2">{error.response.data.message}</div> : null}
            </div>

            <div className="btns-container">
              <button
                type="submit"
                className={`btn bg-main text-white loading-btn w-100 ${
                  isLoading ? "loading-overlay" : ""
                }`}
                disabled={!(formik.isValid && formik.dirty)}
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

export default VerifyResetCode;
