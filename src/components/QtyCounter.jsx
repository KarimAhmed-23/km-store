import React, { useRef, useState } from "react";

function QtyCounter({max , min , maxMsg , minMsg , withDelete , withMsg}) {


  const [counter, setCounter] = useState(1);
  const [error , setError] = useState("");
  const counterInput = useRef();
 

  function handleCounter(action) {
    const currentInput = counterInput.current;

    if (currentInput) {
      if (action === 'increase') {
        if (counter < currentInput.max) {
          setCounter(counter + 1);
          setError(null);
        }
      } else if (action === 'decrease') {
        if (counter > currentInput.min) {
          setCounter(counter - 1);
          setError(null);
        }
      }
    }
  }

  function handleInputChange(e) {
    const value = parseInt(e.target.value);
    
    if (isNaN(value)) {
      setCounter("");
      setError(null);
    }else{
      setCounter(value)
      setError(null)
    }
  }

  function handleInputBlur(e){
    const value = parseInt(e.target.value);
    const currentInput = counterInput.current;

    if(isNaN(value) ||  value < currentInput.min){
      setCounter(parseInt(currentInput.min));
      setError(`min quantity is ${currentInput.min}`)
    }

    if(value > currentInput.max){
      setCounter(parseInt(currentInput.max));
      setError(`max quantity is ${max}`)
    }

    

  }

  return (
    <div className="qty-container">
      <div className="qty-wrap">
        <button
          type="button"
          role="decrease"
          className={`qty-btn qty-add btn bg-main text-white
                    ${
                      counter <= (counterInput?.current?.min || 1)
                        ? "disabled"
                        : ""
                    }`}
          onClick={() => handleCounter("decrease")}
        >
          <i className="fas fa-minus"></i>
        </button>

        <input
          type="text"
          name="quant"
          className="qty-num form-control "
          value={counter}
          step="1"
          inputMode="tel"
          min={min || 1}
          max={max || Infinity}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          ref={counterInput}
          placeholder="-"
        />

        <button
          type="button"
          role="increase"
          className={`qty-btn qty-add btn bg-main text-white
                    ${counter >= counterInput.current?.max ? "disabled" : ""}`}
          onClick={() => handleCounter("increase")}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      {error && 
      
        <span className="qty-error text-danger">{error}</span>
      }
    </div>
  );
}

export default QtyCounter;
