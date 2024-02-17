import React, { useState } from 'react';

//HOC Pattern
const CatchImage = ({ children:imgElement , loadingStyle, notFoundStyle }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [validImgSrc, setValidImgSrc] = useState(true);

  const handleImageLoad = () => {
    setImgLoaded(true);
  };

  const handleImageError = () => {
    setValidImgSrc(false);
  };

  // // Find the img element among children
  //  imgElement = React.Children.toArray(children).find(
  //   (child) => child.type === 'img'
  // );



  if (!imgElement) {
    console.error('CatchImage component requires an img element as a child');
    return null;
  }
  const {className:classes} = imgElement.props;

  const handledImg = React.cloneElement(imgElement, {
    
    className: `${imgLoaded ? 'opacity-100' : 'opacity-0'} ${classes}`,
    onLoad: handleImageLoad,
    onError: handleImageError,
    
  })

  return (
    <>

       {!imgLoaded ? (
         
          <div className="img-feedback img-loading">
            {loadingStyle || <i className="fa-solid fa-spinner fa-spin"></i>}
          </div>
       
      ) : !validImgSrc && notFoundStyle ? (

        <div className="img-feedback img-fail">
          {notFoundStyle}
        </div>

      ) : null}

      {handledImg}
      

    </>
  );
};


// //render props pattern like active Navlink
// const CatchImage = ({ render }) => {
//   const [imgLoaded, setImgLoaded] = useState(false);
//   const [validImgSrc, setValidImgSrc] = useState(true);

//   const handleImageLoad = () => {
//     setImgLoaded(true);
//   };

//   const handleImageError = () => {
//     setValidImgSrc(false);
//   };

//   return render({
//     imgLoaded,
//     validImgSrc,
//     handleImageLoad,
//     handleImageError
//   });
// };



export default CatchImage;
