import React from 'react';
import { Link } from 'react-router-dom';
import Lg from '../../images/logo.png'
import UWE from '../../images/uwe.png'
import Partners from '../../images/partners.jpg'
import ShapeLeft from '../../images/footer-shape-left.png'
import ShapeRight from '../../images/footer-shape-right.png'
import Header from '../homepage/header';
import Footer from '../homepage/footer';


const homePageLayout = ({ children }) => {

    return (
    <React.Fragment>
        
       <Header />
       {/* <BAT /> */}
              <main>{children}</main>
         <Footer/>
          
    
       
    </React.Fragment>
    );
};
export default homePageLayout;
