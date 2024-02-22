import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Helmet } from "react-helmet";
import PasswordInput from "../Login/PasswordInput";

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputsError, setInputsError] = useState({});

  async function handleRegister(inputsVal) {
    // setIsLoading(true);
    // setError(null);
    //  axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)
    // .then(({data}) =>{
    //   console.log(data);
    //   setIsLoading(false);
    //   navigate('/login');
    // })
    // .catch(error =>{
    //   console.log(error);
    //   setIsLoading(false);
    //   setError(error.response.data.message);

    // });

    try {
      setIsLoading(true);
      setError(null);
      setInputsError({});
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        inputsVal
      );
      console.log(data);
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if (error.response?.data?.errors) {
        let { param, msg } = error.response.data.errors;
        setInputsError({ ...inputsError, [param]: msg });
      } else if (error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  }

  // function validate(values){
  //   let errors = {};

  //   if(!values.name){
  //     errors.name = "name is required"
  //   }else if(values.name.length < 3){
  //     errors.name = "Invalid name"
  //   }

  //   if (!values.email) {
  //     errors.email = 'email is required';
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email ';
  //   }

  //   if(!values.phone){
  //     errors.phone = "phone is required"
  //   }else if(!/^(002)?01[0125][0-9]{8}$/.test(values.phone)){
  //     errors.phone = "Invalid phone"
  //   }

  //   if(!values.password){
  //     errors.password = "password is required"
  //   }else if(!/^[a-z][a-z0-9]{5,10}$/i.test(values.password)){
  //     errors.password = "Invalid password"
  //   }

  //   if(!values.rePassword){
  //     errors.rePassword = "rePassword is required"
  //   }else if(values.password != values.rePassword){
  //     errors.rePassword = "rePassword does not match"
  //   }

  //   console.log(formik.touched.name);
  //   return errors
  // }

  // const validationSchema = Yup.object({
  //   name : Yup.string().min(5 , "Too short").max(20 , "Too long").required("name is required"),
  //   email : Yup.string().email('Invalid email address').required('email is required'),
  //   phone : Yup.string().matches(/^(002)?01[0125][0-9]{8}$/ , "Invalid phone number" ).required("phone is required"),
  //   password : Yup.string().matches(/^[a-z][a-z0-9]{5,10}$/ , "Invalid password").required("password is required"),
  //   rePassword : Yup.string().oneOf([Yup.ref("password")] , "rePassword does not match").required("rePassword is required"),
  // });

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "name at least 3 least").required(),
    email: Yup.string().email("Invalid email").required(),
    phone: Yup.string()
      .required()
      .matches(/^(002)?01[0125][0-9]{8}$/, "Invalid phone")
      .required(),
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
    // validate ,
    validationSchema,
    onSubmit: handleRegister,
  });

  // // manual formik
  // const [inputsVal , setInputsVal] = useState({

  //     name : "" ,
  //     email :"",
  //     phone : "",
  //     password :"",
  //     rePassword:"",

  // });

  // function handleSubmit(e){
  //   e.preventDefault();
  //   if(validate()){
  //     handleRegister(inputsVal);
  //     console.log("valid");
  //   }
  // }

  // function handleChange(e){
  //   const key = e.target.id;
  //   const val = e.target.value;

  //   setInputsVal({...inputsVal , [key] : val});

  // }

  // function validate(){
  //   let allInputsValid = false;

  //   if(!inputsVal.name){
  //     allInputsValid = false;
  //   }else{
  //     allInputsValid = true;
  //   }

  //   if(!inputsVal.email){
  //     allInputsValid = false;
  //   }else{
  //     allInputsValid = true;
  //   }

  //   if(!inputsVal.phone){
  //     allInputsValid = false;
  //   }else{
  //     allInputsValid = true;
  //   }

  //   if(!inputsVal.password){
  //     allInputsValid = false;
  //   }else{
  //     allInputsValid = true;
  //   }

  //   if(!inputsVal.rePassword){
  //     allInputsValid = false;
  //   }else{
  //     allInputsValid = true;
  //   }

  //   return allInputsValid;

  // }
  

  return (
    <>
      <Helmet>
        <title>FreshCart | Register</title>
      </Helmet>
      <section className="section-style  sign-section register-section">
        <div className="container">
          <form
            className="sign-form register-form mb-0"
            onSubmit={formik.handleSubmit}
          >
            <h3 className="form-title">Register Now</h3>

            {error ? <div className="alert alert-danger ">{error}</div> : null}

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
