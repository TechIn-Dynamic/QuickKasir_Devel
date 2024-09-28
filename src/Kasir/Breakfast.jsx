import React, { useEffect, useState } from "react";

export default function Breakfast() {

    const data = [
        {
            'name': "Sandwich",
            'images': "sandwich.jpg",
            'desc': "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, dicta.",
            'price': "20000"
        },
        {
            'name': "Sandwich",
            'images': "sandwich.jpg",
            'desc': "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, dicta.",
            'price': "20000"
        },
        {
            'name': "Sandwich",
            'images': "sandwich.jpg",
            'desc': "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, dicta.",
            'price': "20000"
        },
        {
            'name': "Sandwich",
            'images': "sandwich.jpg",
            'desc': "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, dicta.",
            'price': "20000"
        },
        {
            'name': "Sandwich",
            'images': "sandwich.jpg",
            'desc': "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, dicta.",
            'price': "20000"
        }
    ];
    
    return (
        <>
            <div className="flex gap-x-8 flex-wrap overflow-auto h-[400px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar">
                {data.map((item, index) => (
                    <div key={index} className="w-[300px] p-2 h-[150px] bg-white rounded-md shadow-md mt-10 grid items-between cursor-pointer">
                        <div className="flex gap-4 items-center">
                            <div>
                                <img src={"images/products/" + item.images} alt={item.name} className="w-[200px] rounded-md shadow-md" />
                            </div>
                            <div>
                                <h3>{item.name}</h3>
                                <p className="text-sm leading-none">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between mt-6">
                            <h6 className="text-xl font-bold">Rp. {item.price}</h6>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
    
}