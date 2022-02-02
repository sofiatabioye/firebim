import React from "react";
import ADPView from '../../images/test2.jpg';
import Header from "./header";
import Footer from "./footer";

const  ADIMS = () => {

    return(
        <>
        <Header />
         <section id="about" className="about_area pt-120 relative bg-gray py-40">
           
            <div className="container">
                <div className="row justify-center mt-8 pb-5">
                    <h1 className="text-base sm:text-sm text-2xl lg:text-3xl">Cloud-based TIES Advanced Logistics Dashboard (ALD)</h1>
                </div>
                <div className="row justify-end ">
                    <div className="w-full lg:w-1/2 md:w-full align-middle">
                        <div className="about_content mx-4">
                           
                            <p className="text-justify">
                            Cloud-based TIES Advanced Logistics Dashboard (ALD) is an intelligent digital solution that delivers bi-directional asset data and information integration and synchronisation. It conveys the right data at the right time to the right people for action and decision-making
                            </p>

                            <p className="mt-4 text-justify">
                            The solution offers an advanced notification system that provides timely information for appropriate recipients.  Cloud-based TIES Advanced Logistics Dashboard (ALD) synchronises between the BIM model and scanned data to reflect the latest status of an asset. Thanks to its capability to process scanned data from the TIES Asset Data Scanning app, developed by UWE Bristol, the latest status of an asset is reflected in the BIM model using appropriate colour coding and associated data and information
                            </p>
                        
                        </div> 
                    </div> 
                    <div className="w-full lg:w-1/2 md:w-full">
                        <div className="about_content mx-4 pt-11 lg:pt-5 lg:pb-15 justify-center">
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


export default ADIMS