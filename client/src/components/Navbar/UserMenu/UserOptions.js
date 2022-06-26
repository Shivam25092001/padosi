import React, { useState } from 'react';
import "./UserOptions.css";
import { useDispatch } from 'react-redux';
import { logoutUser } from "../../../actions/userAction";
import { Link, useNavigate } from 'react-router-dom';

const UserOptions = ({user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuToggle, setMenuToggle] = useState(false);

    const logout = ()=>{
        dispatch(logoutUser());
        navigate('/');
        // 8:33:22 / 15:57:56
    }
    
  return (
    // <div className="action" onMouseOver={()=> setMenuToggle(!menuToggle)} onMouseOut={()=> setMenuToggle(!menuToggle)}>
    <div className="action">
        <div className="profile" onClick={()=> setMenuToggle(!menuToggle)}>
            <img src={user.avatar.url} /> <p>{user.name}</p> 
        </div>
        <div className={menuToggle ? "menu active" : "menu"} >
            <ul>
                <li>
                    <img src="/icons/user.svg" /><Link to='/account'>My profile</Link>
                </li>
                <li>
                    <img src="/icons/settings.svg" /><a href="#">Edit profile</a>
                </li>
                <li>
                    <img src="/icons/cart.svg" /><a href="#">Cart</a>
                </li>
                <li onClick={logout}>
                    <img src="/icons/logout.svg" /><a href="#">Logout</a>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default UserOptions