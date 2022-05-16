import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deletePost, getOnePost, updatePost } from "../../store/posts";
import { MdModeEditOutline } from 'react-icons/md'
import { IoSaveSharp } from 'react-icons/io5'
import { TiCancel } from 'react-icons/ti'
import { RiDeleteBinFill } from 'react-icons/ri'
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
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [imageUrl, setImageUrl] = useState('')

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
            image_url: post?.image_url,
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


    return (
        <>
            <div key={post.id} className="individual-post-container">
                {!showDeleteConfirmation ? <ul>
                    <div className="post-header">
                        <div className="who-and-where-when-post">
                            {!name && <NavLink to={`/sh/${post.community_name}/${communityId}`}>/sh/{post.community_name}</NavLink>}{!name && ' • '}
                            Posted by <NavLink to={`/user/${post.username}/${post.user_id}`}>/u/{post.username}</NavLink>  at {post.created_at}
                        </div>
                        <h4>{post.title}</h4>
                    </div>
                    <img className="post-image" src={post.image_url}></img>
                    <p>{post.body}</p>
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
                        {/* <label>
                            New image: {' '}
                            <input
                                type='text'
                                name='imageUrl'
                                onChange={e => setImageUrl(e.target.value)}
                                defaultValue={post?.image_url}
                            />
                        </label> */}
                        <div className="edit-post-form-buttons">
                            <TiCancel onClick={() => setShowEditPostForm(false)}>Cancel</TiCancel>
                            <IoSaveSharp onClick={handleSubmitEditPost}>Save</IoSaveSharp>
                        </div>
                    </form>}
                </div>
                <div hidden={currentUser.username === post?.username ? false : true} className="edit-update-post-buttons">
                    <MdModeEditOutline className="edit-post-button" onClick={handleEdit}>{showEditPostForm ? "Cancel" : "Update"}</MdModeEditOutline>
                    <RiDeleteBinFill className="delete-post-button" onClick={handleDeleteConfirmation}>{showDeleteConfirmation ? "Cancel" : "Delete"}</RiDeleteBinFill>
                </div>
            </div>
        </>
    )
}

export default Post;
