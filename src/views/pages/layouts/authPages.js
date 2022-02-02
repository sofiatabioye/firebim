import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import logistics from '../../images/authImage.png';

const authLayout = ({ children }) => {

    return (
    <React.Fragment>
        <div className="w-full h-full flex flex-wrap bg-white font-family-karla h-screen authLayout">

       <div className="lg:w-1/2 md:w-1/3 shadow-2xl bg-blend-darken bg-auth">
          
        </div>

        <div className="w-full md:w-1/2 flex flex-col">

            <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24 mt-5">
                <Link to={"/"} className="font-bold text-xl p-4 no-underline" style={{textDecoration: "none"}}> 
                  {/* <img src={logo} alt="logo" className="d-inline" /> */}
                   FIRE BIM
                  </Link>
            </div>

            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-8 lg:px-32">
           
               <main>{children}</main>
               
            </div>

        </div>  
    </div>
       
    </React.Fragment>
    );
};
export default authLayout;
