
import React, { useState } from 'react';
import './logout.css';
import { useNavigate } from 'react-router';


function Logout( { username }) {

const [dropdownVisible, setDropdownVisible] = useState(false);
const navigate = useNavigate();

const toggleDropdown = () => {
  setDropdownVisible(!dropdownVisible);
};

const handleLogout = () => {
    navigate('/login');
}

return (
  <div>
    <div className="row">
      <div className="col">
        <div className="image-container">
          <img
            className="card-image"
            src="/Untitled-7-1024.webp"
            alt=""
            onClick={toggleDropdown}
          />
          <span className='username'>{username}</span>
          {dropdownVisible && (
            <div className="dropdown">
              <ul>
                <li onClick={handleLogout}>Log out</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
}

export default Logout;
