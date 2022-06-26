import React, {useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import "./Login.css";
import {useDispatch, useSelector} from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import {useAlert} from 'react-alert';

// {
//     "email":"rsraider@gmail.com",
//     "password":"asdfghjkl"
// }

const Login = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email : "",
        password : "",
    });
    const { name, email, password } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/logo512.png");

    const { loading, error, isAuthenticated } = useSelector( state => state.userDetails);

    const loginSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
       
        dispatch(register(myForm));
    };


    const registerDataChange = (e)=>{
        if(e.target.name === "avatar"){
            const reader = new FileReader();
            reader.onload = ()=>{
                if(reader.readyState === 2)
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
            };

            reader.readAsDataURL(e.target.files[0]);

        } else{
            setUser({ ...user, [e.target.name] : e.target.value });
        }
    };

 
    useEffect(() => {
      if(error){
        alert.error((error));
        dispatch(clearErrors)
      }


      if(isAuthenticated){
        navigate(`/account`);
      }
    }, [dispatch, alert, error, isAuthenticated, loading, navigate])
    

    const switchTabs = (e, tab) => {
        if( tab === "login" ){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if( tab === "register" ){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };


  return (
    <div>
        <div className="login-container">
            <div className="login-signup-box">
                <div>
                    <div className="login-signup-toggle">
                        <p onClick={(e) => switchTabs(e, 'login')} >LOGIN</p>
                        <p onClick={(e) => switchTabs(e, 'register')} >REGISTER</p>
                    </div>
                    <button ref={switcherTab} />
                </div>

                <form className="login-form" ref={loginTab} onSubmit={loginSubmit}>
                    <div className="login-email">
                        <MailOutlineIcon />
                        <input type="email" placeholder='Email'
                        required
                        value={loginEmail}
                        onChange={e  => setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className="login-password">
                        <LockOpenIcon />
                        <input type="password" placeholder='Password'
                        required
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        />
                    </div>
                    <Link to="/password/forgot">Forgot Password ?</Link>
                    <input type="submit" value="Login" className="login-btn" />
                </form>

                <form className="signup-form" ref={registerTab} onSubmit={registerSubmit} encType="multipart/form-data">
                    <div className="signup-name">
                        <FaceIcon />
                        <input type="text" name="name" 
                        placeholder='Name'
                        required
                        value={name}
                        onChange={registerDataChange} />
                    </div>

                    <div className="signup-email">
                        <MailOutlineIcon />
                        <input type="email" name="email" 
                        placeholder='Email'
                        required 
                        value={email}
                        onChange={registerDataChange} />
                    </div>

                    <div className="signup-password">
                        <LockOpenIcon />
                        <input type="password" name="password" 
                        placeholder='Passowrd'
                        required
                        value={password}
                        onChange={registerDataChange} />
                    </div>

                    <div id="register-image">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        
                        <input type="file" 
                        name = "avatar"
                        accept = "image/*"
                        onChange = {registerDataChange} />

                    </div>

                    <input type="submit"
                    value="Register"
                    className="signup-btn"
                    disabled= {loading ? true : false} />
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login