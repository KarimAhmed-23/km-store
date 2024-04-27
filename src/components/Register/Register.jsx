import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Helmet } from "react-helmet";
import PasswordInput from "../Login/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import actRegister from "../../store/auth/act/actRegister";
import { removeAsyncStates, setInputsError } from "../../store/auth/authSlice";
import { register, useRegisterMutation } from "../../store/api/authApi";
import { useMutation } from "react-query";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { inputsError } = useSelector((state) => state.auth);
  // const [register, { isLoading, isError, error , reset }] = useRegisterMutation();

  const {mutate:mutateRegister , isLoading , isError , error , reset  } = useMutation(register,{
    onMutate:(values)=>{
      dispatch(setInputsError({}));
      
    },
    onSuccess :({data})=>{
      navigate("/login");
      dispatch(setInputsError({}));
    },
    onError:(error)=>{
      console.log(error);
      if (error.response.data.errors) {
        let errors = {};
        let { param, msg } = error.response.data.errors;
        errors[param] = msg;
        dispatch(setInputsError(errors));
      }
      
    }

  })

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "name at least 3 least").required(),
    email: Yup.string().email("Invalid email").required(),
    phone: Yup.string().required(),
    password: Yup.string().min(6, "password at least 6 characters").required(),
    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "rePassword does not match")
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => mutateRegister(values),
  });

  useEffect(() => {
    dispatch(removeAsyncStates());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Biod | Register</title>
      </Helmet>
      <section className="section-style  sign-section register-section">
        <div className="container">
          <form
            className="sign-form register-form mb-0"
            onSubmit={formik.handleSubmit}
          >
            <h3 className="form-title">Register Now</h3>

            {error && !error?.response?.data?.errors  ? <div className="alert alert-danger ">{error?.response?.data?.message}</div> : null}

            <div className="form-group ">
              <label className="form-label" htmlFor="name">
                name :
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
              />
              {!inputsError.name &&
              formik.errors.name &&
              formik.touched.name ? (
                <div className="text-danger pt-2">{formik.errors.name}</div>
              ) : null}
              {inputsError.name ? (
                <div className="text-danger pt-2">{inputsError.name}</div>
              ) : null}
            </div>

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
              />

              {!inputsError.email &&
              formik.errors.email &&
              formik.touched.email ? (
                <div className="text-danger pt-2">{formik.errors.email}</div>
              ) : null}
              {inputsError.email ? (
                <div className="text-danger pt-2">{inputsError.email}</div>
              ) : null}
            </div>

            <div className="form-group ">
              <label className="form-label" htmlFor="phone">
                phone :
              </label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                id="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
              />

              {!inputsError.phone &&
              formik.errors.phone &&
              formik.touched.phone ? (
                <div className="text-danger pt-2">{formik.errors.phone}</div>
              ) : null}
              {inputsError.phone ? (
                <div className="text-danger pt-2">{inputsError.phone}</div>
              ) : null}
            </div>

            <div className="form-group mb-4">
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
                />
              </PasswordInput>

              {!inputsError.password &&
              formik.errors.password &&
              formik.touched.password ? (
                <div className="text-danger pt-2">{formik.errors.password}</div>
              ) : null}
              {inputsError.password ? (
                <div className="text-danger pt-2">{inputsError.password}</div>
              ) : null}
            </div>

            <div className="form-group mb-4">
              <label className="form-label" htmlFor="rePassword">
                rePassword :
              </label>
              <PasswordInput>
                <input
                  type="password"
                  className="form-control"
                  name="rePassword"
                  id="rePassword"
                  onChange={formik.handleChange}
                  value={formik.values.rePassword}
                  onBlur={formik.handleBlur}
                />
              </PasswordInput>

              {!inputsError.rePassword &&
              formik.errors.rePassword &&
              formik.touched.rePassword ? (
                <div className="text-danger pt-2">
                  {formik.errors.rePassword}
                </div>
              ) : null}
              {inputsError.rePassword ? (
                <div className="text-danger pt-2">{inputsError.rePassword}</div>
              ) : null}
            </div>

            <div className="btns-container">
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className={`btn bg-main text-white loading-btn w-100 ${
                  isLoading ? "loading-overlay" : null
                }`}
              >
                Register
              </button>

              <p className="note-btn">
                Have an account ? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* <section className='section-style  sign-section register-section'>
          <div className='container'>
            
            <form className='sign-form register-form mb-0' onSubmit={handleSubmit}>
    
            <h3 className='mb-4 fw-bold'>Register Now :</h3>

            {error ? <div className='alert alert-danger mb-4'>{error}</div> : null}

            <div className='form-group mb-4'>
                <label className='form-label' htmlFor='name'>name :</label>
                <input type='text' className='form-control' name='name' id='name' 
                onChange={handleChange}
                value={inputsVal.name}
                required
                />
                
                {inputsError.name ? <div className='text-danger pt-2'>{inputsError.name}</div> : null }
                
              </div>


              <div className='form-group mb-4'>
                <label className='form-label' htmlFor='email'>email :</label>
                <input type='email' className='form-control' name='email' id='email' 
                onChange={handleChange}
                value={inputsVal.email} 
                required
                />

                {inputsError.email ? <div className='text-danger pt-2'>{inputsError.email}</div> : null }

              </div>

              <div className='form-group mb-4'>
                <label className='form-label' htmlFor='phone'>phone :</label>
                <input type='tel' className='form-control' name='phone' id='phone' 
                onChange={handleChange}
                value={inputsVal.phone} 
                required
                />

                {inputsError.phone ? <div className='text-danger pt-2'>{inputsError.phone}</div> : null }

              </div>


              <div className='form-group mb-4'>
                <label className='form-label' htmlFor='password'>password :</label>
                <input type='password' className='form-control' name='password' id='password' 
                onChange={handleChange}
                value={inputsVal.password} 
                required
                />

                {inputsError.password ? <div className='text-danger pt-2'>{inputsError.password}</div> : null }

              </div>

              <div className='form-group mb-4'>
                <label className='form-label' htmlFor='rePassword'>rePassword :</label>
                <input type='password' className='form-control' name='rePassword' id='rePassword' 
                onChange={handleChange}
                value={inputsVal.rePassword} 
                required
                />

                {inputsError.rePassword ? <div className='text-danger pt-2'>{inputsError.rePassword}</div> : null }

              </div>

              <div className='form-group d-flex align-items-center gap-3'>
                <button type='submit' className={`btn bg-main text-white loading-btn ${isLoading ? "loading-overlay" : null}`}>

                   Register

                </button>
                <span className='fw-bold'>OR</span>
                <Link className='btn btn-outline-dark' to="/login">
                     Login
                </Link>
              </div>

              

            </form>
          </div>
        </section> */}
    </>
  );
}

export default Register;
