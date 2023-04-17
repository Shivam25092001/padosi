import React, { useState } from 'react';
import {Link ,useNavigate} from "react-router-dom";
import './Intro.css';

export default function Intro() {
    const navigate = useNavigate();
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
        <>
            <form className="search-box-large" onSubmit={searchSubmitHandler} >
                <input className="search-input" type="text" placeholder="Search" onChange={(e)=>setKeyword(e.target.value)}/>
                <input className="search-button" type="submit" value=" Q "/>
            </form>
            <div className="home">
                <div className="left child">
                    <h2 className="title">Want to earn while spreading Happiness at the same time ?</h2>
                    <br/>
                    <Link to='/rent-out'><button className="button">Rent Out</button></Link>
                </div>
                <div className="line"></div>
                <div className="right child">
                    <h2 className="title">Urgent need of something for a while ?</h2>
                    <br/>
                    <Link to='/rent-in'><button className="button">Rent In</button></Link>
                </div>
            </div>
        </>
        
    )
}