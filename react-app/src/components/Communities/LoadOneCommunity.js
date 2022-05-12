import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCommunities, getOneCommunity } from "../../store/communities";
import './Communities.css'

const LoadOneCommunity = () => {
    const {name} = useParams();
    // console.log("name---->", name)

    const communities = Object.values(useSelector(state => state.communities))
    // console.log("communities----->", communities)
    let community;
    for (let i = 0; i < communities.length; i++) {
        if (communities[i].name === name){
            community = communities[i]
        }
    }
    // attempted to refactor for loop below. wish i could use a list comprehension!
    // const community = Object.values(communities.filter(community => community.name == name))
    // console.log("community------->", community)


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCommunities())
    }, [dispatch])

    useEffect(() => {
        dispatch(getOneCommunity(community?.id))
    }, [dispatch])

    return (
        <>
            <div className="community-header-container">
                <h2>{community?.name}</h2>
                <div>sh/{community?.name}</div>
            </div>
            <div className="single-community-container">
                <div className="community-page-left">
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
                <div className="community-page-right">
                    <div className="about-community-container">
                        <h4>About Community</h4>
                        <ul>
                            <li>Description: {community?.description}</li>
                            <li>Created: {community?.created_at}</li>
                            <li>Created By: {community?.username}</li>
                            <li>Category: {community?.category}</li>
                            <img className="community-image" src={community?.community_pic}></img>
                        </ul>
                        <button className="create-post-home-button">Create Post</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoadOneCommunity;
