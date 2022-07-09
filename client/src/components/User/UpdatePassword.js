import React, { useState, useEffect } from 'react';
import './UpdatePassword.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { editPassword, loadUser, clearErrors } from '../../actions/userAction';
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const { isUpdated, loading, error } = useSelector(
    (state) => state.editProfile
  )
  useEffect(() => {
      if(error){
        alert.error((error));
        dispatch(clearErrors());
      }    
      if(isUpdated){
        alert.success("Password updated successfully")
        dispatch(loadUser());
        dispatch({ type: UPDATE_PASSWORD_RESET });
        navigate('/me');
      }
  }, [dispatch, isUpdated, error]);

  const passwordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(editPassword(myForm));
  };


  return (
    <div>
      <form
        className="edit-password-form"
        onSubmit={passwordSubmit}
      >
        <div className="old-password">
          <input
            type="text"
            name="oldPassword"
            placeholder="Old Password"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="new-password">
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="confirm-password">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Update Details"
          className="signup-btn"
          disabled={loading ? true : false}
        />
      </form>
    </div>
  )
}

export default UpdatePassword