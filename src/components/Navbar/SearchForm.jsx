import React from "react";
import { useDispatch } from "react-redux";
import { setSearchKeyword } from "../../store/general/generalSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SearchForm({togglePopup}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keyword , setKeyword]= useState("");

    function handleSubmit(e){
        e.preventDefault();
        dispatch(setSearchKeyword(keyword));
        setKeyword("");
        navigate("/search");
        if(togglePopup){
            togglePopup(false);
        }
        window.scrollTo(0,0);
    }

  return (
    <div className="form-group">
      <form className="searchForm" onSubmit={handleSubmit}>
        <input
          type="search"
          className="form-control input-focus"
          placeholder="Search here"
          onChange={(e)=> setKeyword(e.target.value)}
          value={keyword}
        />
        <button type="submit" className="search-icon">
          <i className="fas fa-search" />
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
