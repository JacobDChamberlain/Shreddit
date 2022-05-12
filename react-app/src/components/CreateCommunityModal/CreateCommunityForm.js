import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCommunity } from "../../store/communities";


const CreateCommunityForm = ({ showCommunityForm }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const currentUser = useSelector(state => state.session.user);

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
        if (name.includes(' ')) errors.push("Community names cannot have spaces.")
        if (description.length === 0) errors.push("Please enter a description for your community.")
        if (description.length > 500) errors.push("Please keep your description under 500 characters.")
        // if (category.includes('--')) errors.push("Please select a category.")

        setValidationErrors(errors)

    }, [name, description, category])

    const handleSubmit = async (e) => {

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

            if (data && data.errors) {
                setValidationErrors(data.errors)

                return
            } else {
                setShowErrors(false)

                // history.push('/')
            }
        } else {
            setShowErrors(true)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        showCommunityForm(false);
        // history.push('/')
    }

    return (
        <div className="create-community-form-container">
            <form className="create-community-form">
                <h3 className="create-community-form-header">Create a community</h3>
                {showErrors && <div>
                    {validationErrors.map((error, idx) => (
                        <div className="error-text" key={idx}>{error}</div>
                    ))}
                </div>}
                <label>Name:{' '}
                    <input
                        type='text'
                        name='name'
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>Description:{' '}
                    <input
                        type='text'
                        name='description'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                </label>
                <label>Community Picture:{' '}
                    <input
                        type='text'
                        name='communityPic'
                        onChange={e => setCommunityPic(e.target.value)}
                        value={communityPic}
                    />
                </label>
                <label>Category:{' '}
                    <select
                        name='category'
                        onChange={e => setCategory(e.target.value)}
                        value={category}
                        required={true}
                        // defaultValue={(e) =>setCategory(e.target.value)}
                    >
                        {/* <option defaultValue>{'--'}</option> */}
                        <option selected value="Classical">Classical</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Hair Metal">Hair Metal</option>
                        <option value="Virtuoso">Virtuoso</option>
                        <option value="Speed Metal">Speed Metal</option>
                        <option value="Bluegrass">Bluegrass</option>
                        <option value="Metal">Metal</option>
                        <option value="Country">Country</option>
                        <option value="Death Metal">Death Metal</option>
                    </select>
                </label>
                <div className="community-form-buttons">
                    <button className="cancel-create-community-button" onClick={handleCancel}>Cancel</button>
                    <button className="create-community-form-button" onClick={handleSubmit} type='submit'>Create Community</button>
                </div>
            </form>
        </div>
    )
}

export default CreateCommunityForm
