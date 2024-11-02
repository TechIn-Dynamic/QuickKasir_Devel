import React, { useEffect, useState } from "react";
import AlertArchive from "../components/AlertArchive";
import UpdateMenu from "../components/UpdateMenu";

export default function Breakfast() {

    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

    

    const data = [
        {
            'id':21,
            'name': "Sandwich",
            'images': "sandwich.jpg",
            'desc': "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, dicta.",
            'price': "20000"
        },
        {
            'id':22,
            'name': "Burger",
            'images': "sandwich.jpg",
            'desc': "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, dicta.",
            'price': "20000"
        },
        {
            'id':23,
            'name': "Sup",
            'images': "sandwich.jpg",
            'desc': "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, dicta.",
            'price': "20000"
        },
        {
            'id':24,
            'name': "Buntut",
            'images': "sandwich.jpg",
            'desc': "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, dicta.",
            'price': "20000"
        },
        {
            'id':25,
            'name': "Ketoprak",
            'images': "sandwich.jpg",
            'desc': "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, dicta.",
            'price': "20000"
        }
    ];

    const actionProduct= (e, i) => {
        if(e == 1){
            setShowModal(true);
        }else{
            setShowModalEdit(true);
        }
    }
    
    return (
        <>
            <div className="flex gap-x-8 flex-wrap overflow-auto h-[400px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar">
                {data.map((item, index) => (
                    <div key={index} className="w-[300px] p-2 h-[150px] bg-white rounded-md shadow-md mt-10 grid items-between cursor-pointer">
                        <div className="flex gap-4">
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

                            <div>
                                <button type="button" onClick={e =>actionProduct( 1,item.id)}>
                                    <img src="images/archive.png" alt="" width={25}/>
                                </button>
                                <button type="button" onClick={e => actionProduct(2, item.id)}>
                                    <img src="images/detail.png" alt="" width={25} className="mt-2"/>
                                </button>
                            </div>

                        </div>
                        <div className="flex justify-between mt-6">
                            <h6 className="text-xl font-bold">Rp. {item.price}</h6>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && <AlertArchive setShowModal={setShowModal} /> }
            {showModalEdit && <UpdateMenu setShowModalEdit={setShowModalEdit} /> }

        </>
    );
    
}