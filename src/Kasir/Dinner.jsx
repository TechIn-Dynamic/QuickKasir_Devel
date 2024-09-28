import React, { useEffect, useState } from "react";

export default function Dinner() {
    
    return (
        <>
            <div className="w-[300px] p-2 h-[150px] bg-white rounded-md shadow-md mt-10 grid items-between cursor-pointer">
               <div className="flex gap-4 inrians items-center">
                    <div>
                        <img src="images/products/dinner.jpeg" alt="" className="w-[200px] rounded-md shadow-md"/>
                    </div>
                    <div>
                        <h3>spaghetti</h3>
                        <p className="text-sm leading-none">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, dicta.
                        </p>
                    </div>
               </div>

                <div className="flex justify-between mt-6 inder">
                    <h6 className="text-xl font-bold">Rp. 20.000</h6>
                </div>

            </div>
        </>
    )
}