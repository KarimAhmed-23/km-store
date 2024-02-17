
import axios from 'axios';

export const switchLoader = async (url  , options) => {
  try {

    const response = await axios.get(url , options);
    
    return {response};

  } catch (error) {

    if(error?.response?.data?.message){
        let errorContent =error.response.data.message
        return {errorContent}
      }else{
        let errorContent =error.message
        return {errorContent}
      }
    
  }

    
}


