import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { updateComment, deleteComment } from "../../store/comments";
import './Comment.css'
import { BsTrash } from 'react-icons/bs'


const Comment = ({ comment }) => {


    const currentUser = useSelector(state => state.session.user);

    const moment = require('moment-timezone');

    const dispatch = useDispatch();


    const handleDeleteComment = async () => {
        await dispatch(deleteComment(comment.id))
    }


    return (
        <div className="comment-container">
            <div className="commented-by">
                <div className="commented-by-inner">
                    <NavLink className='user-link-comment' to={`/user/${comment.username}/${comment.user_id}`}>/u/{comment.username}</NavLink>
                    <div className="comment-date">{moment.tz(comment.created_at, 'America/Chicago').fromNow()}</div>
                </div>
                {currentUser.id === comment.user_id && <BsTrash onClick={handleDeleteComment} className="trash-icon" />}
            </div>
            <p className="comment-content">
                {comment?.content}
            </p>
        </div>
    )
}

export default Comment;
