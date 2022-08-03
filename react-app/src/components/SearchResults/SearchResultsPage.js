import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { search, emptySearch } from "../../store/search";
import HelpLinks from "../HelpLinks/HelpLinks";
import Post from "../Posts/Post";
import './SearchResultsPage.css'



const SearchResultsPage = () => {

    // const dispatch = useDispatch()
    const history = useHistory()

    // const [searchInput, setSearchInput] = useState('')

    // useEffect(() => {
    //     if (searchInput) {
    //         dispatch(search(searchInput))
    //     } else {
    //         dispatch(emptySearch())
    //     }
    // }, [dispatch, searchInput])

    const results = useSelector(state => state.search.search_results)
    console.log("results--->", results)


    const posts = useSelector(state => Object.values(state.posts))

    return (
        <div className="search-results-page-container">
            <div className="search-results-page-left">
                <div className="all-results-container">
                    <ul className="community-results-ul">
                        {results?.map((community) => (
                            <li className="community-result-li" key={community?.id}>
                                {community?.community_pic && <img className="comm-suggestion-pic" src={community?.community_pic}></img>}
                                <NavLink className='comm-sugg' to={`/sh/${community?.name}/${community?.id}`} key={community?.id}>{community?.name}</NavLink>
                                <p>{community?.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            <div className="search-results-page-right">
                <div style={{visibility: "hidden"}} className="community-search-results">
                    - display communities -
                </div>
                <div style={{visibility: "hidden"}} className="user-search-results">
                    - display people -
                </div>
                <HelpLinks />
            </div>
        </div>
    )
}


export default SearchResultsPage
