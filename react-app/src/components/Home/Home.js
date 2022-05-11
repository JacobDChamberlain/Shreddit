import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllCommunities } from "../../store/communities";
import LoadAllCommunities from "../Communities/Community";
import CreateCommunityFormModal from "../CreateCommunityModal";
import './Home.css'

const Home = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const currentUser = useSelector(state => state.session.user)
    const communities = Object.values(useSelector(state => state.communities))

    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        dispatch(getAllCommunities())
    }, [dispatch])

    const handleViewAllCommunities = (e) => {
        e.preventDefault();
        history.push("/communities");
    }

    const handleTryNow = (e) => {
        e.preventDefault();
        window.location.href ="https://cash.app/$traightlegmusic"
    }

    const createCommunity = (e) => {
        e.preventDefault();
        setShowModal(true);
        history.push('/communities/new');
    }

    return (
        <div className="home-container">
            <div className="home-content-left">
                <div className="create-post-form-container">
                    - create post form here -
                </div>
                <div className="sort-buttons-container">
                    - 'sort posts by' buttons here -
                </div>
                <div className="all-posts-container">
                    - display all posts here -
                    <div className="individual-post-container">
                        <h4>Post 1</h4>
                        <p>content & stuff</p>
                    </div>
                    <div className="individual-post-container">
                        <h4>Post 2</h4>
                        <p>content & stuff</p>
                    </div>
                    <div className="individual-post-container">
                        <h4>Post 3</h4>
                        <p>content & stuff</p>
                    </div>
                </div>
            </div>
            <div className="home-content-right">
                <div className="community-suggestions-container">
                    <h4>Top Shredder Communities</h4>
                    <ul>
                        {communities.map(community => (
                            <li key={community.id}>
                                <NavLink to={`/communities/${community.id}`} key={community.id}>{community.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleViewAllCommunities} className="view-all-communities-home-button">View All</button>
                </div>
                <div className="shreddit-premium-container">
                    <h4>Shreddit Premium</h4>
                    <p>To get the best Sheddit experience,<br />send me monthly Coins</p>
                    <button onClick={handleTryNow} className="try-now-home-button">Try Now</button>
                </div>
                <div className="home-right-create-links-container">
                    <div className="home-right-create-links-inner-container">
                        <h4>Home</h4>
                        <p>Your personal Shreddit frontpage. Come<br/>here to check in with your favorite<br/>communities.</p>
                        <button className="create-post-home-button">Create Post</button>
                        <CreateCommunityFormModal />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
