import React from "react";
import ADPView from '../../images/adpp.png';
import Header from "./header";
import Footer from "./footer";

const  ADP = () => {

    return(
        <>
        <Header />
         <section id="about" className="about_area pt-120 relative bg-gray py-40">
           
            <div className="container">
                <div className="row justify-center mt-8">
                    <h1 className="text-base sm:text-sm text-2xl lg:text-2xl">Asset Data Points</h1>
                </div>
                <div className="row justify-end">
                    <div className="w-full lg:w-1/2 md:w-full">
                    <div className="about_content mx-4 pt-11 lg:pt-15 lg:pb-15">
                           
                            <p className="text-justify">
                                The asset data points is a comprehensive and user-friendly digital template that helps ALBs and their supply chain to define their requirements for an asset throughout its lifecycle, including design, manufacturing, storage, transportation, and onsite installation. ADP digital template is a spreadsheet based on the latest ISO and British standards, addresses sustainability issues, and facilitates asset tagging to Builiding Information Modelling (BIM).  It includes examples to facilitate the adoption of a common naming convention of assets and error-free exchange of information.
                            </p>

                            <p className="mt-4 text-justify">
                            The potential of adoption of this platform by industry is significant as it facilitates the definition of requirements and then provides the opportunity to synchronise this information with BIM objects.  It also facilitates the harmonisation of asset data in construction and infrastructure industry.
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


export default ADP