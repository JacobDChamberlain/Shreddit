import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Posts/Post';
import HelpLinks from './HelpLinks/HelpLinks';
import './User.css'

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className='user-profile-page-container'>
      <div className='user-profile-page-left'>
        <div className="sort-buttons-container">
            - 'sort posts by' buttons here -
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
              <strong>Profile Picture</strong> <img src={user.profile_pic}></img>
            </li>}
          </ul>
        </div>
        <div className='moderator-of-container'>
          <h4>You're a moderator of these communities</h4>

        </div>
        <HelpLinks />
      </div>
    </div>
  );
}
export default User;
