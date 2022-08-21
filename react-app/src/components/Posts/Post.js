import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deletePost, getOnePost, updatePost } from "../../store/posts";
import { MdModeEditOutline } from 'react-icons/md'
import { IoSaveSharp } from 'react-icons/io5'
import { TiCancel } from 'react-icons/ti'
import { RiDeleteBinFill } from 'react-icons/ri'
import { Modal } from "../../context/Modal";
// import * as moment from 'moment'
// import timezone from 'moment-timezone'
import './Post.css'
import brokenLinkAvatar from "../../images/frybroke.webp"


const Post = ({ post, communityId }) => {

    const { name } = useParams();

    const dispatch = useDispatch()
    // const history = useHistory()

    const currentUser = useSelector(state => state.session.user)

    const [showEditPostForm, setShowEditPostForm] = useState(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    // const [showErrors, setShowErrors] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const [title, setTitle] = useState(post.title)
    const [body, setBody] = useState(post.body)
    const [imageUrl, setImageUrl] = useState(post.image_url)
    const [showModal, setShowModal] = useState(false);

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


    const addDefaultImageSrc = (e) => {
        e.target.src = brokenLinkAvatar;
    }

    return (
        <>
            {showModal ?
            // <div>(modal)</div>
            <Modal onClose={() => setShowModal(false)}>
                    <Post post={post}/>
            </Modal>
            :
            <div key={post.id} className="individual-post-container">

                <div className="post-outer-container">
                    <div className="post-inner-container-left">

                    </div>
                    <div className="post-inner-container-right" onClick={() => setShowModal(true)}>
                        <div className="post-header">
                            <div className="who-and-where-when-post">
                                {!name && <NavLink className='comm-link' to={`/sh/${post.community_name}/${communityId}`}>/sh/{post.community_name}</NavLink>}{!name && ' • '}
                                {/* <div className="posted-by">Posted by /u/{post.username}  at {moment.tz(post.created_at, 'America/Chicago').format('MMMM Do YYYY, h:mm:ss a')}</div> */}
                                <div className="posted-by">Posted by <NavLink className='user-link' to={`/user/${post.username}/${post.user_id}`}>/u/{post.username}</NavLink>  at {moment.tz(post.created_at, 'America/Chicago').format('MMMM Do YYYY, h:mm:ss a')}</div>
                            </div>
                            <div className="post-title-div">{post.title}</div>
                        </div>
                        {post?.image_url !== '' && <img className="post-image" src={post?.image_url} onError={addDefaultImageSrc}></img>}
                        <p className="post-body">{post.body}</p>
                    </div>
                </div>
                {showDeleteConfirmation &&
                <div className="delete-post-confirm">
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
                            <TiCancel className="cancel-icon" onClick={() => setShowEditPostForm(false)}>Cancel</TiCancel>
                            <IoSaveSharp className="save-icon" onClick={handleSubmitEditPost}>Save</IoSaveSharp>
                        </div>
                    </form>}
                </div>
                {currentUser.username === post?.username && <div className="edit-update-post-buttons">
                    <MdModeEditOutline className="edit-post-button" onClick={handleEdit}>{showEditPostForm ? "Cancel" : "Update"}</MdModeEditOutline>
                    <RiDeleteBinFill className="delete-post-button" onClick={handleDeleteConfirmation}>{showDeleteConfirmation ? "Cancel" : "Delete"}</RiDeleteBinFill>
                </div>}
            </div>}
        </>
    )
}

export default Post;
