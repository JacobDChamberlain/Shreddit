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
        <>
            <div className="create-post-header">
                <h2>Create a post</h2>
            </div>
            <div className="submit-page-container">
                <div className="submit-page-left">

                    <div className="create-post-form-container">
                        <form className="submit-post-form">
                            <div>
                                {validationErrors.map((error, idx) => (
                                    <div className="error-text" key={idx}>{error}</div>
                                ))}
                            </div>
                            <img src={shlogo}></img>
                            <label className="post-label">Choose a community</label>
                                <select
                                    name='communityId'
                                    onChange={e => setCommunityId(e.target.value)}
                                    value={communityId}
                                    className="submit-post-input"
                                >
                                    {communities.map(community => (
                                        <option value={community.id}>{community.name}</option>
                                    ))}
                                </select>
                                <input
                                    type='text'
                                    name='title'
                                    onChange={e => setTitle(e.target.value)}
                                    value={title}
                                    placeholder='Title*'
                                    className="submit-post-input"
                                />
                                <textarea
                                    name='body'
                                    onChange={e => setBody(e.target.value)}
                                    value={body}
                                    placeholder='Text*'
                                    className="submit-post-input-textbox"
                                />
                            <label className="post-label">Image Link (Optional)</label>
                                <input
                                    type='text'
                                    name='imageUrl'
                                    onChange={e => setImageUrl(e.target.value)}
                                    value={imageUrl}
                                    className="submit-post-input"
                                    placeholder="(must be a .jpg URL)"
                                />
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
                            <ol className="rules-ol">
                                <li className="rules-li">Remember the human</li>
                                <li className="rules-li">Behave like you would at a concert</li>
                                <li className="rules-li">Look for the original source of shred</li>
                                <li className="rules-li">Search for duplicates before posting</li>
                                <li className="rules-li">Read the community's rules</li>
                            </ol>
                        </div>
                    </div>
                    <p className="please-be-mindful">
                        Please be mindful of shreddit's content policy<br />
                        and practice good shreddiquette.
                    </p>
                    <HelpLinks />
                </div>
            </div>
        </>
    )
}

export default SubmitPostPage
