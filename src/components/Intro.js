import React from "react";  
import './shivam.css';

export default function Intro() {
    return (
        <div className="home">
            <div className="left child">
                <h2 className="title">Want to earn while spreading Happiness at the same time ?</h2>
                <br/>
                <button className="left-button">Rent-Out</button>
            </div>
            <div className="line"></div>
            <div className="right child">
                <h2 className="title">Urgent need of something for a while ?</h2>
                <br/>
                <button className="right-button">Rent In</button>
            </div>
        </div>
    )
}