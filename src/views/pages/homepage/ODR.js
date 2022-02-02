import React from "react";
import ADPView from '../../images/test4.jpg';
import Header from "./header";
import Footer from "./footer";

const  ODR = () => {

    return(
        <>
        <Header />
         <section id="about" className="about_area pt-120 relative bg-gray py-40">
           
            <div className="container">
                <div className="row justify-center mt-8">
                    <h1 className="text-base sm:text-sm text-2xl lg:text-3xl">Optimised Asset Delivery</h1>
                </div>
                <div className="row justify-end">
                    <div className="w-full lg:w-1/2 md:w-full">
                    <div className="about_content mx-4 pt-11 lg:pt-15 lg:pb-15">
                           
                            <p className="text-justify">
                            TIES Optimised delivery route enables identification of optimised route for ontime asset delivery. Delivers a tradeoff between available delivery routes, caarbon footprint transport costs and road user disruption by harnessing advances in telematics. Allows for dynamic tracking and on-time delivery and last mile logistics
                            </p>

                            {/* <p className="mt-4 text-justify">
                            The potential of adoption of this platform by industry is significant as it facilitates the definition of requirements and then provides the opportunity to synchronise this information with BIM objects.  It also facilitates the harmonisation of asset data in construction and infrastructure industry.
                            </p> */}
                        
                        </div> 
                    </div> 
                    <div className="w-full lg:w-1/2 md:w-full">
                        <div className="about_content mx-4 pt-11 lg:pt-15 lg:pb-15 justify-center">
                            <img src={ADPView} alt="asset data points" className="shadow-lg p-4 rounded-sm" />  
                        </div> 
                    </div>
                </div> 
            </div> 
        </section>
        <Footer />
        </>
    )
}


export default ODR