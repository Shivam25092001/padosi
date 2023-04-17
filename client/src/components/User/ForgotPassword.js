import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ForgotPassword.css";
import { useDispatch } from "react-redux";
import { forgotPassword, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const {loading, message, error } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    else if (!loading && message !== undefined) {
      alert.success(message);
    }
  }, [dispatch, loading, message, error]);

  const emailSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);

    dispatch(forgotPassword(myForm));
  };

  return (
    <div className="forgot-password">
      forgotPassword
      <form className="edit-password-form" onSubmit={emailSubmit}>
        <div className="old-password">
          <input
            type="text"
            name="email"
            placeholder="Email or Username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Send Reset Token Key"
          className="signup-btn"
          disabled={loading ? true : false}
        />
        {message !== undefined ? 
        <div>Check your registered mail ID for resetting the password</div>
        :<div></div>
        }
      </form>
    </div>
  );
};

export default ForgotPassword;
