import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Post from './Posts/Post';
import HelpLinks from './HelpLinks/HelpLinks';
import './User.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserPosts } from '../store/posts';
import { getAllUserCommunities } from '../store/communities'
import { getUserInfo } from '../store/userInfo'
import brokenLinkAvatar from "../images/shreddit_avatar.png"
import { MdModeEditOutline } from 'react-icons/md'
import { IoSaveSharp } from 'react-icons/io5'
import { TiCancel } from 'react-icons/ti'



function User() {
  // const [user, setUser] = useState({});
  const { userId }  = useParams();

  // const [posts, setPosts] = useState([])
  const [showEditUserInfoForm, setShowEditUserInfoForm] = useState(false);


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

  const [imageUrl, setImageUrl] = useState(userInfo.profile_pic);
  const [validationErrors, setValidationErrors] = useState([]);

  posts.reverse()
  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   (async () => {
  //     const response = await fetch(`/api/users/${userId}`);
  //     const user = await response.json();
  //     setUser(user);
  //     // const res = await fetch(`/api/posts/users/${userId}`);
  //     // const postsRes = await res.json();
  //     // setPosts(postsRes)
  //   })();
  // }, [userId]);

  // if (!user) {
  //   return null;
  // }

  // const user = useSelector(state => state.session.user)
  // const posts = useSelector(state => Object.values(state.posts))

  // useEffect(() => {
  //   dispatch(getAllPosts())
  // }, [dispatch])

  // const posts = useSelector(state => Object.values(state.posts))



  const addDefaultImageSrc = (e) => {
    e.target.src = brokenLinkAvatar;
  }


  const handleSubmitNewUserProfilePic = async (e) => {
    e.preventDefault();

    const editedUser = {
        id: userInfo?.id,
        username: userInfo?.username,
        email: userInfo?.email
    }
    // if (validationErrors.length === 0) {

    //     const data = await dispatch(updatePost(editedPost));
    //     console.log("data return from dispatch--->", data)

    //     setShowEditPostForm(false)

    //     if (data) {
    //         setValidationErrors(data)

    //         return
    //     } else {
    //         setShowErrors(false)
    //     }
    // } else {
    //     setShowErrors(true)
    // }


    // create user thunk and api routes and such to edit user

    const data = await dispatch(updateUser(editedUser))
    if (data) {
        setValidationErrors(data)
        console.log("post data", data)
    } else {
        setValidationErrors([])
        setShowEditUserInfoForm(false)
        // history.push(`/sh/${communityName}/${communityId}`)
    }
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
              <strong>Profile Picture</strong> <img className='user-profile-pic' src={userInfo?.profile_pic}></img>
            </li>}
          </ul>
          <MdModeEditOutline className='icon' onClick={() => setShowEditUserInfoForm(!showEditUserInfoForm)} />
        </div>

        {showEditUserInfoForm
        &&
        <div className='edit-user-info-form-container'>
          <form className='edit-user-info-form'>
            <label>
                New Profile Pic: {' '}
                <input
                    placeholder='must be a .jpg URL'
                    type='text'
                    name='imageUrl'
                    onChange={e => setImageUrl(e.target.value)}
                    defaultValue={userInfo?.profile_pic}
                />
            </label>
            <div className="edit-post-form-buttons">
                <TiCancel className="cancel-icon" onClick={() => setShowEditUserInfoForm(false)}>Cancel</TiCancel>
                <IoSaveSharp className="save-icon" >Save</IoSaveSharp>
            </div>
          </form>
        </div>}

        {communities.length > 0 && <div className='moderator-of-container'>
          <h4 className='sugg-h4'>You're a moderator of these communities:</h4>
              {communities.map(community => (
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
