import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllCommunities} from '../../store/communities'
import './Communities.css'

const LoadAllCommunities = () => {

    const communities = Object.values(useSelector(state => state.communities))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCommunities())
    }, [dispatch])


    return (
        <>
        <div className='community-header-container'>
            <h2>Communites</h2>
        </div>
            <div className='communities-container'>
            {communities.map(community => (
                <div key={community.id}>
                    <NavLink to={`/sh/${community.name}/${community.id}`}>{community.name}</NavLink>
                    <ul>
                        <li>Created By: {community.username}</li>
                        <li>Category: {community.category}</li>
                        {community?.community_pic && <img className="community-image" src={community?.community_pic}></img>}
                    </ul>
                </div>
            ))}
            </div>
        </>
    )
}

export default LoadAllCommunities;
