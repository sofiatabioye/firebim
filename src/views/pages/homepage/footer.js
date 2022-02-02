import React from 'react'
import UWE from '../../images/uwe.png'
import Partners from '../../images/partners.jpg'
import ShapeLeft from '../../images/footer-shape-left.png'
import ShapeRight from '../../images/footer-shape-right.png'


const Footer = () => {
   return (
    <footer id="footer" className="footer_area bg-features relative z-10">
    <div className="shape absolute left-0 top-0 opacity-5 h-full overflow-hidden w-1/3">
        <img src={ShapeLeft} alt=""/>
    </div>
    <div className="shape absolute right-0 top-0 opacity-5 h-full overflow-hidden w-1/3">
        <img src={ShapeRight} alt=""/>
    </div>
    <div className="container">
        <div className="footer_widget pt-18 pb-120">
            <div className="row justify-between">
                <div className="w-full md:w-2/3 lg:w-4/12">
                    <div className="footer_subscribe mt-13 mx-3">
                        <h2 className="footer_title text-xl font-semibold text-white">This project is led by:</h2>
                        <div className="subscribe_form text-left text-white mt-9 relative">
                            <h6 className="text-white">Professor Lamine Mahdjoubi (Professor of Digital Built Environment)</h6>
                            Faculty of Engineering and Technology (FET)
                            <img src={UWE} width="150px" className="pt-3" alt="uwelogo" />
                        </div>
                        <p className="mt-2 text-red font-bold">Please feel free to contact us at support@advanced-logistics.co.uk for more details or any questions
                        </p>
                    </div>  
                </div>
                <div className="w-full md:w-1/2 lg:w-5/12">
                    <div className="footer_about mt-13 mx-3">
                        <h2 className="footer_title text-xl font-semibold text-white py-4">Project Partners</h2>
                        <div className="footer_logo">
                            <a href="#"><img src={Partners} alt="partners"/></a>
                        </div>
                        <div className="footer_content mt-8">
                        
                        </div>
                    </div> 
                </div>
            
                
            </div> 
        </div> 
        <div className="footer_copyright pt-3 pb-6 border-t-2 border-solid border-white border-opacity-10 sm:flex justify-center">
          
            <div className="footer_copyright_content pt-4 text-center">
            <p className="text-white"> © Copyright 2021, UWE: Faculty of Engineering and Technology – TIES Living Lab. All Rights Reserved.</p>
            </div>  
        </div> 
    </div> 
</footer>


   )
}


export default Footer


