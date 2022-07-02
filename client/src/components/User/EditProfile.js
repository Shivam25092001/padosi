import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EditProfile.css"
import { editProfile, loadUser, clearErrors } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector(
        (state) => state.userDetails
    );
    const { isUpdated, loading, error } = useSelector(
        (state) => state.editProfile
    )
    useEffect(() => {
        if(error){
            alert.error((error));
            dispatch(clearErrors());
        }    
        if(isUpdated){
            dispatch(loadUser());
            dispatch({ type: UPDATE_PROFILE_RESET });
            navigate('/account');
        }
    }, [dispatch, isUpdated, error, user]);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [Address, setaddress] = useState({
        address : user.address===undefined ? "" : user.address.address,
        city: user.address===undefined ? "" : user.address.city,
        state: user.address===undefined ? "" : user.address.state,
        country: user.address===undefined ? "" : user.address.country,
        pinCode: user.address===undefined ? "" : user.address.pinCode,
        phoneNumber: user.address===undefined ? "" : user.address.phoneNumber
    });

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("address", 
            JSON.stringify({
                address: Address.address,
                city: Address.city,
                state: Address.state,
                country: Address.country,
                pinCode: Address.pinCode,
                phoneNumber: Address.phoneNumber
            }));

        dispatch(editProfile(myForm));
    };

    const registerNewAddress = (e)=>{
        setaddress({ ...Address, [e.target.name] : e.target.value });
    }


  return (
    <div className="edit-profile">
      <form
        className="edit-profile-form"
        onSubmit={registerSubmit}
      >
        <div className="signup-name">
          <input
            type="text"
            name="name"
            placeholder={user.name}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="signup-email">
          <input
            type="email"
            name="email"
            placeholder={user.email}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
    
        {/* address */}
        <div className="signup-email">
          <input
            type="text"
            name="address"
            placeholder={user.address === undefined ? "House/ Flat number &#38; street" : user.address.address}
            value={Address.address}
            onChange={registerNewAddress}
          />
        </div>

        <div className="signup-email">
          <input
            type="text"
            name="city"
            placeholder={user.address === undefined ? "City" : user.address.city}
            value={Address.city}
            onChange={registerNewAddress}
          />
        </div>

        <div className="signup-email">
          <input
            type="text"
            name="state"
            placeholder={user.address === undefined ? "State" : user.address.state}
            value={Address.state}
            onChange={registerNewAddress}
          />
        </div>

        <div className="signup-email">
          <input
            type="text"
            name="country"
            placeholder={user.address === undefined ? "Country" : user.address.country}
            value={Address.country}
            onChange={registerNewAddress}
          />
        </div>

        <div className="signup-email">
          <input
            type="text"
            name="pinCode"
            placeholder={user.address === undefined ? "Pin Code" : user.address.pinCode}
            value={Address.pinCode}
            onChange={registerNewAddress}
          />
        </div>

        <div className="signup-email">
          <input
            type="tel" 
            name="phoneNumber"
            placeholder={user.address === undefined ? "Phone Number" : user.address.phoneNumber}
            value={Address.phoneNumber}
            onChange={registerNewAddress}
          />
        </div>

        <input
          type="submit"
          value="Register"
          className="signup-btn"
          disabled={loading ? true : false}
        />
      </form>
    </div>
  );
};

export default EditProfile;
