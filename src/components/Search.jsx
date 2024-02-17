import React, { useEffect, useState } from 'react'

function Search({getSearchKeyword:setSearchKeyword}) {

    console.log()

    const [searchVal , setSearchVal] = useState("");

    function changeSearch(e){
        const keyword = e.target.value;
        setSearchVal(keyword)
        setSearchKeyword(keyword);
    }

    return (
        <input className='form-control mb-5' type='text' value={searchVal} onChange={changeSearch} placeholder='search....'/>
    )

}

export default Search