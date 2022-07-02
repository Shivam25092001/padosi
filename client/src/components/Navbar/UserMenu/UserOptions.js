import React, { useState } from "react";
import "./UserOptions.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useAlert } from "react-alert";

const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [menuToggle, setMenuToggle] = useState(false);

  const logout = () => {
    dispatch(logoutUser());
    alert.success("Logged Out successfully!")
    navigate("/");
  };

  return (
    <div className="action" onMouseOver={()=> setMenuToggle(!menuToggle)} onMouseOut={()=> setMenuToggle(!menuToggle)}>
    {/* <div className="action"> */}
      <div className="profile" onClick={() => setMenuToggle(!menuToggle)}>
        <Avatar
          className="profile-img"
          alt={user.name}
          src={user.avatar.url}
          sx={{ width: 24, height: 24 }}
        />
        <p>{user.name}</p>
      </div>
      <div className={menuToggle ? "menu active" : "menu"}>
        <ul>
          <li>
            <Link to="/me">
              <img src="/icons/user.svg" />
              My profile
            </Link>
          </li>

          <li>
            <Link to="/me/edit-avatar#">
              <img src="/icons/settings.svg" />
              Edit profile
            </Link>
          </li>

          <li>
            <a href="#">
              <img src="/icons/cart.svg" />
              Cart
            </a>
          </li>

          <li onClick={logout}>
            <a href="#">
              <img src="/icons/logout.svg" />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserOptions;
