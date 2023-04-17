import React, { useState , useEffect} from 'react';
import {Link ,useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import './Navbar.css';
import UserOptions from './UserMenuDropdown/UserOptions';

export default function Navbar() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [toggle, setToggle] = useState(false);
    const { loading, user, isAuthenticated } = useSelector( state => state.userDetails);

    const searchSubmitHandler = (e)=>{
        e.preventDefault();

        if(keyword.trim()){
            navigate(`/rent-in/${keyword}`);
        }
        else{
            navigate(`/rent-in`);
        } 

        e.target.reset();
    }


    return (
        <nav className="Navbar">
            <div className="top-section">
                <div className="logo"><Link to='/'>padosi</Link></div>
                <div className="login-info">
                    {
                        isAuthenticated 
                        ? <UserOptions user={ user } />
                        : <Link to='/login'>Login</Link>
                    }
                </div>
                {/* hamburger-icon */}
                <div className={toggle ? "burger-active" : "burger"} onClick={()=> setToggle(!toggle)}>
                    <div className="line-1"></div>
                    <div className="line-2"></div>
                    <div className="line-3"></div>
                </div>
            </div>
            <div className={toggle ? "bottom-section-active" : "bottom-section"}>
                <ul className="nav-links">
                    <li className="nav-link"><Link to='/rent-in' onClick={()=> setToggle(!toggle)}>All</Link></li>
                    <li className="nav-link"><Link to='#' onClick={()=> setToggle(!toggle)}>Frequent Rentals</Link></li>
                    <li className="nav-link"><Link to='#' onClick={()=> setToggle(!toggle)}>Motor-Vehicles</Link></li>
                    <li className="nav-link"><Link to='#' onClick={()=> setToggle(!toggle)}>Hardware</Link></li>
                    <li className="nav-link nav-search">
                        <form className="search-box" onSubmit={searchSubmitHandler}>
                        <input className="search-input" type="text" placeholder="Search" onChange={(e)=>setKeyword(e.target.value)}/>
                        <input className="search-button" type="submit" value=" Q "/>
                        </form>
                    </li>
                    <li className="nav-link nav-login" onClick={()=> setToggle(!toggle)}>
                        <div className="login-info">
                            {
                                isAuthenticated 
                                ? <UserOptions user={ user } />
                                : <Link to='/login'>Login</Link>
                            }
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}