import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Post from './Posts/Post';
import HelpLinks from './HelpLinks/HelpLinks';
import './User.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserPosts } from '../store/posts';
import { getAllUserCommunities } from '../store/communities'
import { getUserInfo, updateUserInfo } from '../store/userInfo'
import brokenLinkAvatar from "../images/shreddit_avatar.png"
import { MdModeEditOutline } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti';
import { IoSaveSharp } from 'react-icons/io5';



function User() {
  // const [user, setUser] = useState({});
  const { userId }  = useParams();

  // const [posts, setPosts] = useState([])

  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)
  const posts = useSelector(state => Object.values(state.posts))
  const communities = useSelector(state => Object.values(state.communities))
  const userInfo1 = useSelector(state => Object.values(state.userInfo))

  const userInfo = userInfo1[0]
  communities.reverse()

  useEffect(() => {
    dispatch(getAllUserPosts(userId))
    dispatch(getAllUserCommunities(userId))
    dispatch(getUserInfo(userId))
  }, [dispatch])

  posts.reverse()

  const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
  const [profilePic, setProfilePic] = useState(user.profile_pic);
  const [validationErrors, setValidationErrors] = useState([]);


  const handleSubmitEditedUserInfo = async (e) => {
    e.preventDefault();

    const editedUser = {
      id: user?.id,
      username: user?.username,
      email: user?.email,
      profile_pic: profilePic,
    }

    const data = await dispatch(updateUserInfo(editedUser))
    if (data) {
        setValidationErrors(data)
    } else {
        setValidationErrors([])
        setShowUpdateUserForm(false)
    }
  }


  const addDefaultImageSrc = (e) => {
    e.target.src = brokenLinkAvatar;
  }


  return (
    <div className='user-profile-page-container'>

      <div className='user-profile-page-left'>

        <div className="all-posts-container-user-page">
            {posts.map(post => (
                <Post key={post.id} post={post} communityId={post.community_id} />
            ))}
        </div>

      </div>

      <div className='user-profile-page-right'>

        <div className='user-info-container'>

          <ul className='user-info-ul'>
            <li>
              <strong>Username</strong> {userInfo?.username}
            </li>
            <li>
              <strong>Email</strong> {userInfo?.email}
            </li>
            {userInfo?.profile_pic
            &&
            <li>
              <strong>Profile Picture</strong> <img className='user-profile-pic' src={userInfo?.profile_pic} onError={addDefaultImageSrc}></img>
            </li>}
          </ul>

          {user?.id === userInfo?.id
          &&
          <MdModeEditOutline className='icon' onClick={() => setShowUpdateUserForm(true)} />}

        </div>

        {showUpdateUserForm
        &&
        <div className='update-user-form-container'>
          <form className='update-user-info-form'>
            <div>
                {validationErrors.map((error, idx) => (
                    <div className="error-text" key={idx}>{error}</div>
                ))}
            </div>
            <label>
                New Profile Picture: {' '}
                <input
                    type='text'
                    name='profilePic'
                    onChange={e => setProfilePic(e.target.value)}
                    defaultValue={user?.profile_pic}
                />
            </label>
            <div className="edit-post-form-buttons">
                <TiCancel className="icon" onClick={() => setShowUpdateUserForm(false)}>Cancel</TiCancel>
                <IoSaveSharp className="icon" onClick={handleSubmitEditedUserInfo}>Save</IoSaveSharp>
            </div>
          </form>
        </div>}

        {communities.length > 0
        &&
        <div className='moderator-of-container'>
          <h4 className='sugg-h4'>You're a moderator of these communities:</h4>
              {communities?.map(community => (
                <li className="community-mod-li" key={community.id}>
                    {community.community_pic && <img onError={addDefaultImageSrc} className="comm-suggestion-pic" src={community.community_pic}></img>}
                    <NavLink className='comm-sugg' to={`/sh/${community.name}/${community.id}`} key={community.id}>{community.name}</NavLink>
                </li>
              ))}
        </div>}

        <HelpLinks />

      </div>

    </div>
  );
}
export default User;
