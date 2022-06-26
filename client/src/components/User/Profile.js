import React from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );

  return (
    <>
      {loading ? (
        <>loading</>
      ) : isAuthenticated ? (
        <div className="user-info-box">
          {user.name}
          {user.email}
          {user && <img src={user.avatar.url} alt="Profile-picture" />}
          {user.rating}
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default Profile;
