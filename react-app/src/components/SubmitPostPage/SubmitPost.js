import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllCommunities } from "../../store/communities";
import { createPost } from "../../store/posts";
import postRulesLogo from '../../images/postrulesShreddit.png'
import HelpLinks from "../HelpLinks/HelpLinks";
import './SubmitPost.css'
import shlogo from "../../images/shlogo.png"

const SubmitPostPage = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const currentUser = useSelector(state => state.session.user)
    const communities = useSelector(state => Object.values(state.communities))
    console.log("communities ---> ", communities)

    const [validationErrors, setValidationErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const userId = currentUser.id
    const [communityId, setCommunityId] = useState(1)

    useEffect(() => {
        dispatch(getAllCommunities())
    }, [dispatch])

    // useEffect(() => {

    //     const errors = []

    //     if (title.length === 0) errors.push("Please enter a title for your post.")
    //     if (title.length > 300) errors.push("Please keep titles under 300 characters.")
    //     if (body.length === 0) errors.push("Please enter a body for your post.")
    //     if (body.length > 4000) errors.push("Please keep your post body under 4000 characters.")
    //     if (imageUrl.length > 0 && !imageUrl.includes('jpg')) errors.push("Image must be a .jpg")

    //     setValidationErrors(errors)
    // }, [title, body, imageUrl])

    const handlePost = async (e) => {
        e.preventDefault();
        const post = {
            title: title,
            body: body,
            image_url: imageUrl,
            user_id: userId,
            community_id: communityId
        }

        let communityName;
        for (let i = 0; i < communities.length; i++) {
            if (communities[i].id === post.community_id) {
                communityName = communities[i].name
            }
        }

        // console.log(communityName)
        // console.log(communityId)

        // const communityName = communities[communityId - 1].name

        // if () {
        //     const data = await dispatch(createPost(post));
        //     console.log("submitfromhomeDATA", data)

        //     if (data) {
        //         setValidationErrors(data)
        //         // setShowErrors(true)
        //         // return
        //     } else {
        //         // setShowErrors(false)
        //     }
        // } else {
        //     // setShowErrors(true)
        // }
        // history.push(`/sh/${communityName}/${communityId}`)

        const data = await dispatch(createPost(post))
        if (data) {
            setValidationErrors(data)
        } else {
            setValidationErrors([])
            // history.push(`/sh/${communityName}/${communityId}`)
            history.push('/')
        }
    }

    console.log("validationerrors--->", validationErrors)

    return (
        <div className="submit-page-container">
            <div className="submit-page-left">
                <div className="create-post-header">
                    <h2>Create a post</h2>
                </div>
                <div className="create-post-form-container">
                    <form className="submit-post-form">
                        <div>
                            {validationErrors.map((error, idx) => (
                                <div className="error-text" key={idx}>{error}</div>
                            ))}
                        </div>

                        <label><img src={shlogo}></img>
                            <select
                                name='communityId'
                                onChange={e => setCommunityId(e.target.value)}
                                value={communityId}
                            >
                                {communities.map(community => (
                                    <option value={community.id}>{community.name}</option>
                                ))}
                            </select>
                        </label>
                        <label>Title:{' '}
                            <input
                                type='text'
                                name='title'
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                            />
                        </label>
                        <label>Body:{' '}
                            <textarea
                                name='body'
                                onChange={e => setBody(e.target.value)}
                                value={body}
                            />
                        </label>
                        <label>Image:{' '}
                            <input
                                type='text'
                                name='imageUrl'
                                onChange={e => setImageUrl(e.target.value)}
                                value={imageUrl}
                            />
                        </label>
                        <button className="submit-post-form-button" onClick={handlePost} type='submit'>Post</button>
                    </form>
                </div>
            </div>
            <div className="submit-page-right">
                <div className="posting-rules-container">
                    <div className="posting-rules-header">
                        <img className="posting-rules-img" src={postRulesLogo}></img>
                        <h4>Posting to Shreddit</h4>
                    </div>
                    <div className="posting-rules">
                        <ol>
                            <li>Remember the human</li>
                            <li>Behave like you would at a concert</li>
                            <li>Look for the original source of content</li>
                            <li>Search for duplicates before posting</li>
                            <li>Read the community's rules</li>
                        </ol>
                    </div>
                </div>
                <HelpLinks />
            </div>
        </div>
    )
}

export default SubmitPostPage
