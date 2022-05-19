import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllCommunities } from "../../store/communities";
import { getAllPosts } from "../../store/posts";
import CreateCommunityFormModal from "../CreateCommunityModal";
import HelpLinks from "../HelpLinks/HelpLinks";
import Post from "../Posts/Post";
import './Home.css'
import shravatar from "../../images/shreddit_avatar2.png"
import shlogo from "../../images/shlogo.png"
import homeBanner from '../../images/shreddit_home_banner.png'

const Home = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const currentUser = useSelector(state => state.session.user)
    const communitiesArr = useSelector(state => Object.values(state.communities))
    const posts = useSelector(state => Object.values(state.posts))

    function randomize(arr) {
        let currIdx = arr.length, randIdx;

        while (currIdx != 0) {
            randIdx = Math.floor(Math.random() * currIdx);
            currIdx--;

            [arr[currIdx], arr[randIdx]] = [arr[randIdx], arr[currIdx]];
        }

        return arr;
    }

    // const communitiesRand = randomize(communitiesArr)

    // const communities = [];
    // for (let i = 0; i < 5; i++) {
    //     communities.push(communitiesRand[i])
    // }

    const fiveMostRecentCommunities = []
    for (let i = communitiesArr.length - 1; i >= communitiesArr.length - 5; i--) {
        fiveMostRecentCommunities.push(communitiesArr[i])
    }

    const communities = randomize(fiveMostRecentCommunities)



    posts.reverse()

    const [showModal, setShowModal] = useState(false);


    console.log("Home--->")



    useEffect(() => {
        dispatch(getAllCommunities())
        dispatch(getAllPosts())
    }, [dispatch])

    const handleViewAllCommunities = (e) => {
        e.preventDefault();
        history.push("/sh");
    }

    const handleTryNow = (e) => {
        e.preventDefault();
        window.location.href ="https://cash.app/$traightlegmusic"
    }

    const handleCreatePost = (e) => {
        e.preventDefault();
        history.push("/submit")
    }


    return (
        <div className="home-container">
            <div className="home-content-left">
                <div className="create-post-form-container">
                    <div>
                        <img className="create-post-avatar" src={shravatar}></img>
                        <input
                            className="create-post-form-input"
                            placeholder="Create Post"
                            onClick={handleCreatePost}
                        />
                    </div>
                </div>
                {/* <div className="sort-buttons-container">
                    <button className="sort-button">Best</button>
                    <button className="sort-button">Hot</button>
                    <button className="sort-button">New</button>
                    <button className="sort-button">Top</button>
                    <button className="sort-button">...</button>
                    <button className="sort-button">Card</button>
                </div> */}
                <div className="all-posts-container">
                    {posts.map(post => (
                        <Post key={post.id} post={post} communityId={post.community_id} />
                    ))}
                </div>
            </div>
            <div className="home-content-right">
                <div className="community-suggestions-container">
                    <div className="sugg-header">
                        <img className="shlogo" src={shlogo}></img>
                        <h4 className="sugg-h4">Shredder Suggestions</h4>
                    </div>
                    <ol className="community-suggestions-ul">
                        {communities?.map(community => (
                            <li className="community-suggestion-li" key={community?.id}>
                                {community?.community_pic && <img className="comm-suggestion-pic" src={community?.community_pic}></img>}
                                <NavLink className='comm-sugg' to={`/sh/${community?.name}/${community?.id}`} key={community?.id}>{community?.name}</NavLink>
                            </li>
                        ))}
                    </ol>
                    <button onClick={handleViewAllCommunities} className="view-all-communities-home-button">View All</button>
                </div>
                <div className="shreddit-premium-container">
                    <h4 className="prem-h4">Shreddit Premium</h4>
                    <p className="prem-p">To get the best Sheddit experience,<br />send me monthly Coins</p>
                    <button onClick={handleTryNow} className="try-now-home-button">Try Now</button>
                </div>
                <div className="home-right-create-links-container">
                    <div className="home-right-create-links-inner-container">
                        <img className="home-banner-img" src={homeBanner}></img>
                        <h4 className="home-h4">Home</h4>
                        <p className="home-p">Your personal Shreddit frontpage. Come here to check in with your favorite communities.</p>
                        <button className="create-post-home-button" onClick={handleCreatePost}>Create Post</button>
                        <CreateCommunityFormModal />
                    </div>
                </div>
                <HelpLinks />
            </div>
        </div>
    )
}

export default Home
