import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { search, emptySearch } from "../../store/search";
import './SearchBar.css'


const SearchBar = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [searchInput, setSearchInput] = useState('')
    const results = useSelector(state => state.search.search_results)

    useEffect(() => {
        if (searchInput) {
            dispatch(search(searchInput))
        } else {
            dispatch(emptySearch())
        }
    }, [dispatch, searchInput])


    return (
        <div className="search-bar-container">
            <div className="navBar__searchBar">
                <div className="navBar__searchInput">
                    <input
                        onChange={e => setSearchInput(e.target.value)}
                        value={searchInput}
                        className='search-bar'
                        placeholder='Search Shreddit'
                    ></input>
                </div>
            </div>
            <div className="navBar__searchResults">
                {results?.map(result => (
                    <div>
                        {/* {result.title ?
                        <div>Post: <NavLink to={`/sh/${result.community_name}/${result.community_id}`}>{result.title}</NavLink></div> :
                        <div>Community: <NavLink to={`/sh/${result.name}/${result.id}`}>{result.name}</NavLink></div>} */}
                        <div><NavLink className='search-result' to={`/sh/${result.name}/${result.id}`}>{result.name}</NavLink></div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default SearchBar
