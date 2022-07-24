import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { search, emptySearch } from "../../store/search";
import HelpLinks from "../HelpLinks/HelpLinks";
import './SearchResultsPage.css'


const SearchResultsPage = () => {

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
        <div className="search-results-page-container">
            <div className="search-results-page-left">
                - display posts -
                {results.map((result) => {
                    <div>
                        {result.name}
                    </div>
                })}
            </div>
            <div className="search-results-page-right">
                <div className="community-search-results">
                    - display communities -
                </div>
                <div className="user-search-results">
                    - display people -
                </div>
                <HelpLinks />
            </div>
        </div>
    )
}


export default SearchResultsPage
