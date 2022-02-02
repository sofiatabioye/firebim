import React from "react";
import ADPView from '../../images/test3.jpg';
import Header from "./header";
import Footer from "./footer";

const  ADS = () => {

    return(
        <>
        <Header />
         <section id="about" className="about_area pt-120 relative bg-gray py-40">
           
            <div className="container">
                <div className="row justify-center mt-8">
                    <h1 className="text-base sm:text-sm text-2xl lg:text-3xl">Asset Data Scanning</h1>
                </div>
                <div className="row justify-end">
                    <div className="w-full lg:w-1/2 md:w-full">
                    <div className="about_content mx-4 pt-11 lg:pt-20 lg:pb-15">
                           
                            <p className="text-justify">
                            QR-code based mobile app that enables scanning of an asset, during manufacturing, delivery and on-site. Cost-effective, easy to use and can be used on any smartphone. This solution was developed to facilitate the scanning of an asset during manufacturing, delivery or onsite. QR labels could be easily printed using the platform. This app is easy to use, cost-effective, and available through any mobile platform. It helps to overcome a significant barrier in the adoption of asset tagging technology in construction and infrastructure projects
                            </p>

                            <p className="mt-4 text-justify">
                            All project partners need to be able to see the latest assets data. TIES ADS make it easier to track asset status from one stage to another. By just scanning the QR-code, the system will update the asset status automatically. This QR-code is unique for each asset, so it is like an ID for the asset. The user can download this app and log in using the provided account. Also, this app provides the user with the possibility to print the QR-code labels once the asset has been manufactured 
                            </p>
                        
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


export default ADS