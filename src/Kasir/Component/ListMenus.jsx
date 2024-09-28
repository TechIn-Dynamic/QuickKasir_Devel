import React, { useEffect, useState, props } from "react";

export default function ListMenus(props) {
    
    return (
        <>
            <div className={props.active ? "bg-[#3772F0] text-white rounded-md gap-1 shadow-md itim w-[70px] md:w-[150px] grid md:flex cursor-pointer justify-center md:gap-2 place-items-center h-[50px] p-1 md:h-[79px]" : "hover:scale-110 hover:transition-all  duration-1000 hover:bg-[#3772F0] hover:text-white rounded-md gap-1 shadow-md itim w-[70px] md:w-[150px] grid md:flex cursor-pointer justify-center md:gap-2 place-items-center h-[50px] p-1 md:h-[79px] bg-white"} onClick={(e) => props.choseProduct(props.name)}>
                <div className="text-sm md:text-2xl">
                    <i className={props.icon}></i>
                </div>
                <span className="">{props.name}</span>
            </div>
        </>
    )
}