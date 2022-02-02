import React from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";

const Dropdown = ({ color }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  let bgColor;
  color === "white"
    ? (bgColor = "bg-blueGray-700")
    : (bgColor = "bg-" + color + "-500");
  return (
    <>
            <li
              className={
                "nav-item ml-5 lg:ml-11 flex"
              }
    
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
          
              <Link className="page-scroll"  to="#">Solutions </Link>
               <i className="fa fa-caret-down self-center pl-2 pt-2"></i>
              {/* <svg fill="currentColor" viewBox="0 0 20 20"  className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg> */}
                                          
            </li>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                (color === "white" ? "bg-white " : bgColor + " ") +
                "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 dropdown"
              }
              style={{ minWidth: "12rem" }}
            >
              <Link
                to={"/asset-datapoints"}
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap no-underline bg-transparent " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                style={{textDecoration: 'none'}}
              >
                Asset Data Points 
              </Link>
              <Link
                to={"/bim-asset-tagging"}
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                style={{textDecoration: 'none'}}
              >
                BIM Asset Tagging
              </Link>
              <Link
                to={"/asset-data-intelligent-management-system"}
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                style={{textDecoration: 'none'}}
        
              >
                Cloud-based TIES Advanced Logistics Dashboard
              </Link>
              <Link
                to={"/asset-data-scanning"}
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                style={{textDecoration: 'none'}}
              >
                Asset Data Scanning 
              </Link>
              <Link
                to={"/optimised-route-delivery"}
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                style={{textDecoration: 'none'}}

              >
               Optimised Asset Delivery Route
              </Link>
             
            </div>
      
    </>
  );
};

export default Dropdown;