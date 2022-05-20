import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCommunity } from "../../store/communities";
import './CreateCommunity.css'


const CreateCommunityForm = ({ showCommunityForm }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const currentUser = useSelector(state => state.session.user);
    const communities = Object.values(useSelector(state => state.communities))
    const communityNames = communities.map(community => community.name)

    const [validationErrors, setValidationErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [communityPic, setCommunityPic] = useState("");
    const [category, setCategory] = useState("Classical");

    useEffect(() => {

        const errors = [];

        if (name.length === 0) errors.push("Please enter a name for your new community")
        if (name.length > 21) errors.push("Please keep community names under 21 characters.")
        if (communityNames.includes(name)) errors.push(`Community ${name} already exists.`)
        if (name.includes(' ')) errors.push("Community names cannot have spaces.")
        if (description.length === 0) errors.push("Please enter a description for your community.")
        if (description.length > 500) errors.push("Please keep your description under 500 characters.")
        if (communityPic.length > 0 && !communityPic.includes('jpg')) errors.push("Image must be a .jpg")

        setValidationErrors(errors)

    }, [name, description, category, communityPic])

    const handleSubmit = async (e) => {

        // if (!communityPic) setCommunityPic("https://bbts1.azureedge.net/images/p/full/2021/08/e1a029ef-58be-4f6f-84ed-06172f325047.jpg")

        e.preventDefault();

        const community = {
            name: name,
            description: description,
            community_pic: communityPic,
            category: category,
            user_id: currentUser.id
        };

        if (validationErrors.length === 0) {
            const data = await dispatch(createCommunity(community));

            showCommunityForm();

            if (data) {
                setValidationErrors(data)

                return
            } else {
                setShowErrors(false)
            }
        } else {
            setShowErrors(true)
        }
        // const data = await dispatch(createCommunity(community));
        // if (data) {
        //     setValidationErrors(data)
        // } else {
        //     setValidationErrors([])
        //     // history.push(`/sh/${communityName}/${communityId}`)
        //     // history.push('/')
        //     showCommunityForm();
        // }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        showCommunityForm(false);
    }

    useEffect(() => {
        return () => {
            setName("")
            setDescription("")
            setCommunityPic("")
            setCategory("Classical")
        }
    }, [])

    return (
        <div className="create-community-form-container">
            <form className="create-community-form">
                <div className="create-community-form-header">Create a community</div>
                {showErrors && <div>
                    {validationErrors.map((error, idx) => (
                        <div className="error-text" key={idx}>{error}</div>
                    ))}
                </div>}
                <label>Name</label>
                <div className="name-info">Community names including capitalization cannot be changed.</div>
                    <input
                        type='text'
                        name='name'
                        onChange={e => setName(e.target.value)}
                        value={name}
                        placeholder="Required*"
                        className="create-comm-input"
                    />

                <label>Description</label>
                    <input
                        type='text'
                        name='description'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        placeholder="Required*"
                        className="create-comm-input"
                    />

                <label>Community Picture</label>
                    <input
                        type='text'
                        name='communityPic'
                        onChange={e => setCommunityPic(e.target.value)}
                        value={communityPic}
                        placeholder="(Optional; image must be a .jpg URL)"
                        className="create-comm-input"
                    />
                <label>Category</label>
                    <select
                        name='category'
                        onChange={e => setCategory(e.target.value)}
                        value={category}
                        className="create-comm-input"
                    >
                        <option value="Classical">Classical</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Hair Metal">Hair Metal</option>
                        <option value="Virtuoso">Virtuoso</option>
                        <option value="Speed Metal">Speed Metal</option>
                        <option value="Bluegrass">Bluegrass</option>
                        <option value="Metal">Metal</option>
                        <option value="Country">Country</option>
                        <option value="Death Metal">Death Metal</option>
                    </select>
                <div className="community-form-buttons">
                    <button className="cancel-create-community-button" onClick={handleCancel}>Cancel</button>
                    <button className="create-community-form-button" onClick={handleSubmit} type='submit'>Create Community</button>
                </div>
            </form>
        </div>
    )
}

export default CreateCommunityForm
