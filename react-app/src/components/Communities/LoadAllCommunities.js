import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllCommunities} from '../../store/communities'
import './Communities.css'

const LoadAllCommunities = () => {

    const communities = Object.values(useSelector(state => state.communities))

    const dispatch = useDispatch()

    useEffect(() => {
        const getData = async () => {
            await dispatch(getAllCommunities())
        }
        getData()
    }, [dispatch])


    return (
        <div className='all-communities'>
            <div className='community-header-container'>
                <h2>Communites</h2>
            </div>
            <div className='communities-container'>
                {communities.map(community => (
                    <div className='community-container-div' key={community.id}>
                        <NavLink className='link-to-comm' to={`/sh/${community.name}/${community.id}`}>/sh/{community.name}</NavLink>
                        <ul className='community-info-ul'>
                            <li>Moderator: {community.username}</li>
                            <li>Category: {community.category}</li>
                        </ul>
                        {community?.community_pic && <img className="community-image" src={community?.community_pic}></img>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LoadAllCommunities;
