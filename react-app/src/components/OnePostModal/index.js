import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './OnePostModal.css'
import brokenLinkAvatar from "../../images/frybroke.webp";
import { NavLink, useParams } from "react-router-dom";
import { getCommentsByPost } from "../../store/comments";
import Comment from "../Comments/Comment";
import { AiOutlineClose } from 'react-icons/ai'
import { createComment } from "../../store/comments";

const OnePostModal = ({ post, communityId, setShowModal }) => {
    const { name } = useParams();
    const moment = require('moment-timezone');

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCommentsByPost(post.id))
    }, [dispatch])

    const currentUser = useSelector(state => state.session.user)
    const comments = useSelector(state => Object.values(state.comments))

    const addDefaultImageSrc = (e) => {
        e.target.src = brokenLinkAvatar;
    }


    const [validationErrors, setValidationErrors] = useState([])
    const [content, setContent] = useState('')
    const userId = currentUser.id
    const postId = post.id





    const handleSubmitComment = async (e) => {
        e.preventDefault();
        const comment = {
            content: content,
            user_id: userId,
            post_id: postId
        }
        const data = await dispatch(createComment(comment))
        if (data) {
            setValidationErrors(data)
        } else {
            setValidationErrors([])
        }
        setContent('')
    }

    return (
        <div className="post-modal-container">
            <div className="close-modal-top" onClick={() => setShowModal(false)}>
                <AiOutlineClose className="icon"/> Close
            </div>
            <div className="post-modal-inner">
                <div className="post-modal-inner-left">

                </div>
                <div className="post-modal-inner-right">
                    <div className="post-header-modal">
                        <div className="who-and-where-when-post">
                            {!name && <NavLink className='comm-link' to={`/sh/${post.community_name}/${communityId}`}>/sh/{post.community_name}</NavLink>}{!name && ' • '}
                            <div className="posted-by">Posted by <NavLink className='user-link' to={`/user/${post.username}/${post.user_id}`}>/u/{post.username}</NavLink> {moment.tz(post.created_at, 'America/Chicago').fromNow()}</div>
                        </div>
                        <div className="post-title-div">{post.title}</div>
                    </div>
                    {post?.image_url && <img className="post-image-modal" src={post?.image_url} onError={addDefaultImageSrc}></img>}
                    <p className="post-body-modal">{post.body}</p>

                    <form onSubmit={handleSubmitComment} className="post-comment-form">
                        <div>
                            {validationErrors.map((error, idx) => (
                                <div className="error-text" key={idx}>{error}</div>
                            ))}
                        </div>
                        <div className="comment-as">Comment as <NavLink className='commented-by-link' to={`/user/${currentUser.username}/${currentUser.id}`}>{currentUser.username}</NavLink></div>
                        <textarea
                            className="comment-input"
                            placeholder="What are your thoughts?"
                            name="content"
                            onChange={e => setContent(e.target.value)}
                            value={content}
                        />
                        <div className="comment-button-holder">
                            <button className="comment-button" type="submit">Comment</button>
                        </div>
                    </form>

                    <div className="comments-container">
                        <ul>
                            {comments.map(comment => (
                                <Comment comment={comment} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnePostModal;
