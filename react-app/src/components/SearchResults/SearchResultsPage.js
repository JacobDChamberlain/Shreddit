import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { search, emptySearch } from "../../store/search";
import HelpLinks from "../HelpLinks/HelpLinks";
import Post from "../Posts/Post";
import './SearchResultsPage.css'
import shlogo from "../../images/shlogo.png"
import brokenLinkAvatar from "../../images/shreddit_avatar.png"



const addDefaultImageSrc = (e) => {
    e.target.src = brokenLinkAvatar;
}



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


    // const posts = useSelector(state => Object.values(state.posts))

    // add/remove onClick={() => {history.push(`/sh/${community?.name}/${community?.id}`)}}
    // to/from community-result-li if want change whether whole result to navigate to that page

    return (
        <div className="search-results-page-container">
            <div className="search-results-page-left">
                <ul className="community-results-ul">
                    {results?.communities?.map((community) => (
                        <li onClick={() => {history.push(`/sh/${community?.name}/${community?.id}`)}} className="community-result-li" key={community?.id}>
                            {community?.community_pic && <img onError={addDefaultImageSrc} className="comm-suggestion-pic" src={community?.community_pic}></img>}
                            <NavLink className='comm-sugg' to={`/sh/${community?.name}/${community?.id}`} key={community?.id}>{community?.name}</NavLink>
                            <p>{community?.description}</p>
                        </li>
                    ))}
                </ul>
                <ul className="community-results-ul">
                    {results?.posts?.map((post) => (
                        <li onClick={() => {history.push(`/sh/${post?.community_name}/${post?.community_id}`)}} className="community-result-li" >
                            <NavLink className='comm-sugg' to={`/sh/${post?.community_name}/${post?.community_id}`} >{post?.title}</NavLink>
                            <p>{post?.body}</p>
                        </li>
                    ))}
                </ul>
                <ul className="community-results-ul">
                    {results?.users?.map((user) => (
                        <li onClick={() => {history.push(`/user/${user?.username}/${user?.id}`)}} className="community-result-li" >
                        {user?.profile_pic && <img onError={addDefaultImageSrc} className="comm-suggestion-pic" src={user?.profile_pic}></img>}
                            <NavLink className='comm-sugg' to={`/user/${user?.username}/${user?.id}`} >{user?.username}</NavLink>
                            <p>{user?.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="search-results-page-right">
                <div className="community-suggestions-container">
                    <div className="sugg-header">
                        <img className="shlogo" src={shlogo}></img>
                        <h4 className="sugg-h4">Search for Shredders</h4>
                    </div>
                    <p className="prem-p">Discover new guitarists! The shredder world is endlessly growing! Chug chug chug chug Meedly meedly meedly meedly MEEEEEEE</p>
                </div>
                {/* <div style={{visibility: "hidden"}} className="community-search-results">
                    - display communities -
                </div>
                <div style={{visibility: "hidden"}} className="user-search-results">
                    - display people -
                </div> */}
                <HelpLinks />
            </div>
        </div>
    )
}


export default SearchResultsPage
