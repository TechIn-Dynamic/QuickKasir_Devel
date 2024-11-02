import React, { useEffect, useState } from "react";
import ListMenus from "./ListMenus";
import { Axios } from "axios";
import { getCategory } from "../../services/MasterCategoryService";

export default function SubMenu(props) {
    const choseProduct = ((fallback, name) => {
        props.setActive(fallback);
        props.products(fallback);
        props.setActive(name);
        
    })
 
    const listMen = props.listCategory.map((e, index) => {
        let list = "";
        if (e.name === props.active) {
            list = <ListMenus key={index} name={e.name} icon={e.icon} choseProduct={choseProduct}  active={props.active} idCategory={e.id} />;
        } else {
            list = <ListMenus key={index} name={e.name} icon={e.icon} choseProduct={choseProduct} idCategory={e.id} />;
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