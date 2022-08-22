import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './OnePostModal.css'
import brokenLinkAvatar from "../../images/frybroke.webp";
import { NavLink, useParams } from "react-router-dom";


const OnePostModal = ({ post, communityId, setShowModal }) => {
    const { name } = useParams();
    const moment = require('moment-timezone');

    const currentUser = useSelector(state => state.session.user)

    const addDefaultImageSrc = (e) => {
        e.target.src = brokenLinkAvatar;
    }

    const handleSubmitComment = (e) => {
        e.preventDefault();
        // dispatch the thing to post a new comment
    }

    return (
        <div className="post-modal-container">
            <div className="close-modal-top" onClick={() => setShowModal(false)}>
                Close
            </div>
            <div className="post-modal-inner">
                <div className="post-modal-inner-left">

                </div>
                <div className="post-modal-inner-right">
                    <div className="post-header-modal">
                        <div className="who-and-where-when-post">
                            {!name && <NavLink className='comm-link' to={`/sh/${post.community_name}/${communityId}`}>/sh/{post.community_name}</NavLink>}{!name && ' • '}
                            <div className="posted-by">Posted by <NavLink className='user-link' to={`/user/${post.username}/${post.user_id}`}>/u/{post.username}</NavLink>  at {moment.tz(post.created_at, 'America/Chicago').format('MMMM Do YYYY, h:mm:ss a')}</div>
                        </div>
                        <div className="post-title-div">{post.title}</div>
                    </div>
                    {post?.image_url && <img className="post-image-modal" src={post?.image_url} onError={addDefaultImageSrc}></img>}
                    <p className="post-body-modal">{post.body}</p>

                    <form onSubmit={handleSubmitComment} className="post-comment-form">
                        <div className="comment-as">Comment as <NavLink className='commented-by-link' to={`/user/${currentUser.username}/${currentUser.id}`}>{currentUser.username}</NavLink></div>
                        <textarea className="comment-input" placeholder="What are your thoughts?" />
                        <div className="comment-button-holder">
                            <button className="comment-button">Comment</button>
                        </div>
                    </form>

                    <div className="comments-container">
                        *** Comments Coming SOON! ***
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnePostModal;
