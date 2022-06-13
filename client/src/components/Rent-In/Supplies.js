import React , {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import ReactStars from 'react-rating-stars-component';
import "./Supplies.css";
import parser from 'any-date-parser'


const Supply = ({item})=>{

    const options = {
        edit: false,
        activeColor: "blue",
        value: item.rating,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
        color: "rgba(20, 20, 20, 0.1)"
    };

    const from = parser.attempt(item.avalability_time.from);
    const to = parser.attempt(item.avalability_time.to);

    return(
        <Link to={`/rent-in/supplies/${item._id}`} className="supplyItemCard">
                <div className="photo">
                    <img src={item.images[0].url} alt="supply"/>
                </div>
                <div className="description">
                    <h2>{item.name}</h2>
                    <h4><ReactStars {...options} /> <span>{item.numOfReviews} Reviews</span></h4>
                    <div>
                        <span className="date">
                            From: {from.day + "/" + from.month + "/" + from.year} 
                            <br/> 
                            To: {to.day + "/" + to.month + "/" + to.year}
                        </span>
                        <h1>₹{item.price}</h1>
                    </div>
                    
                    <div className="supplyItemCard-buttons">
                        <button>Rent In</button>
                        <button>Wishlist</button>
                    </div>
                </div>
        </Link>
    );
}

export default Supply;