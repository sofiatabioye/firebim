import React, {useState} from "react";
import YoutubeEmbed from "../../components/video/YoutubeEmbed";
import Header from "./header";
import Footer from "./footer";
import Digital from '../../images/digital.png';
import IoT from '../../images/iot.png';
import Plan from '../../images/smartIcon.png'
import Van from '../../images/van.png'
import Pic from '../../images/pic.jpg'

import {
    CModal,
    CModalBody,
    
  } from '@coreui/react'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {


    const [modal, setModal] = useState(false);

    return (
     <div>
        <div className="preloader">
            <div className="loader">
                <div className="ytp-spinner">
                    <div className="ytp-spinner-container">
                        <div className="ytp-spinner-rotator">
                            <div className="ytp-spinner-left">
                                <div className="ytp-spinner-circle"></div>
                            </div>
                            <div className="ytp-spinner-right">
                                <div className="ytp-spinner-circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <section className="header_area ">
          
           <Header/>
           {/* bg-hero-pattern */}
            <div id="home" className="header_hero bg-hero-pattern relative z-10 overflow-hidden lg:flex items-center transform skew-y-6">

                <div className="container">
               
                    <div className="row">
              
                        <div className="w-full  mt-80 lg:mt-0 md:mt-80 py-5 lg:py-0 md:py-0">
                            
                            <div className="header_hero_content align-bottom text-center">
                                <h1 className="hero_title sm:mt-4 md:mt-4 sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl font-extrabold text-white">TIES Advanced Logistics</h1>
                                   {/* <div className="hero_border"></div> */}
                                   <div className="flex justify-center">
                                   <p style={{width: '50%', color: '#bfb8b8'}} className="mt-8 lg:mr-8 text-xl py-3">End-to-end BIM-based asset data intelligent management system using Digital Twins (DT) and Internet of Things (IoT) to transform Modern Methods of Construction (MMC), and improve Just in Time (JIT) delivery and construction/infrastructure productivity.</p>
                                   </div>
                              

                            </div> 
                        </div>
                    </div> 
                </div> 
                
            </div> 
                   
        </section>
        <section className="py-5 bg-white">
        <div className="flex flex-row divide-x divide-green-500 justify-center text-center">
                                    <div className="p-3 border-right mr-3 tools">
                                       <div className="flex justify-center pb-2">
                                           {/* <i className="fa fa-cube fa-3x pb-2" color="red"></i> */}
                                           <img src={Digital} alt="iot" className="img-responsive"/>
                                       </div>
                                        <span className="text-xl">Digital twins</span>
                                    </div>
                                    <div className="p-3 border-right mr-3 tools">
                                        <div className="flex justify-center pb-2">
                                            {/* <i className="fa fa-truck fa-2x pb-2" color="red"></i> */}
                                        <img src={IoT} alt="iot" className="img-responsive"/>
                                        </div>
                                        <span className="text-xl">Internet of things</span>
                                    </div>
                                    <div className="p-3 border-right mr-3 tools">
                                        <div className="flex justify-center pb-2">
                                            {/* <i className="fa fa-brain fa-2x pb-2" color="red"></i> */}
                                            <img src={Plan} alt="iot" className="img-responsive"/>
                                        </div>
                                        <span className="text-xl">Smart planning</span>
                                    </div>
                                    <div className="p-3 tools">
                                        <div className="flex justify-center pb-2">
                                            {/* <i className="fa fa-truck fa-3x pb-2 mr-3" color="red"></i> */}
                                            <img src={Van} alt="iot" className="img-responsive"/>
                                            </div>
                                        <span className="text-xl">Just in time delivery </span>
                                    </div>
                                </div>
            </section>
        <CModal
            show={modal}
            onClose={() => setModal(false)}
            className="videoModal"
            size={"xl"}
            > 
            <CModalBody><YoutubeEmbed embedId="HyX210K6LVc" /> </CModalBody>
        </CModal>

        <section id="about" className="about_area pt-120 pb-120 relative bg-gray">
           
            <div className="container">
                <div className="row justify-end">
                    {/* <div className="w-full md:1/3 lg:w-1/2 md:w-full flex flex-col align-middle">
                        <div className="image m-auto">
                             {/* <img src={Pic} alt="about" className="img-responsive min-w-0"  style={{filter: 'brightness(5px)'}} /> */}
                             {/* <img src={About} alt="about" className="img-responsive min-w-0" style={{filter: 'blur(5px)'}} /> */}
                        {/* </div>
                    </div>   */}
                    <div className="w-full lg:w-full md:w-full">
                        <div className="about_content mx-4 pt-11 lg:pt-15 lg:pb-15 text-center">
                            <div className="section_title pb-5">
                                <h4 className="sub_title">About Us</h4>
                                <h4 className="main_title">End-to-end digital platform for asset management</h4>
                               
                            </div>  
                            <p className="text-justify"><img src={Pic} alt="about" className="img-responsive shadow min-w-0 float-left m-4"  style={{filter: 'brightness(5px)'}} />
                            <span className="pt-3"><span className="text-lg">T</span>IES Advanced logistics project is a state-of-the-art advanced logistics system based on digital twin technology to revolutionise modern methods of construction and improve productivity. We are team of researchers at UWE Bristol, led by Professor Lamine Mahdjoubi investigating four key areas that can improve efficiency and quality within the construction industry: artificial intelligence data mining, advanced logistics, conversational artificial intelligence and quality assurance.</span> </p>
                            <p className="mt-4 text-justify">
                            UWE Bristol, led by Lamine Mahdjoubi, Professor of Digital Built Environment, delivered an end-to-end cloud-based advanced offsite logistics platform to track and visualise the status of an asset from early design to installation. The technology has a potential to be applied for project operation and maintenance, as well as decommissioning. The platform provides flexible and all-inclusive connected digital solutions by harnessing advances in the artificial intelligence, digital twin technology, and Internet of things.  It assists in smart planning of offsite logistics activities.  Above all, it ensures just-in-time delivery of manufactured items to construction sites. 
                            
                            <p className="pt-3 pb-3"> The digital platform provides also a single source of truth and a common language of business.
                                    The advanced logistics digital platform confers the following key benefits:
                                    By harnessing advances in digital twin technology to gain insight about the latest status of an asset.
                                    By accessing the same version of truth, supply chain integration and coordination is significantly improved.
                                    Harmonisation of asset data and information is a key feature of advanced logistics, as it complies with the latest British Standards and standards set by the International Organisation for Standardisation.
                                    A personalised notification of decision-makers is critical to enable them to take appropriate actions based on the latest progress status of an asset.
                                    Thanks to its intuitive colour coding approach, it is easier to visualise the latest status of an asset and query the data.
                                    The platform assists in improved certainty of onsite delivery and address potential onsite space constraints performance.
                                    Easy generation of a QR code to tag and scan an asset, as well as track the status of the asset throughout project lifecycle. 
                                    The adoption of Industry Foundation Classes (IFC) facilitates the seamless flow of asset data and information during project lifecycle.
                                    Using Artificial Intelligence to determine the optimum route for the delivery of an asset on time to a construction site, with minimum impact on carbon, cost and road users.
                                 The deliverables enable strategic planning and scenario planning for achieving a reduction in time, labour and transport cost and carbon footprint, as well as improvements in certainty and reliability of onsite delivery.  The project has six major outputs:
                              
                               </p>
                            </p>
                            <div className="row mt-4">
                                    <div className="col-lg-2 h-4">
                                        <div className="card shadow-sm p-3 text-responsive">
                                            <div className="pb-2"><i className="fa fa-check-circle text-red fa-2x"></i></div>
                                            TIES Asset Data Points (ADP)
                                        </div>
                                    </div>
                                    <div className="col-lg-2 h-4">
                                        <div className="card shadow-sm p-3"> 
                                            <div className="pb-2"><i className="fa fa-check-circle text-red fa-2x"></i></div>
                                            TIES BIM Asset Tagging (BAT)
                                        </div>
                                    </div>
                                    <div className="col-lg-3 h-4">
                                        <div className="card shadow-sm p-3 "> 
                                            <div className="pb-2"><i className="fa fa-check-circle text-red fa-2x"></i></div>
                                            Cloud-based TIES Advanced Logistics Dashboard (ALD)
                                        </div>
                                    </div>
                                    <div className="col-lg-3 h-2">
                                        <div className="card shadow-sm p-3"> 
                                            <div className="pb-2"><i className="fa fa-check-circle text-red fa-2x"></i></div>
                                            TIES Advanced Logistics Smartphone App
                                        </div>
                                    </div>
                                    <div className="col-lg-2 h-2">
                                       <div className="card shadow-sm p-3"> 
                                            <div className="pb-2"><i className="fa fa-check-circle text-red fa-2x"></i></div>
                                            TIES Optimised Asset Delivery Route (ODR)
                                        </div>
                                    </div>
                                </div>
                        </div> 
                    </div>
                </div> 
            </div> 
        </section>

        {/* <section className="services_area pt-120 bg-services pb-120" id="services">
            <div className="container">
                <div className="row justify-center">
                    <div className="w-full lg:w-1/2">
                        <div className="section_title text-center pb-6">
                            <h5 className="sub_title">Solutions</h5>
                            <h4 className="main_title">Our Project Deliverables</h4>
                        </div>
                    </div>
                </div> 
                <div className="flex flex-wrap justify-center" id="tabs-id">
                    <div className="w-full">
                    <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row justify-between">
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a className="text-lg font-bold uppercase px-5 py-3  shadow-lg rounded block leading-normal text-white bg-green"   onClick={(e) => changeActiveTab(e, "tab-profile")}>
                            TIES-ADP
                        </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a className="text-lg font-bold uppercase px-5 py-3 shadow-lg rounded  block leading-normal text-gray-500" data-id="tab-settings" onClick={(e) => changeActiveTab(e, "tab-settings")}>
                           
                            TIES-BAT
                        </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a className="text-lg font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-gray-500" data-id="tab-options"  onClick={(e) => changeActiveTab(e, "tab-options")}>
                            
                            TIES-ADIMS
                        </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a className="text-lg font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-gray-500" data-id="tab-ads" onClick={(e) => changeActiveTab(e, "tab-ads")}>
                                
                                TIES-ADS
                            </a>
                        </li>
                        
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a className="text-lg font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-gray-500" data-id="tab-odr" onClick={(e) => changeActiveTab(e, "tab-odr")}>
                               
                                TIES-ODR
                            </a>
                        </li>
                    
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                        <div className="tab-content tab-space">
                            <div className="block" id="tab-profile">
                                <div className="flex flex-col">
                                    <div className="flex-1 sm:w-full py-5 px-5 text-center mx-4">
                                        <h1>Asset
                                            Data Points</h1>
                                        <p className="mt-5">
                                            Comprehensive and user friendly digital template that helps project managers to define their requirements for an asset throughout the project lifecycle . It captures key information about an asset and the information is defined and stored according to the latest ISO and British standards. The platforms also provides a single source of truth accessed by the supply chain common language processing containing information for operation, maintenance and decommissioning.
                                        </p>
                                    </div>
                                    <div className="flex-1 sm:w-full justify-center content-center px-4 mx-4 mt-5">
                                        <img src={ADP} className="output-image" alt="Asset data points" />
                                    </div>
                                </div>
                            
                            </div>
                            <div className="hidden" id="tab-settings">
                                <div className="flex flex-col">
                                    <div className="flex-1 sm:w-full py-5 px-5 text-center mx-4">
                                        <h1>BIM Asset Tagging</h1>
                                        <p className="mt-5">
                                            Custom built digital solution that facilitates the automated synchronisation between the asset data points and the associated asset in Building Information Modelling(BIM). Reliable Asset Tagging within the BIM environment. Data query and exchange within the BIM environment. It includes information on manufacturing, delivery and installation date and time of an asset which improves co-ordination and avoid mistakes. Possible to predict the suitability of heavy good assets(HGV) and size of cranes to lift the asset. Use color coding to get latest insights to the status of an asset

                                        </p>
                                    </div>
                                    <div className="flex-1  sm:w-full justify-center content-center px-4 mt-5">
                                        <img src={BAT} alt="BIM asset tagging" className="output-image" />
                                    </div>
                                </div>
                            </div>
                            <div className="hidden" id="tab-options">
                                <div className="flex flex-col content-center">
                                    <div className="flex-1 sm:w-full py-5 px-5 text-center mt-5">
                                        <h1>Asset Data Intelligent Management Systems</h1>
                                        <p className="mt-5">
                                            An Intelligent digital solution that delivers bi-directional asset data transformation,information integration and synchronisation. Able to process data from TIES ADS Scanning app and ODR to provide reports, support decision making and notifications. Synchronizes BIM model and scanned data to reflect the latest status of an asset
                                        </p>
                                        <div className="flex-1 sm:w-full justify-center content-center px-4 mt-5">
                                        <img src={ADIMS} alt="Asset Data Scanning" className="output-image"/>
                                       </div>
                                    </div>
                                
                                </div>
                            </div>
                            <div className="hidden" id="tab-ads">
                                <div className="flex flex-col">
                                    <div className="flex-1  sm:w-full py-5 px-5 text-center mx-4">
                                        <h1>Asset Data Scanning</h1>
                                        <p className="mt-5">
                                            QR-code based mobile app that enables scanning of an asset, during manufacturing, delivery and on-site. Cost-effective, easy to use and can be used on any smart phone
                                        </p>
                                    </div>
                                    <div className="flex-1 sm:w-full justify-center content-center px-4 mt-5">
                                        <img src={ADS} alt="Asset Data Scanning" className="output-image"/>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden" id="tab-odr">
                                <div className="flex flex-col">
                                    <div className="flex-1 sm:w-full py-5 px-5 text-center mx-4">
                                        <h1>Optimised Asset Delivery Route</h1>
                                        <p className="mt-5">
                                            Enable identification of optimised route for ontime asset delivery. Delivers a tradeoff between available delivery routes, caarbon footprint transport costs and road user disruption by harnessing advances in telematics. Allows for  dynamic tracking and on-time delivery and last mile logistics
                                        </p>
                                        
                                    </div>
                                    <div className="flex-1 content-center sm:w-full justify-center px-4 mt-5">
                                        <img src={ODR}  alt="optimised delivery route" className="output-image"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        
            </div> 
        </section> */}


       <section id="features" className="services_area pt-150 pb-120 bg-features bg-services z-10">
        
            <div className="container z-20 bg-blend-difference">
                <div className="row justify-center">
                    <div className="w-full lg:w-1/2">
                        <div className="section_title text-center pb-6">
                            <h5 className="sub_title">What We Do</h5>
                            <h4 className="main_title text-white">Key Features</h4>
                        </div>
                    </div>
                </div> 
                <div className="text-center text-wheat">
                    <p className="px-5 mx-4 mb-3 font-sm">
                        The project is a part of TIES Living Lab, a transformative collaboration aimed at harnessing the vast quantities of intelligence that UK infrastructure projects generate to drive down delivery times, reduce carbon emissions and improve safety and skills for construction workers. We are committed to finding better ways of delivering high quality, cost-effective projects that also offer social value and are better for the environment.
                    </p>
                </div>
                <div className="row justify-start px-4 mt-2">
                    <div className="w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6">
                        <div className="flex items-start space-x-2 text-sm font-sm">
                            <i className="fa fa-brain fa-2x text-red"></i>
                            <div className="mx-4 text-justify">
                                <h5>Decision Making</h5>
                                <p className="mt-2 mr-5 font-sm text-bl opacity-8">Gain powerful insight from Digital Twinning BIM and physical assets</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6">
                        <div className="flex items-start space-x-2 text-sm font-sm">
                            <i className="fa fa-link fa-2x text-red"></i>
                            <div className="mx-4 text-justify">
                                <h5>Integration/Coordination</h5>
                                <p className="mt-2 mr-5 font-sm text-bl">Access to same version of reality to manage and keep track of an asset's journey</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6">
                        <div className="flex items-start space-x-2 text-sm font-sm">
                            <i className="fa fa-balance-scale fa-2x text-red"></i>
                            <div className="mx-4 text-justify">
                                <h5>Project Performance</h5>
                                <p className="mt-2 mr-5 font-sm text-bl">Improved certainty of onsite delivery and onsite space constraints</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6">
                        <div className="flex items-start space-x-2 text-sm font-sm text-gray-500">
                            <i className="fa fa-code-branch fa-2x text-red"></i>
                            <div className="mx-4 text-justify">
                                <h5>Harmonisation</h5>
                                <p className="mt-2 mr-5 font-sm text-bl">Asset data/information captured according to the latest BS and ISO standards</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6">
                        <div className="flex items-start space-x-2 text-sm font-sm text-gray-500">
                            <i className="fa fa-lightbulb fa-2x text-red"></i>
                            <div className="mx-4 text-justify">
                                <h5>Actionable Intelligence</h5>
                                <p className="mt-2 mr-5 font-sm text-bl">Ability to deal with situation at hand and/or undertake corrective measures</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6">
                        <div className="flex items-start space-x-2 text-sm font-sm text-gray-500">
                            <i className="fa fa-chart-line fa-2x text-red"></i>
                            <div className="mx-4 text-justify">
                                <h5>Cognitive Visualisation</h5>
                                <p className="mt-2 mr-5 font-sm text-bl">Colour coding to visualise latest asset status and ability to query data</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6">
                        <div className="flex items-start space-x-2 text-sm font-sm text-gray-500">
                            <i className="fa fa-cogs fa-2x text-red"></i>
                            <div className="mx-4 text-justify">
                                <h5>Benchmarking Intelligence</h5>
                                <p className="mt-2 mr-5 font-sm text-bl">Tradeoff between delivery route, carbon footprint, cost, and disruption to road users</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6">
                        <div className="flex items-start space-x-2 text-sm font-sm text-gray-500">
                            <i className="fa fa-qrcode fa-2x text-red"></i>
                            <div className="mx-4 text-justify">
                                <h5>Asset Scanning</h5>
                                <p className="mt-2 mr-5 font-sm text-bl">Easy and cost effective asset data tagging and scanning</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6">
                        <div className="flex items-start space-x-2 text-sm font-sm text-gray-500">
                            <i className="fa fa-retweet fa-2x text-red"></i>
                            <div className="mx-4 text-justify">
                                <h5>Asset data Flow</h5>
                                <p className="mt-2 mr-5 font-sm text-bl">Seamless asset data flow throughout the project lifecycle</p>
                            </div>
                        </div>
                    </div>     
                </div> 
            </div> 
    </section>



        <section id="benefits" className="services_area pt-150 pb-120 bg-gray">
        <div className="container">
            <div className="row justify-center">
                <div className="w-full lg:w-1/2">
                    <div className="section_title text-center pb-6">
                        <h5 className="sub_title">What to Expect</h5>
                        <h4 className="main_title">Potential Benefits</h4>
                    </div> 
                </div>
            </div> 
            
            <div className="row justify-between">
                <div className="w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6 pr-2 pt-4 shadow-lg">
                    <div className="flex items-center text-sm font-medium text-gray-500 text-center">
                       <div className="flex-1 py-5"> <i className="fa fa-chart-line fa-2x text-red"></i>
                            <div className="mx-4 text-justify">
                                <h5 className="text-center mt-2">Better Productivity</h5>
                                <h1 className="text-center lg:text-5xl text-4xl text-red">+50%</h1>
                            </div>
                       </div>
                    </div>
                </div>
                <div className="w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6  pr-2 pt-4 shadow-lg">
                    <div className="flex items-center text-sm font-medium text-gray-500 text-center">
                       <div className="flex-1 py-5"> <i className="fa fa-gas-pump fa-2x text-red"></i>
                        <div className="mx-4 text-justify">
                            <h5 className="text-center mt-2">Fuel Emmissions</h5>
                            <h1 className="text-center text-5xl text-red">-20%</h1>
                        </div>
                   </div>
                    </div>
                </div>
                <div className="w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6 pr-2 pt-4 shadow-lg">
                    <div className="flex items-center text-sm font-medium text-gray-500 text-center">
                       <div className="flex-1 py-5"> <i className="fa fa-money-check fa-2x text-red"></i>
                            <div className="mx-4 text-justify">
                                <h5 className="text-center mt-2">Asset Operating Cost</h5>
                                <h1 className="text-center text-5xl text-red">-20%</h1>
                            </div>
                       </div>
                   </div>
                    </div>
                </div>
                <div className="row justify-center">
                <div className="w-full sm:w-10/12 md:w-6/12 lg:w-4/12 mt-10 mb-6 pr-2 pt-4 shadow-lg">
                    <div className="flex flex-col items-center text-sm font-medium text-gray-500 text-center">
                       <div> <i className="fa fa-money-bill-wave fa-2x text-red"></i>
                        <div className="mx-4 text-justify">
                            <h5 className="text-center mt-2">Project Cost</h5>
                            <h1 className="text-center text-5xl text-red">-10%</h1>
                        </div>
                   </div>
                    </div>
                </div>
                <div className="w-full sm:w-10/12 md:w-6/12 lg:w-8/12 mt-10 mb-6 pr-2 pt-4 shadow-lg">
                    <div className="flex items-center text-sm font-medium text-gray-500 text-center">
                       <div className="flex-1"> <i className="fa fa-hourglass fa-2x text-red"></i>
                            <div className="mx-4 text-justify">
                                <h5 className="text-center mt-2">Time Saving</h5>
                            </div>
                       </div>
                        <div className="flex-1 items-center text-sm font-bold text-lg  text-gray-500">
                            <ul className="text-justify">
                                <li><i className="fa fa-check pr-2 text-red"></i> -22% pre-project planning</li>
                                <li><i className="fa fa-check pr-2 text-red"></i> -75% generating reports</li>
                                <li><i className="fa fa-check pr-2 text-red"></i> -90% document transmittals</li>
                                <li><i className="fa fa-check pr-2 text-red"></i> +50% productivity gains</li>
                              
                            </ul>
                         </div>
                  
                    </div>
                </div>
                
            </div>
        </div> 
    </section>
    <section id="video" className="about_area pb-120 pt-120 relative" >     
      <div className="container">
        <iframe width="100%" height="500" style={{border: '5px solid rgba(251, 251, 255, var(--tw-bg-opacity)', borderRadius: '5px'}}
            src="https://www.youtube.com/embed/HyX210K6LVc">
        </iframe>  
      </div>
    </section>

     <Footer />


       

        <a href="#" className="scroll-top"><i className="fa fa-chevron-up"></i></a>
    </div>
 
    );
}
