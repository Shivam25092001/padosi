import React,{useState} from 'react'
import './Navbar.css'

export default function Navbar() {
    const [tog,setTog] = useState(false);
    return (
        <div className = "Navbar">
            <div className="upper">
                <div className="uleft">
                    <div className="headlogo"><h1>Padoci</h1></div>
                </div>
                <div className="uright">
                    <div className="login"><a href="">Login</a></div>
                </div>
            </div>
            <div className="lower">
                <div className="Left">
                <div className="links" id={tog ?"hidden":""}> 
                {/* <a href="" className="closebtn" >&times;</a> */}
                    <a href="/all">All</a>
                    <div className="spacer"></div>
                    <a href="/frequent">Frequents</a>
                    <div className="spacer"></div>
                    <a href="/cars">Cars</a>
                    <div className="spacer"></div>
                    <a href="/bikes">Bikes</a>
                    <div className="spacer"></div>
                    <a href="/hardware">Hardware</a>
                    <div className="spacer"></div>
                </div>
                <button onClick = {()=> setTog(!tog)}>Open</button>
            </div>
            <div className="right">
                <input type="text" placeholder = "Search..." className="search-box"/>
                <button className="search-btn" >Search</button>
            </div>
            </div>
        </div>
    )
}