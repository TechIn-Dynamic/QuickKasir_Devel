import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function Navbar() {

    const [showSearch, setShowSearch] = useState(false);

    const handleSearch = (event) =>{
        if(event.key === "Enter"){
            setShowSearch(!showSearch);
            document.getElementById("search").value = "";
        }
    }
    
    return (
        <>
            <div className="w-full h-[60px] flex justify-between bg-white px-3 md:px-10 shadow-md p-4">
                <div className="flex items-center">
                    <div className="text-1xl bg-[#f2f1f2] p-1 md:p-2 md:p-[3.7px] rounded-tl-md rounded-bl-md" onClick={(e) => setShowSearch(!showSearch)}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input type="text" id="search" className={showSearch ? "p-1 transition-all w-full duration-1000 md:w-[250px] bg-[#f2f1f2] rounded-tr-md rounded-br-md" : "p-1 w-[0] md:w-[250px] bg-[#f2f1f2] transition-all duration-1000 rounded-tr-md rounded-br-md"} placeholder="Search Your Menu Here !" onKeyUp={handleSearch} />
                </div>

                <div className="flex gap-1 md:gap-4 p-2 items-center">
                    <div className="text-xl md:text-2xl">
                        <i className="fa-solid fa-bell"></i>
                    </div>
                    <div className=" md:pr-0">
                        <div className="rounded-full w-8 h-8 md:w-12  md:h-12 bg-blue-500">

                        </div>
                    </div>
                    <div className="hidden md:grid">
                        <h1 className="text-md font-bold">Rizkan Ramdani</h1>
                        <span className="text-xs text-left text-[#969696]">Cashir On Duty</span>
                    </div>
                </div>

            </div>
        </>
    )
} 