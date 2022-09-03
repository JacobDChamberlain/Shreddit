import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { updateComment, deleteComment } from "../../store/comments";
import './Comment.css'
import { BsTrash } from 'react-icons/bs'
// import { BsThreeDots } from 'react-icons/bs'
import { RiEdit2Line } from 'react-icons/ri'
import brokenLinkAvatar from '../../images/shreddit_avatar.png'


const Comment = ({ comment }) => {


    const currentUser = useSelector(state => state.session.user);

    const moment = require('moment-timezone');

    const dispatch = useDispatch();

    const [validationErrors, setValidationErrors] = useState([]);
    const [showEditComment, setShowEditComment] = useState(false);
    const [content, setContent] = useState(comment.content);
    const userId = currentUser.id;
    const postId = comment.post_id;


    const handleEditComment = async (e) => {
        e.preventDefault();
        const editedComment = {
            id: comment.id,
            content: content,
            user_id: userId,
            post_id: postId
        }
        const data = await dispatch(updateComment(editedComment))
        if (data) {
            setValidationErrors(data)
        } else {
            setValidationErrors([])
            setShowEditComment(false);
        }
        setContent('')
    }

    const handleDeleteComment = async () => {
        await dispatch(deleteComment(comment.id))
    }


    const addDefaultImageSrc = e => {
        e.target.value = brokenLinkAvatar;
    }


    return (
        <div className="comment-container-outer">
            {comment.profile_pic === '(unknown)'
            ?
            <NavLink to={`/user/${comment.username}/${comment.user_id}`}><img className="comment-user-image" src={brokenLinkAvatar} /></NavLink>
            :
            <div>
                {comment.profile_pic !== null
                ?
                <NavLink to={`/user/${comment.username}/${comment.user_id}`}><img onError={addDefaultImageSrc} className="comment-user-image" src={comment?.profile_pic} /></NavLink>
                :
                <NavLink to={`/user/${comment.username}/${comment.user_id}`}><img onError={addDefaultImageSrc} className="comment-user-image" src={brokenLinkAvatar} /></NavLink>
                }
            </div>
            }

            <div className="comment-container-inner">
                <div className="commented-by">
                    <div className="commented-by-inner">
                        <NavLink className='user-link-comment' to={`/user/${comment.username}/${comment.user_id}`}>/u/{comment.username}</NavLink>
                        <div className="comment-date">{moment.tz(comment.created_at, 'America/Chicago').fromNow()}</div>
                    </div>
                    {currentUser.id === comment.user_id &&
                    <div className="edit-delete-comment-buttons-container">
                        <BsTrash onClick={handleDeleteComment} className="trash-icon" />
                        <RiEdit2Line onClick={() => setShowEditComment(!showEditComment)} className="edit-comment-icon"/>
                    </div>}
                </div>
                {showEditComment ?
                <form onSubmit={handleEditComment} className="update-comment-form">
                    <div>
                        {validationErrors.map((error, idx) => (
                            <div className="error-text" key={idx}>{error}</div>
                        ))}
                    </div>
                    <textarea
                        className="comment-input"
                        defaultValue={comment?.content}
                        name="content"
                        onChange={e => setContent(e.target.value)}
                    />
                    <div>
                        <button onClick={() => setShowEditComment(false)} className="cancel-update-comment-button">Cancel</button>
                        <button type="submit" className="update-comment-button">Update</button>
                    </div>
                </form>
                :
                <p className="comment-content">
                    {comment?.content}
                </p>
                }
            </div>
        </div>
    )
}

export default Comment;
