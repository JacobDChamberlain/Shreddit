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
        dispatch(getOneCommunity(community.id))
    }, [dispatch])

    return (
        <div className="single-community-container">
            <h2>{community.name}</h2>
            <ul>
                <li>Created By: {community.username}</li>
                <li>Category: {community.category}</li>
                <li>Description: {community.description}</li>
                <img src={community.community_pic}></img>
            </ul>
        </div>
    )
}

export default LoadOneCommunity;
