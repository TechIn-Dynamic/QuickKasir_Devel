import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {

    let token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        token = "";
        localStorage.removeItem('token');
        navigate("/login");
    }

    useEffect(() => {
        if(!token){
            navigate("/login");
        }
    }, [token]);
    
    return (
        <> 
            <div className="w-[20%] md:w-[8%] text-center h-screen bg-white p-2 grid content-between">
                <div>
                    <div className="grid place-items-center gap-2 pt-4">
                        <img src="images/logo_tech.png" alt="logo" className="w-[30%]" />
                        <h2 className="lexend text-[40%]">QuickKasir</h2>
                    </div>

                    <div className="grid place-items-center mt-12 grid gap-8">
                        <img src="images/menu_logo.png" alt="" className="w-[20px]"/>
                        <div className="bg-[#3772F0] p-2 rounded-md shadow-md">
                            <img src="images/menu_food.png" alt="M" className="w-[20px]"/>
                        </div>
                    </div>


                </div>
                <div>
                    <button type="button" onClick={e => handleLogout()}>
                        <img src="images/Logout.png" alt="" />
                    </button>
                </div>
            </div>
        </>
    )
} 