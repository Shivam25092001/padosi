import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Avatar } from "@mui/material";
import "./EditAvatar.css";
import { useNavigate } from "react-router-dom";
import { clearErrors, editAvatar } from "../../actions/userAction";
import { loadUser } from "../../actions/userAction";
import { UPDATE_AVATAR_RESET } from "../../constants/userConstants";
import { useAlert } from "react-alert";

const EditAvatar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { user, loading, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );

  const { error, uploading, isUpdated } = useSelector((state) => state.editAvatar);

  const [ShadowToggle, setShadowToggle] = useState(false);
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");
  const [filename, setFilename] = useState("");

  const AvatarDataChange = (e) => {
    setFilename(e.target.files.item(0).name);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) setAvatarPreview(reader.result);
      setAvatar(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const AvatarSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", user.name);
    myForm.set("email", user.email);
    myForm.set("avatar", avatar);

    dispatch(editAvatar(myForm));
  };


  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    if(isUpdated){
      dispatch(loadUser());
      navigate('/account');

      dispatch({ type: UPDATE_AVATAR_RESET });
    }
  }, [dispatch, uploading, isUpdated, error, isAuthenticated, navigate , alert]);

  return (
    <>
      {
      loading ? (
        <> loading </>
      ) : 
      isAuthenticated ? (
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
            {
              avatarPreview === "" ? (
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
                > + </Avatar>
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
              )
            }
          </Paper>
          <form
            className="edit-avatar-form"
            onSubmit={AvatarSubmit}
            encType="multipart/form-data"
          >
            <div className={filename === "" ? "undefined" : "filename"}>
              {filename === "" ? <i>Select a file for your profile pictue</i> : filename}
            </div>
            <input
              type="submit"
              value = {avatar === undefined ? "Remove" :"Upload"}
              id = {avatar === undefined ? "delete-btn" : "button"}
              className= {uploading ? "button uploading" : "button upload-btn"} 
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
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default EditAvatar;
