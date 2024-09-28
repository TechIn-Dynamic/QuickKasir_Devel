import React, { useEffect, useState } from "react";

export default function Sidebar() {
    
    return (
        <> 
            <div className="w-[20%] md:w-[8%] text-center h-screen bg-white p-2">
                <div className="grid place-items-center gap-2 pt-4">
                    <img src="images/logo_tech.png" alt="logo" className="w-[60%]" />
                    <h2 className="lexend text-[40%]">QuickKasir</h2>
                </div>

                <div className="grid place-items-center mt-12 grid gap-8">
                    <img src="images/menu_logo.png" alt="" className="w-[20px]"/>
                    <div className="bg-[#3772F0] p-2 rounded-md shadow-md">
                        <img src="images/menu_food.png" alt="M" className="w-[20px]"/>
                    </div>
                </div>

            </div>
        </>
    )
} 