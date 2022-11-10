import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction.js';
import { useAlert } from 'react-alert';

const ResetPassword = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { token } = useParams();
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // useEffect(() => {
    //     dispatch(resetPassword(token, password, confirmPassword));
    // }, [dispatch, token]);
    const { error, success, loading } = useSelector(
      (state) => state.resetPassword
    );

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors);
      }

      if(success){
        alert.success("Password reset successfull");

      }
    },[dispatch, error, alert, success]);

    const passwordSubmit = (e) => {
      e.preventDefault();
  
      dispatch(resetPassword(token, password, confirmPassword));
    };

  return (
    <div>
      <form
        className="edit-password-form"
        onSubmit={passwordSubmit}
      >
        <div className="new-password">
          <input
            type="password"
            name="Password"
            placeholder="New Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          value="Reset Password"
          className="signup-btn"
          // disabled={loading ? true : false}
        />
      </form>
    </div>
    
  )
}

export default ResetPassword