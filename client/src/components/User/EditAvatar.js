import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Avatar } from "@mui/material";
import "./EditAvatar.css";
import { useNavigate } from "react-router-dom";
import { clearErrors, editAvatar } from "../../actions/userAction";
import { loadUser } from "../../actions/userAction";
import { UPDATE_AVATAR_RESET } from "../../constants/userConstants";
import { useAlert } from "react-alert";
import Loading from "../Loading/loading";

const EditAvatar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { user, loading, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );

  const { error, uploading, isUpdated } = useSelector(
    (state) => state.editAvatar
  );

  const [ShadowToggle, setShadowToggle] = useState(false);
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");
  const [filename, setFilename] = useState("");

  const AvatarDataChange = (e) => {
    if (e.target.files.item(0).size > 1 * 1024 * 1024) {
      alert.info(`Your file is greater than 1Mb`);
    }

    if (e.target.files[0] && e.target.files.item(0).size < 1 * 1024 * 1024)
      setFilename(e.target.files.item(0).name);

    const reader = new FileReader();
    reader.onload = () => {
      if (
        reader.readyState === 2 &&
        e.target.files.item(0).size < 1 * 1024 * 1024
      ) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  };

  const AvatarSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", user.name);
    myForm.set("email", user.email);
    myForm.set("avatar", avatar);
    myForm.set("address", user.address ? JSON.stringify(user.address) : "{}");

    dispatch(editAvatar(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch(loadUser());
      navigate("/me");

      dispatch({ type: UPDATE_AVATAR_RESET });
    }
  }, [dispatch, uploading, isUpdated, error, isAuthenticated, navigate, alert]);

  return loading ? (
    <><Loading/></>
  ) : (
    <div className="edit-avatar">
      <h1>Edit Profile Picture</h1>
      <div className="main-edit-section">
        <Paper
          onMouseOver={() => setShadowToggle(!ShadowToggle)}
          onMouseOut={() => setShadowToggle(!ShadowToggle)}
          variant={ShadowToggle ? "outlined" : "elevation"}
          className="avatar-upload-card"
          elevation={ShadowToggle ? 0 : 8}
          sx={{
            margin: 2,
          }}
        >
          {avatarPreview === "" ? (
            // <p> + </p>
            <Avatar
              className="fallback-pic"
              variant="rounded"
              src={null}
              alt="Avatar Preview"
              sx={{
                height: 1 / 1,
                width: 1 / 1,
              }}
            >
              {" "}
              +{" "}
            </Avatar>
          ) : (
            <Avatar
              variant="rounded"
              src={avatarPreview}
              alt="Avatar Preview"
              sx={{
                height: 1 / 1,
                width: 1 / 1,
              }}
            />
          )}
        </Paper>
        <form
          className="edit-avatar-form"
          onSubmit={AvatarSubmit}
          encType="multipart/form-data"
        >
          <div className={filename === "" ? "undefined" : "filename"}>
            {filename === "" ? (
              <i>Select a file for your profile pictue</i>
            ) : (
              filename
            )}
            <div className="instruction">
              <i style={{ fontSize: "smaller" }}>
                *file-size must be less than 1Mb
              </i>
            </div>
          </div>

          <input
            type="submit"
            value="Upload"
            id={avatar === undefined ? "disabled-btn" : "button"}
            className={uploading ? "button uploading" : "button upload-btn"}
            disabled={uploading ? true : false}
          />
          <input
            className="button type-file-btn"
            type="file"
            name="avatar"
            accept="image/*"
            onChange={AvatarDataChange}
          />
          <br />
        </form>
      </div>
    </div>
  );
};

export default EditAvatar;
