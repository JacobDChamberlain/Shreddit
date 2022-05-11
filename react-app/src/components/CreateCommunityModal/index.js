import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateCommunityForm from "./CreateCommunityForm";

function CreateCommunityFormModal() {
    const [showModal, setShowModal] = useState(false);

    const showCommunityForm = () => {
        setShowModal(false)
    }

    return (
        <>
            <button className="create-community-home-button" onClick={() => setShowModal(true)}>Create Community</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateCommunityForm showCommunityForm={showCommunityForm} />
                </Modal>
            )}
        </>
    )
}

export default CreateCommunityFormModal;
