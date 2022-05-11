import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommunity } from "../../store/communities";


const CreateCommunityForm = ({ showCommunityForm }) => {

    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);

    const [validationErrors, setValidationErrors] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [communityPic, setCommunityPic] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const community = {
            name: name,
            description: description,
            community_pic: communityPic,
            category: category,
            user_id: currentUser.id
        };

        dispatch(createCommunity(community));

        showCommunityForm();
    }

    return (
        <div className="create-community-form-container">
            <form className="create-community-form">
                <div>
                    {validationErrors.map((error, idx) => (
                        <div key={idx}>{error}</div>
                    ))}
                </div>
                <label>Name
                    <input
                        type='text'
                        name='name'
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>Description
                    <input
                        type='text'
                        name='description'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                </label>
                <label>Community Picture
                    <input
                        type='text'
                        name='communityPic'
                        onChange={e => setCommunityPic(e.target.value)}
                        value={communityPic}
                    />
                </label>
                <label>Category
                    <select
                        name='category'
                        onChange={e => setCategory(e.target.value)}
                        value={category}
                    >
                        <option>Classical</option>
                        <option>Jass</option>
                        <option>Hair Metal</option>
                        <option>Virtuoso</option>
                        <option>Speed Metal</option>
                        <option>Bluegrass</option>
                        <option>Metal</option>
                        <option>Country</option>
                        <option>Death Metal</option>
                    </select>
                </label>
                <button className="cancel-create-community-button" onClick={showCommunityForm}>Cancel</button>
                <button className="create-community-form-button" onClick={handleSubmit} type='submit'>Create Community</button>
            </form>
        </div>
    )
}

export default CreateCommunityForm
