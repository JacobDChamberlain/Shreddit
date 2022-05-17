import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteCommunity, getAllCommunities, getOneCommunity, updateCommunity } from "../../store/communities";
import { getAllCommunityPosts, updatePost } from "../../store/posts";
import HelpLinks from "../HelpLinks/HelpLinks";
import Post from "../Posts/Post";
import './Communities.css'
import shravatar from "../../images/shreddit_avatar2.png"


const LoadOneCommunity = () => {
    const {name} = useParams();
    const {communityId} = useParams();


    const history = useHistory();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getAllCommunities())
    // }, [dispatch])

    // const communities = useSelector(state => Object.values(state.communities))
    const currentUser = useSelector(state => state.session.user)


    // let community;
    // for (let i = 0; i < communities.length; i++) {
    //     if (communities[i].name === name) {
    //         community = communities[i]
    //     }
    // }
    // const communityId = community?.id
    // console.log("communityId ---->", communityId)

    useEffect(() => {
        const getData = async () => {
            await dispatch(getOneCommunity(communityId))
            await dispatch(getAllCommunityPosts(communityId))
        }
        getData()
    }, [dispatch])

    const posts = useSelector(state => Object.values(state.posts))
    posts.reverse()
    const communities = useSelector(state => Object.values(state.communities))
    const community = communities[0];

    const [showEditForm, setShowEditForm] = useState(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [description, setDescription] = useState(community.description)
    const [communityPic, setCommunityPic] = useState(community.community_pic)
    const [showErrors, setShowErrors] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])


    console.log("LoadOneComm--->")


    useEffect(() => {
        const errors = []

        if (description.length > 500) errors.push("Please keep description under 500 characters.")
        if (communityPic.length > 0 && !communityPic.includes(".jpg")) errors.push("Image must be a .jpg url")
        setValidationErrors(errors)
    }, [description, communityPic])

    const handleEdit = () => {
        setShowEditForm(!showEditForm)
    }

    const handleDeleteConfirmation = () => {
        setShowDeleteConfirmation(!showDeleteConfirmation)
    }

    const handleDelete = async () => {
        await dispatch(deleteCommunity(communityId))
        history.push("/")
    }

    const handlePost = () => {
        history.push(`/sh/${name}/${communityId}/submit`)
    }

    const handleCreatePost = (e) => {
        e.preventDefault();
        history.push(`/sh/${name}/${communityId}/submit`)
    }

    const handleSubmitEdit = async (e) => {
        e.preventDefault();

        const editedCommunity = {
            id: community?.id,
            name: community?.name,
            description: description,
            community_pic: communityPic,
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
                    <div>
                        <img className="create-post-avatar" src={shravatar}></img>
                        <input
                            className="create-post-form-input"
                            placeholder="Create Post"
                            onClick={handleCreatePost}
                        />
                    </div>
                </div>
                {/* <div className="sort-buttons-container">
                    <button className="sort-button">Best</button>
                    <button className="sort-button">Hot</button>
                    <button className="sort-button">New</button>
                    <button className="sort-button">Top</button>
                    <button className="sort-button">...</button>
                    <button className="sort-button">Card</button>
                </div> */}
                    <div className="all-posts-container">
                        {posts?.map(post => (
                            <Post key={post.id} post={post} communityId={post.community_id} />
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
                                <label>
                                    New image: {' '}
                                    <input
                                        type='text'
                                        name='communityPic'
                                        onChange={e => setCommunityPic(e.target.value)}
                                        defaultValue={community?.community_pic}
                                    />
                                </label>
                                <div className="edit-community-form-buttons">
                                    <button onClick={() => setShowEditForm(false)}>Cancel</button>
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
                        <button className="create-post-home-button" onClick={handlePost}>Create Post</button>
                    </div>
                    <HelpLinks />
                </div>
            </div>
        </>
    )
}

export default LoadOneCommunity;
