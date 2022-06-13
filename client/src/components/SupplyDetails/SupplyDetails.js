import React, { useEffect, useState } from "react";
import "./SupplyDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getSupplyDetails } from "../../actions/supplyAction";
import { useParams } from "react-router-dom";
import parser from "any-date-parser";
import ReactStars from 'react-rating-stars-component';

const SupplyDetails = () => {
  const dispatch = useDispatch();

  const { supply, loading, error } = useSelector(
    (state) => state.supplyDetails
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSupplyDetails(id));
  }, [dispatch, id]);

  const options = {
    edit: false,
    activeColor: "blue",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
    color: "rgba(20, 20, 20, 0.1)"
  };


  return (
    <>
      {loading ? (
        "loading ..."
      ) : (
        <div className="supplyDetail">
          <Carousel
            className="carousel"
            navButtonsAlwaysVisible="true"
            animation="slide"
            autoPlay={false}
          >
            {supply.images &&
              supply.images.map((item, i) => (
                <div className="imageContainer" key={item.url}>
                  <img
                    className="CarouselImage"
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                </div>
              ))}
          </Carousel>

          <div className="details">
            <h1>{supply.name}</h1>
            <span>
              {
                supply.avalability_time && supply.avalability_time.from ?
                  <div className="date">
                    From: {parser.attempt(supply.avalability_time.from).day + "/" + parser.attempt(supply.avalability_time.from).month + "/" + parser.attempt(supply.avalability_time.from).year}
                    &nbsp; -&nbsp; To: {parser.attempt(supply.avalability_time.to).day + "/" + parser.attempt(supply.avalability_time.to).month + "/" + parser.attempt(supply.avalability_time.to).year}
                  </div>
                :
                <span></span>
              }
            </span>

              <br />
              <br />
              <br />
            <div className="desc">
              {supply.desc}
            </div>

            <p className="price">₹{supply.price} / day</p>

            <button className="rent-in-now">Rent-In now!</button>
            <br />
            <br />
            <hr className="hor-line"/>
            <br />
            <h4>Owner's Ratings</h4>  
            {
              supply.owner ? 
              <span>
                {supply.owner.owner_ID}
                <ReactStars {...options} value={supply.owner.owner_rating}/> 
              </span>
              : <span></span>
            }
            <h4>
              <span>{supply.numOfReviews} Reviews</span>
            </h4>
          </div>
        </div>
      )}
    </>
  );
};

export default SupplyDetails;
