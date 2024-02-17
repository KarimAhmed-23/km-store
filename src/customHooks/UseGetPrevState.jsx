import { useEffect, useRef } from "react"


function useGetPrevState(state){

 const ref = useRef();

 useEffect(()=>{

    ref.current = state

 });


 return ref.current;


}

export default useGetPrevState