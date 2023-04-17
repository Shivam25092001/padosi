import React, { useState } from "react";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { loadUser, clearErrors } from "../../actions/userAction";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Loading from "../Loading/loading";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );

  const [ShadowToggle_editProfile, setShadowToggle_editProfile] = useState(false);
  const [ShadowToggle_password, setShadowToggle_password] = useState(false);
  const [ShadowToggle_orders, setShadowToggle_orders] = useState(false);
  const [ShadowToggle_supplies, setShadowToggle_supplies] = useState(false);

  return (
    <>
      {loading ? (
        <>
          <Loading/>
        </>
      ) : isAuthenticated ? (
        <div className="user-info-box">
          <div className="basic-left-pane">
            <Avatar
              className="avatar"
              alt={user.name}
              src={user.avatar.url}
              sx={{ width: 200, height: 200 }}
            />
            <Link to="/me/edit-avatar"><button className="edit-avatar-btn tooltip"><div className="tooltiptext">Edit avatar</div>+</button></Link>
            <h1 className="user-name">{user.name}</h1>
            <p className="email-id">{user.email}</p>
          </div>

          <div className="main-right-pane">
            <h1>Your account</h1>
            {user.address ? (
              <div>
                <h4>Current Address: </h4>
                <p>
                  <i>
                    {user.address.address}, {user.address.city},{" "}
                    {user.address.state}, {user.address.country}
                  </i>
                  , {user.address.pinCode}
                </p>
              </div>
            ) : (
              <div>
                <p><Link to="edit-profile">Add your address info here</Link></p>
              </div>
            )}

            <div className="links">
              <Link to="edit-profile" style={{ textDecoration: "none" }}>
                <Paper
                  onMouseOver={() =>
                    setShadowToggle_editProfile(!ShadowToggle_editProfile)
                  }
                  onMouseOut={() =>
                    setShadowToggle_editProfile(!ShadowToggle_editProfile)
                  }
                  variant={ShadowToggle_editProfile ? "elevation" : "outlined"}
                  className="card"
                  elevation={ShadowToggle_editProfile ? 3 : 0}
                  sx={{ margin: 2, padding: 2 }}
                >
                  Edit Profile
                  <p className="info">Edit login, name, and address</p>
                </Paper>
              </Link>
              <Link to="password/update" style={{ textDecoration: "none" }}>
                <Paper
                  onMouseOver={() =>
                    setShadowToggle_password(!ShadowToggle_password)
                  }
                  onMouseOut={() =>
                    setShadowToggle_password(!ShadowToggle_password)
                  }
                  variant={ShadowToggle_password ? "elevation" : "outlined"}
                  className="card"
                  elevation={ShadowToggle_password ? 3 : 0}
                  sx={{ margin: 2, padding: 2 }}
                >
                  Change Passowrd
                  <p className="info">Manage login password</p>
                </Paper>
              </Link>
              <Link to="/under-construction" style={{ textDecoration: "none" }}>
                <Paper
                  onMouseOver={() =>
                    setShadowToggle_orders(!ShadowToggle_orders)
                  }
                  onMouseOut={() =>
                    setShadowToggle_orders(!ShadowToggle_orders)
                  }
                  variant={ShadowToggle_orders ? "elevation" : "outlined"}
                  className="card"
                  elevation={ShadowToggle_orders ? 3 : 0}
                  sx={{ margin: 2, padding: 2 }}
                >
                  Your Orders
                  <p className="info">Track, return, or buy things again</p>
                </Paper>
              </Link>
              <Link to="/under-construction" style={{ textDecoration: "none" }}>
                <Paper
                  onMouseOver={() =>
                    setShadowToggle_supplies(!ShadowToggle_supplies)
                  }
                  onMouseOut={() =>
                    setShadowToggle_supplies(!ShadowToggle_supplies)
                  }
                  variant={ShadowToggle_supplies ? "elevation" : "outlined"}
                  className="card"
                  elevation={ShadowToggle_supplies ? 3 : 0}
                  sx={{ margin: 2, padding: 2 }}
                >
                  Your Supplies
                  <p className="info">Edit, remove supplies from Rent-out</p>
                </Paper>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default Profile;
