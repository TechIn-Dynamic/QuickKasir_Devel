import React, { useEffect, useState } from "react";
import ListMenus from "./ListMenus";

export default function SubMenu(props) {
    const [active, setActive] = useState("Breakfast");
    const menus = [
        {'name': "Breakfast", "icon": "fa-solid fa-bowl-food"},
        {'name': "Lunch", "icon": "fa-solid fa-utensils"},
        {'name': "Dinner", "icon": "fa-solid fa-champagne-glasses"},
        {'name': "Coffee", "icon": "fa-solid fa-mug-hot"},
        {'name': "Drinks", "icon": "fa-solid fa-champagne-glasses"}
    ];

    const choseProduct = ((fallback) => {
        setActive(fallback);
        props.products(fallback);
    })

    const listMen = menus.map((e, index) => {
        let list = "";
        if (e.name === active) {
            list = <ListMenus key={index} name={e.name} icon={e.icon} choseProduct={choseProduct} active={active} />;
        } else {
            list = <ListMenus key={index} name={e.name} icon={e.icon} choseProduct={choseProduct} />;
        }

        return list;

    })
    
    return (
        <>
            <div className={props.type == "admin" ? "overflow-scroll flex-wrap mt-5 h-100% md:h-100% w-full flex gap-3 gap-x-8 flex-wrap" : "mt-5 h-[150px] md:h-[100px] w-full flex gap-3 gap-x-8 flex-wrap"}>
                {listMen}
            </div>
        </>
    )
}