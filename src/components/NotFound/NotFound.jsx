import React from 'react';
import "./NotFound.css";
import { Helmet } from 'react-helmet';
import error from "../../assets/images/error.svg";

 function NotFound() {
  return (
    <>
        <Helmet>
         <title>FreshCart | NotFound</title>
        </Helmet>  
        
        <div className='error-img text-center section-style'>
          <img className=' img-fluid' src={error} alt='404' width={800}/>
        </div>
    
    </>
  )
}

export default NotFound;
