import React, { useContext, useState } from 'react';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../../context/authContext/AuthContext';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../context/cartContext/CartContext';

 function Login() {
  const navigate= useNavigate();
  const {getCart} = useContext(CartContext);
  const [isLoading , setIsLoading] = useState(false);
  const [error , setError] = useState(null);
  const {setUserToken , setUserData} = useContext(AuthContext);

  async function handleLogin(values){
    

    try {
      setIsLoading(true);
      setError(null);
      let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values);
      console.log(data);
      setIsLoading(false);
      localStorage.setItem('token' , data.token);
      setUserToken(data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      setUserData(data.user);
      getCart();
      navigate('/');

    } catch (error) {
      
      console.log(error);
      setIsLoading(false);
      setError(error.response.data.message);

    }
    
  }

 

  const validationSchema = Yup.object({
    email : Yup.string().email('Invalid email address').required('email is required'),
    password : Yup.string().matches(/^[a-z][a-z0-9]{5,10}$/ , "Invalid password").required("password is required"),
  });

  const formik = useFormik({

    initialValues :{
      email :"",
      password :"",
     
    },
    validationSchema,
    onSubmit : handleLogin ,

  });


  

  return (
    <>

        <Helmet>

         <title>FreshCart | Login</title>
        </Helmet>
        <section className='section-style  sign-section login-section'>
          <div className='container'>
            
            <form className='sign-form login-form mb-0' onSubmit={formik.handleSubmit}>
    
            <h3 className='mb-4 fw-bold'>Login:</h3>

              {error ? <div className='alert alert-danger mb-4'>{error}</div> : null}

          
              <div className='form-group mb-4'>
                <label className='form-label' htmlFor='email'>email :</label>
                <input type='email' className='form-control' name='email' id='email' 
                onChange={formik.handleChange}
                value={formik.values.email} 
                onBlur={formik.handleBlur}/>

                {formik.errors.email && formik.touched.email ? (<div className='text-danger pt-2'>{formik.errors.email}</div>) : null}

              </div>


              <div className='form-group mb-4'>
                <label className='form-label' htmlFor='password'>password :</label>
                <input type='password' className='form-control' name='password' id='password' 
                onChange={formik.handleChange}
                value={formik.values.password} 
                onBlur={formik.handleBlur}/>

                {formik.errors.password && formik.touched.password ? (<div className='text-danger pt-2'>{formik.errors.password}</div>) : null}
              </div>

           
              <div className='form-group d-flex align-items-center gap-3'>
                <button disabled={! (formik.isValid && formik.dirty)} type='submit' className={`btn bg-main text-white loading-btn ${isLoading ? "loading-overlay" : ""}`}>

                   Login

                </button>
                <span className='fw-bold'>OR</span>
                <Link className='btn btn-outline-dark' to="/register">
                    Register
                </Link>
              </div>

              

            </form>
          </div>
        </section>
    
    </>
  )
}

export default Login;
