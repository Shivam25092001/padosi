import React, { useState , useEffect} from 'react';
import {Link ,useNavigate} from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const [keyword, setKeyword] = useState("");

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
                <div className="logo">padosi</div>
                <div className="login-info">Login</div>
                {/* hamburger-icon */}
                <div className={toggle ? "burger-active" : "burger"} onClick={()=> setToggle(!toggle)}>
                    <div className="line-1"></div>
                    <div className="line-2"></div>
                    <div className="line-3"></div>
                </div>
            </div>
            <div className={toggle ? "bottom-section-active" : "bottom-section"}>
                <ul className="nav-links">
                    <li className="nav-link"><Link to='/rent-in'>All</Link></li>
                    <li className="nav-link"><Link to='#'>Frequent Rentals</Link></li>
                    <li className="nav-link"><Link to='#'>Motor-Vehicles</Link></li>
                    <li className="nav-link"><Link to='#'>Hardware</Link></li>
                    <li className="nav-link">
                        <form className="search-box" onSubmit={searchSubmitHandler}>
                        <input className="search-input" type="text" placeholder="Search" onChange={(e)=>setKeyword(e.target.value)}/>
                        <input className="search-button" type="submit" value=" Q "/>
                        </form>
                    </li>
                </ul>
            </div>
        </nav>
    );
}