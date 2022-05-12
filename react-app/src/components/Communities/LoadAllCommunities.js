import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCommunities} from '../../store/communities'
import './Communities.css'

const LoadAllCommunities = () => {

    const communities = Object.values(useSelector(state => state.communities))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCommunities())
    }, [dispatch])


    return (
        <div className='communities-container'>
            <h2>Communites:</h2>
            {communities.map(community => (
                <div key={community.id}>
                    {community.name}
                    <ul>
                        <li>Created By: {community.username}</li>
                        <li>Category: {community.category}</li>
                        <li>Description: {community.description}</li>
                        <img src={community.community_pic}></img>
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default LoadAllCommunities;
