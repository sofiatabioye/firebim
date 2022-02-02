import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { NavHashLink as Link } from 'react-router-hash-link';
import Lg from '../../images/logo.png'
import Dropdown from "./Dropdown";


const Header  = () => {
    const [toggle, setToggle] = useState(false);

    const handleNavToggle =() => {
        // console.log('fldod')
        setToggle(!toggle);
    }

    return (
        <React.Fragment>
        <div className="navbar-area bg-white">
        <div className="container relative">
            <div className="row">
                <div className="w-full">
                    <nav className="flex flex-grow items-center justify-around py-4 navbar navbar-expand-lg">
                        <Link className="navbar-brand mr-5 hover:text-black" to={"/home"} >
                            <img src={Lg} alt="Logo" className="inline-block" /> 
                        <b className="text-xl hover:text-black text-black"> TIES Advanced Logistics</b>
                        </Link>
                        <button className="block navbar-toggler focus:outline-none lg:hidden" type="button" data-toggle="collapse" data-target="#navbarOne" aria-controls="navbarOne" aria-expanded="false" aria-label="Toggle navigation" onClick={handleNavToggle}>
                            <span className="toggler-icon"></span>
                            <span className="toggler-icon"></span>
                            <span className="toggler-icon"></span>
                        </button>

                        <div className={`absolute left-0 z-20 w-full px-5 py-3 duration-300 bg-white lg:w-auto navbar-collapse lg:block top-full mt-full lg:static lg:bg-transparent lg:shadow-none ${toggle ? 'collapse': 'block'}`} id="navbarOne">
                            <ul id="nav" className="items-end content-end  mr-auto lg:justify-end navbar-nav lg:flex">
                                <li className="nav-item ml-5 lg:ml-11">
                                    <Link className="page-scroll" to="/home" exact activeClassName="active" activeStyle={{ color: 'red' }}>Home</Link>
                                </li>
                                <li className="nav-item ml-5 lg:ml-11">
                                    <Link className="page-scroll" to="/home/#about" exact activeClassName="active" activeStyle={{ color: 'red' }}>About</Link>
                                </li>
                                
                                <Dropdown color="white" />
                               
                                <li className="nav-item ml-5 lg:ml-11">
                                    <Link className="page-scroll" to="/home/#features" exact activeClassName="selected" activeStyle={{ color: 'red' }}>Features</Link>
                                </li>
                             
                                <li className="nav-item ml-5 lg:ml-11">
                                    <Link className="page-scroll" to="/home/#benefits" exact activeClassName="selected" activeStyle={{ color: 'red' }}>Potential Benefits</Link>
                                </li>
                            </ul>
                        </div> 
                        <div>
                        <Link className="main-btn no-underline" to={"/login"}>Login</Link>
                        </div>
                    </nav> 
                </div>
            </div> 
        </div> 
    </div> 
    </React.Fragment>
    )
 
}

export default Header