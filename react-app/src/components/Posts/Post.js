import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deletePost, getOnePost, updatePost } from "../../store/posts";
import { MdModeEditOutline } from 'react-icons/md'
import { IoSaveSharp } from 'react-icons/io5'
import { TiCancel } from 'react-icons/ti'
import { RiDeleteBinFill } from 'react-icons/ri'
// import * as moment from 'moment'
// import timezone from 'moment-timezone'
import './Post.css'

const Post = ({ post, communityId }) => {

    const { name } = useParams();

    const dispatch = useDispatch()
    const history = useHistory()

    const currentUser = useSelector(state => state.session.user)

    const [showEditPostForm, setShowEditPostForm] = useState(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [showErrors, setShowErrors] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const [title, setTitle] = useState(post.title)
    const [body, setBody] = useState(post.body)
    const [imageUrl, setImageUrl] = useState(post.image_url)

    // useEffect(() => {
    //     const errors = []

    //     if (title.length > 300) errors.push("Please keep title under 300 characters.")
    //     if (body.length > 4000) errors.push("Please keep body under 4000 characters.")

    //     setValidationErrors(errors)
    // }, [title, body])

    const handleEdit = () => {
        setShowEditPostForm(!showEditPostForm)
    }

    const handleDeleteConfirmation = () => {
        setShowDeleteConfirmation(!showDeleteConfirmation)
        setShowEditPostForm(false)
    }

    const handleDelete = async () => {
        await dispatch(deletePost(post.id))
        setShowDeleteConfirmation(false)
        // history.push("/")
    }

    const handleSubmitEditPost = async (e) => {
        e.preventDefault();

        const editedPost = {
            id: post?.id,
            title: title,
            body: body,
            image_url: imageUrl,
            user_id: post?.user_id,
            community_id: post?.community_id
        }
        // if (validationErrors.length === 0) {

        //     const data = await dispatch(updatePost(editedPost));
        //     console.log("data return from dispatch--->", data)

        //     setShowEditPostForm(false)

        //     if (data) {
        //         setValidationErrors(data)

        //         return
        //     } else {
        //         setShowErrors(false)
        //     }
        // } else {
        //     setShowErrors(true)
        // }

        const data = await dispatch(updatePost(editedPost))
        if (data) {
            setValidationErrors(data)
            console.log("post data", data)
        } else {
            setValidationErrors([])
            setShowEditPostForm(false)
            // history.push(`/sh/${communityName}/${communityId}`)
        }
    }
    const moment = require('moment-timezone');

    return (
        <>
            <div key={post.id} className="individual-post-container">
                {!showDeleteConfirmation ? <ul>
                    <div className="post-header">
                        <div className="who-and-where-when-post">
                            {!name && <NavLink className='comm-link' to={`/sh/${post.community_name}/${communityId}`}>/sh/{post.community_name}</NavLink>}{!name && ' • '}
                            {/* <div className="posted-by">Posted by <NavLink to={`/user/${post.username}/${post.user_id}`}>/u/{post.username}</NavLink>  at {post.created_at}</div> */}
                            <div className="posted-by">Posted by /u/{post.username}  at {moment.tz(post.created_at, 'America/Chicago|CST CDT EST CWT CPT|60 50 50 50 50|01010101010101010101010101010101010102010101010103401010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 1wp0 TX0 WN0 1qL0 1cN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 11B0 1Hz0 14p0 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5').format('MMMM Do YYYY, h:mm:ss a')}</div>
                        </div>
                        <div className="post-title-div">{post.title}</div>
                    </div>
                    <img className="post-image" src={post.image_url}></img>
                    <p className="post-body">{post.body}</p>
                </ul> :
                <div>
                    <p>Are you sure you want to delete your post?</p>
                    <div className="confirm-delete-buttons">
                        <button className="no-confirm-delete" onClick={() => setShowDeleteConfirmation(false)}>Naw</button>
                        <button className="confirm-delete" onClick={handleDelete}>Yuh</button>
                    </div>
                </div>}
                <div>{showEditPostForm &&
                    <form className="edit-post-form">
                        <div>
                            {validationErrors.map((error, idx) => (
                                <div className="error-text" key={idx}>{error}</div>
                            ))}
                        </div>
                        <label>
                            New title: {' '}
                            <input
                                type='text'
                                name='title'
                                onChange={e => setTitle(e.target.value)}
                                defaultValue={post?.title}
                            />
                        </label>
                        <label>
                            New body: {' '}
                            <textarea
                                name='body'
                                onChange={e => setBody(e.target.value)}
                                defaultValue={post?.body}
                            />
                        </label>
                        <label>
                            New image: {' '}
                            <input
                                type='text'
                                name='imageUrl'
                                onChange={e => setImageUrl(e.target.value)}
                                defaultValue={post?.image_url}
                            />
                        </label>
                        <div className="edit-post-form-buttons">
                            <TiCancel onClick={() => setShowEditPostForm(false)}>Cancel</TiCancel>
                            <IoSaveSharp onClick={handleSubmitEditPost}>Save</IoSaveSharp>
                        </div>
                    </form>}
                </div>
                {currentUser.username === post?.username && <div className="edit-update-post-buttons">
                    <MdModeEditOutline className="edit-post-button" onClick={handleEdit}>{showEditPostForm ? "Cancel" : "Update"}</MdModeEditOutline>
                    <RiDeleteBinFill className="delete-post-button" onClick={handleDeleteConfirmation}>{showDeleteConfirmation ? "Cancel" : "Delete"}</RiDeleteBinFill>
                </div>}
            </div>
        </>
    )
}

export default Post;
