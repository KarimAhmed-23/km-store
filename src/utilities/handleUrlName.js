import React from 'react'

function handleUrlName(url) {

  const handledUrl = url.replace(/[^\w\s\-]/gi, "").replace(/\s+/g, "+")
  
  return handledUrl ;
  
}

export default handleUrlName