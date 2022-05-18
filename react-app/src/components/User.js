import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Posts/Post';
import HelpLinks from './HelpLinks/HelpLinks';
import './User.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserPosts } from '../store/posts';

function User() {
  // const [user, setUser] = useState({});
  const { userId }  = useParams();

  // const [posts, setPosts] = useState([])

  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)
  const posts = useSelector(state => Object.values(state.posts))

  useEffect(() => {
    dispatch(getAllUserPosts(userId))
  }, [dispatch])

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

  return (
    <div className='user-profile-page-container'>
      <div className='user-profile-page-left'>
        <div className="all-posts-container">
            {posts.map(post => (
                <Post key={post.id} post={post} communityId={post.community_id} />
            ))}
        </div>
      </div>
      <div className='user-profile-page-right'>
        <div className='user-info-container'>
          <ul className='user-info-ul'>
            <li>
              <strong>User Id</strong> {userId}
            </li>
            <li>
              <strong>Username</strong> {user.username}
            </li>
            <li>
              <strong>Email</strong> {user.email}
            </li>
            {user.profile_pic && <li>
              <strong>Profile Picture</strong> <img className='user-profile-pic' src={user.profile_pic}></img>
            </li>}
          </ul>
        </div>
        <div className='moderator-of-container'>
          <h4>You're a moderator of these communities</h4>
              - list communities created by user here -
              {/* {user.communities.map(community => (
                <li key={community.id}>{community.name}</li>
              ))} */}
        </div>
        <HelpLinks />
      </div>
    </div>
  );
}
export default User;
