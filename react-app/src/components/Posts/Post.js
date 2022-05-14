import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deletePost, getOnePost, updatePost } from "../../store/posts";


const Post = ({ post }) => {

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

    useEffect(() => {
        const errors = []

        if (title.length > 300) errors.push("Please keep title under 300 characters.")
        if (body.length > 4000) errors.push("Please keep body under 4000 characters.")

        setValidationErrors(errors)
    }, [title, body])

    const handleEdit = () => {
        setShowEditPostForm(!showEditPostForm)
    }

    const handleDeleteConfirmation = () => {
        setShowDeleteConfirmation(!showDeleteConfirmation)
    }

    const handleDelete = async () => {
        await dispatch(deletePost(post.id))
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
        if (validationErrors.length === 0) {

            const data = await dispatch(updatePost(editedPost));

            setShowEditPostForm(false)

            if (data) {
                setValidationErrors(data)

                return
            } else {
                setShowErrors(false)
            }
        } else {
            setShowErrors(true)
        }
    }


    return (
        <>
            <div key={post.id} className="individual-post-container">
                <div className="post-header">
                    <div className="who-and-where-when-post">
                        Posted by <NavLink to={`/user/${post.username}`}>/u/{post.username}</NavLink>  at {post.created_at}
                    </div>
                    <h4>{post.title}</h4>
                </div>
                <img src={post.image_url}></img>
                <p>{post.body}</p>
                <div>{showEditPostForm &&
                    <form className="edit-post-form">
                        {showErrors && <div>
                            {validationErrors.map((error, idx) => (
                                <div className="error-text" key={idx}>{error}</div>
                            ))}
                        </div>}
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
                                defaultValue={post?.imageUrl}
                            />
                        </label>
                        <div className="edit-post-form-buttons">
                            <button onClick={() => setShowEditPostForm(false)}>Cancel</button>
                            <button onClick={handleSubmitEditPost}>Save</button>
                        </div>
                    </form>}
                </div>
                <div hidden={currentUser.username === post?.username ? false : true} className="edit-update-post-buttons">
                    <button className="edit-post-button" onClick={handleEdit}>{showEditPostForm ? "Cancel" : "Update"}</button>
                    <button className="delete-post-button" onClick={handleDeleteConfirmation}>{showDeleteConfirmation ? "Cancel" : "Delete"}</button>
                </div>
            </div>
        </>
    )
}

export default Post;
