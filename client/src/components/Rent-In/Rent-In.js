import React from 'react';
import { useEffect, useState } from 'react';
import MetaData from '../MetaData';
import './Rent-In.css';
import Supply from "./Supplies";
import { getSupply } from '../../actions/supplyAction';
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { PRICE_FILTER_MAX, PRICE_FILTER_MIN } from '../../constants/supplyConstant';
import Loading from '../Loading/loading';

// const supply = {
//     name: "Hammer",
//     price: "₹12",
//     images: [{url: "https://5.imimg.com/data5/TestImages/BK/AM/ER/SELLER-13631189/hand-hammer-500x500.png"}],
//     _id: "1594sampleID151231",
//     category : "Hardware Tool",
//     avalability_time : {
//         from : "13/02/2021",
//         to : "14/02/2022"
//     },
// };

const RentIn = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading, error, supplies, supplyCount, supplyperPage, filteredSuppliesCount} = useSelector(
    (state) => state.supplies
  );
    
  const { keyword } = useParams();


  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e)=>{
    setCurrentPage(e);
  }
  const [price, setPrice] = useState([PRICE_FILTER_MIN, PRICE_FILTER_MAX]);
  const priceHandler = (event, newPrice)=>{
    setPrice(newPrice);
  };
  const categories = [
    "Electronics",
    "Hardware",
    "Furniture",
    "Apparels",
    "Bikes",
    "Cars",
    "Scooters",
    "Cycles",
    "Electricals"
  ]
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const setRatingHandler = (event, rating) => setRating(rating);

  useEffect(() => {
    if(error){
      return alert.error(error);
    }
    dispatch(getSupply(keyword, currentPage, price, category, rating));
  }, [dispatch, error, alert, keyword, currentPage, price, category, rating]);

  


  //slider-config
  const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
  const marks = [
    {
      value: 0,
    },
    {
      value: 1000,
    },
    {
      value: 5000,
    },
    {
      value: 10000,
    },
    {
      value: 15000
    },
    {
      value: 25000
    }
  ];
  const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
    height: 2,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
      height: 16,
      width: 16,
      backgroundColor: '#fff',
      boxShadow: iOSBoxShadow,
      '&:focus, &:hover, &.Mui-active': {
        boxShadow:
          '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: iOSBoxShadow,
        },
      },
    },
    '& .MuiSlider-valueLabel': {
      fontSize: 12,
      fontWeight: 'normal',
      top: -6,
      backgroundColor: 'unset',
      color: theme.palette.text.primary,
      '&:before': {
        display: 'none',
      },
      '& *': {
        background: 'transparent',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
      },
    },
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-rail': {
      opacity: 0.5,
      backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-mark': {
      backgroundColor: '#bfbfbf',
      height: 8,
      width: 1,
      '&.MuiSlider-markActive': {
        opacity: 1,
        backgroundColor: 'currentColor',
      },
    },
  }));





  return (
    <div className="Rent-in">
      <div className="filter-box">

        Price
        <IOSSlider
          aria-labelledby="range-slider"
          value = {price}
          marks={marks}
          min ={PRICE_FILTER_MIN}
          max = {PRICE_FILTER_MAX}
          onChange = {priceHandler}
          valueLabelDisplay  = "auto"
        />

        <br />
        <br />

        Category
        <ul className="category-list">
          {
            categories && categories.map( category => (
              <li key={category} className="category-item" onClick={()=>setCategory(category)}>
                &nbsp; &nbsp;{category}
              </li>
            ))
          }
        </ul>

        <br />
        <br />

        Ratings Above
        <IOSSlider
          aria-labelledby="continuous-slider"
          value = {rating}
          marks = {[{value: 1},{value: 2},{value: 3},{value: 4}]}
          min = {0}
          max = {5}
          onChange = {setRatingHandler}
          valueLabelDisplay  = "auto"
        />
      </div>

      
      {
      loading ? 
      // "loading ..." 
      <Loading/>
      : 
        <>
          <MetaData title="padosi-RentIN" />
          <div className="Featured-section">
            {
              keyword === undefined ? 
              <h1 className='heading'>Featured Padosi Supplies</h1> :
              <h1 className='heading'>All Searches related to {keyword} ...</h1>
            }
            <div className="supplies-section">
              { supplies && supplies.map(supply => (
                <Supply item={supply} key={supply._id}/>
              ))}
            </div>
          </div>

          <div className="pagination-box">
            <Pagination 
              activePage={currentPage}
              itemsCountPerPage={supplyperPage}
              totalItemsCount={filteredSuppliesCount === undefined ? supplyCount : filteredSuppliesCount }
              onChange={setCurrentPageNo}
              nextPageText=">>"
              prevPageText="<<"
              firstPageText="First"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        </>
      }
    </div>
  );
}

export default RentIn