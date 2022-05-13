import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getOnePost } from "../../store/posts";

const Post = ({ post }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const currentUser = useSelector(state => state.session.user)

    const [showEditPostForm, setShowEditPostForm] = useState(false)

    const handleEdit = () => {
        setShowEditPostForm(!showEditPostForm)
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
            </div>
        </>
    )
}

export default Post;
