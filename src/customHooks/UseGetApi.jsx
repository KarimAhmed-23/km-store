import React, { useEffect, useState } from "react";
import axios from "axios";

const useGetApi = (url, options , ...dependencies) => {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    setIsLoaded(false);
    try {
      
      const { data } = await axios.get(url, options);
      // console.log(data);
      setData(data);
      setIsLoaded(true);
      setError(null);
    } catch (error) {
      console.log(error);
      setData(null);
      setIsLoaded(true);
      setError(error.message);
    }
  }

  useEffect(() => {
    if (dependencies.some(dep => dep === null)) {
      return;
    }
  
    fetchData();
  }, [...dependencies]);



  return [data, isLoaded, error , fetchData , setData];
};

export default useGetApi;



// In React, updating the state triggers a re-render of the component. If you have 10 setState calls one after another in the same component, each updating a different state, React will batch these updates together before re-rendering the component.

// React optimizes the rendering process by batching state updates. So, even though you have 10 setState calls, React will typically only trigger a single re-render of the component. This is done to improve performance by avoiding unnecessary re-renders.

// However, each setState call will cause the component's state to be updated and potentially trigger side effects such as useEffect callbacks. But the actual DOM re-rendering will be optimized by React to minimize performance overhead.

// So, to answer your question, in most cases, if you have 10 setState calls one after another in the same component, it won't necessarily mean the component will render 10 times. React will optimize the rendering process to minimize unnecessary re-renders.
