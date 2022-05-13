import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteCommunity, getAllCommunities, getOneCommunity, updateCommunity } from "../../store/communities";
import { getAllCommunityPosts } from "../../store/posts";
import './Communities.css'


const LoadOneCommunity = () => {
    const {name} = useParams();

    const communities = useSelector(state => Object.values(state.communities))
    const currentUser = useSelector(state => state.session.user)
    const posts = useSelector(state => Object.values(state.posts))

    let community;
    for (let i = 0; i < communities.length; i++) {
        if (communities[i].name === name) {
            community = communities[i]
        }
    }

    const communityPosts = []
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].community_name === name) {
            communityPosts.push(posts[i])
        }
    }

    // attempted to refactor for loop below. wish i could use a list comprehension!
    // const community = Object.values(communities.filter(community => community.name == name))
    // console.log("community------->", community)

    const [showEditForm, setShowEditForm] = useState(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [description, setDescription] = useState("")
    const [showErrors, setShowErrors] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])


    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(getOneCommunity(community?.id))
        dispatch(getAllCommunities())
        dispatch(getAllCommunityPosts(community?.id))
    }, [dispatch])

    useEffect(() => {
        const errors = []

        if (description.length > 500) errors.push("Please keep description under 500 characters.")

        setValidationErrors(errors)
    }, [description])

    const handleEdit = () => {
        setShowEditForm(!showEditForm)
    }

    const handleDeleteConfirmation = () => {
        setShowDeleteConfirmation(!showDeleteConfirmation)
    }

    const handleDelete = async () => {
        const communityId = community?.id
        await dispatch(deleteCommunity(communityId))
        console.log(community.id)
        history.push("/")
    }

    const handleSubmitEdit = async (e) => {
        e.preventDefault();

        const editedCommunity = {
            id: community?.id,
            name: community?.name,
            description: description,
            community_pic: community?.community_pic,
            category: community?.category,
            user_id: community?.user_id
        }
        if (validationErrors.length === 0) {

            const data = await dispatch(updateCommunity(editedCommunity));

            setShowEditForm(false)

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
            <div className="community-header-container">
                <h2>{community?.name}</h2>
                <div>sh/{community?.name}</div>
            </div>
            <div className="single-community-container">
                <div className="community-page-left">
                    <div className="create-post-form-container">
                        - create post form here -
                    </div>
                    <div className="sort-buttons-container">
                        - 'sort posts by' buttons here -
                    </div>
                    <div className="all-posts-container">
                        {communityPosts.map(post => (
                            <div className="individual-post-container">
                                <div className="post-header">
                                    <div className="who-and-where-when-post">
                                        Posted by <NavLink to={`/user/${post.username}`}>/u/{post.username}</NavLink>  at {post.created_at}
                                    </div>
                                    <h4>{post.title}</h4>
                                </div>
                                <img src={post.image_url}></img>
                                <p>{post.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="community-page-right">
                    <div className="about-community-container">
                        <div className="about-community-header">
                            <h4>About Community</h4>
                            <button hidden={currentUser.username === community?.username ? false : true} className="edit-community-button" onClick={handleEdit}>{showEditForm ? "Cancel" : "Update"}</button>
                            <button hidden={currentUser.username === community?.username ? false : true} className="delete-community-button" onClick={handleDeleteConfirmation}>{showDeleteConfirmation ? "Cancel" : "Delete"}</button>
                        </div>
                        <div>{showEditForm &&
                            <form className="edit-community-form">
                                {showErrors && <div>
                                    {validationErrors.map((error, idx) => (
                                        <div className="error-text" key={idx}>{error}</div>
                                    ))}
                                </div>}
                                <label>
                                    New description: {' '}
                                    <textarea

                                        name='description'
                                        onChange={e => setDescription(e.target.value)}
                                        defaultValue={community?.description}
                                    />
                                </label>
                                <div className="edit-community-form-buttons">
                                    <button>Cancel</button>
                                    <button onClick={handleSubmitEdit}>Save</button>
                                </div>
                            </form>}
                        </div>
                        {!showDeleteConfirmation ? <ul>
                            <li>Description: {community?.description}</li>
                            <li>Created: {community?.created_at}</li>
                            <li>Created By: {community?.username}</li>
                            <li>Category: {community?.category}</li>
                            {community?.community_pic && <img className="community-image" src={community?.community_pic}></img>}
                        </ul> :
                        <div>
                            <p>Are you sure you want to delete community {community?.name}?</p>
                            <div className="confirm-delete-buttons">
                                <button className="no-confirm-delete" onClick={() => setShowDeleteConfirmation(false)}>Naw</button>
                                <button className="confirm-delete" onClick={handleDelete}>Yuh</button>
                            </div>

                        </div>}
                        <button className="create-post-home-button">Create Post</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoadOneCommunity;
