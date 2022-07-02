import React from "react";  
import './Intro.css';
import {Link} from "react-router-dom";

export default function Intro() {
    return (
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
    )
}