import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllCommunities } from "../../store/communities";
import { getAllPosts } from "../../store/posts";
import CreateCommunityFormModal from "../CreateCommunityModal";
import HelpLinks from "../HelpLinks/HelpLinks";
import './Home.css'

const Home = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const currentUser = useSelector(state => state.session.user)
    const communities = useSelector(state => Object.values(state.communities))
    const posts = useSelector(state => Object.values(state.posts))

    const [showModal, setShowModal] = useState(false);


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
                    - create post form here -
                </div>
                <div className="sort-buttons-container">
                    - 'sort posts by' buttons here -
                </div>
                <div className="all-posts-container">
                    {posts.map(post => (
                        <div className="individual-post-container">
                            <div className="post-header">
                                <div className="who-and-where-when-post">
                                    <NavLink to={`/sh/${post.community_name}`}>/sh/{post.community_name}</NavLink> •
                                    Posted by <NavLink to={`/user/${post.username}`}>/u/{post.username}</NavLink>  at {post.created_at}
                                </div>
                                <h4>{post.title}</h4>
                            </div>
                            <img src={post.image_url}></img>
                            <p>{post.body}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="home-content-right">
                <div className="community-suggestions-container">
                    <h4>Top Shredder Communities</h4>
                    <ul className="community-suggestions-ul">
                        {communities.map(community => (
                            <li key={community.id}>
                                <NavLink to={`/sh/${community.name}`} key={community.id}>{community.name}</NavLink>
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
