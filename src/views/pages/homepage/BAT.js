import React from "react";
import BATView from '../../images/batp.jpg';
import Header from "./header";
import Footer from "./footer";

const  BAT = () => {

    return(
        <>
        <Header />
         <section id="about" className="about_area pt-120 relative bg-gray">
           
            <div className="container">
                <div className="row justify-center mt-8">
                    <h1 className="text-base sm:text-sm text-2xl lg:text-3xl">BIM Asset Tagging</h1>
                </div>
                <div className="row justify-end">
                    <div className="w-full lg:w-1/2 md:w-full">
                    <div className="about_content mx-4 pt-11 lg:pt-15 lg:pb-15">
                           
                            <p className="text-justify">
                            TIES BAT is a custom-built digital solution that facilitates the automated synchronisation between the asset data points and associated objects within the BIM Model. It also facilitates the accuracy and reliability of asset tagging within a BIM environment. It offers a capability for data query, and exchange within the BIM environment. Available information includes manufacturing, delivery and installation date and time of an asset for improved coordination and avoiding mistakes and misunderstanding. Using TIES BAT, it is possible to predict suitable Heavy Goods Vehicle (HGVs) to carry the asset and crane to lift the asset in place. This helps avoiding errors such as ordering the wrong HGV or crane to carry or lift an asset.
                            </p>

                            <p className="mt-4 text-justify">
                            It is used for an automated synchronisation of asset data points with BIM objects during the early design phase.  The tool can also provide data extraction capability to facilitate the integration between the data points and BIM objects.  Thanks to BAT capability and its insightful colour coding, it is easier to visualise and query the latest status of an asset.  Critical information associated with material and its embodied carbon of an asset can also be extracted.
                            </p>
                            
                        </div> 
                    </div> 
                    <div className="w-full lg:w-1/2 md:w-full">
                        <div className="about_content mx-4 lg:pt-15 lg:pb-8 justify-center">
                        <img src={BATView} alt="asset data points" className="shadow-lg p-4 rounded-sm" />  
                        </div> 
                    </div>
                </div> 
                <div className="pb-4">
                   <p className="px-4">Some of its capabilities includes:</p>
                   <div className="row mt-4 px-8">
                    <div className="w-full lg:w-1/2 md:w-full">
                     <ul className="text-sm">
                                <li className="flex">
                                    <div className="about_check">
                                        <i className="fa fa-check-circle text-red"></i>
                                    </div>
                                    <div className="about_list_content pl-5 pr-2">
                                    Create shared parameter text file from CSV prepared file
                                    </div>
                                </li>
                                <li className="flex pt-2">
                                    <div className="about_check">
                                        <i className="fa fa-check-circle text-red"></i>
                                    </div>
                                    <div className="about_list_content pl-5 pr-2">
                                    Add the shared parameter (Asset Data points – ADP), to the Revit/BIM
                                    </div>
                                </li>
                                <li className="flex pt-2">
                                    <div className="about_check">
                                        <i className="fa fa-check-circle text-red"></i>
                                    </div>
                                    <div className="about_list_content pl-5 pr-2">
                                    Set the shared parameter values for the Revit/BIM elements
                                    </div>
                                </li>
                                <li className="flex pt-2">
                                    <div className="about_check">
                                        <i className="fa fa-check-circle text-red"></i>
                                    </div>
                                    <div className="about_list_content pl-5 pr-2">
                                    Export Revit/BIM elements shared parameter values and retrieve its elements to Excel spreadsheet file
                                    </div>
                                
                                </li>
                                
                            
                            </ul>
                   </div>
                   <div className="w-full lg:w-1/2 md:w-full px-8">
                   <li className="flex pt-2">
                                    <div className="about_check">
                                        <i className="fa fa-check-circle text-red"></i>
                                    </div>
                                    <div className="about_list_content pl-5 pr-2">
                                    Import the updated values to the Revit/BIM environment
                                    </div>
                                </li>
                                <li className="flex pt-2">
                                    <div className="about_check">
                                        <i className="fa fa-check-circle text-red"></i>
                                    </div>
                                    <div className="about_list_content pl-5 pr-2">
                                    Colour code the Revit/BIM elements with respect to the status of the BIM assets
                                    </div>
                                </li>
                                <li className="flex pt-2">
                                    <div className="about_check">
                                        <i className="fa fa-check-circle text-red"></i>
                                    </div>
                                    <div className="about_list_content pl-5 pr-2">
                                    Predict suitable HGV vehicle type to carry the asset
                                    </div>
                                </li>
                                <li className="flex pt-2">
                                    <div className="about_check">
                                        <i className="fa fa-check-circle text-red"></i>
                                    </div>
                                    <div className="about_list_content pl-5 pr-2">
                                    Predict suitable crane to lift and move an asset
                                    </div>
                                </li>
                   </div>
                </div>
            </div> 
            </div>
        </section>
        
        <Footer />
        </>
    )
}


export default BAT