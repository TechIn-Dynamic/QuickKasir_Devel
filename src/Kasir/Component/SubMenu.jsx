import React, { useEffect, useState } from "react";
import ListMenus from "./ListMenus";
import { Axios } from "axios";
import { getCategory } from "../../services/MasterCategoryService";

export default function SubMenu(props) {
    const [active, setActive] = useState("Breakfast");
    const [listCategory, setListCategory] = useState([]);

    const fetchMasterCategory = async () => {
        const getCategoryRes = await getCategory();
        setActive(getCategoryRes.data[0].name)
        setListCategory(getCategoryRes.data);
    };

    useEffect(() => {
        fetchMasterCategory();
    }, []);

    const choseProduct = ((fallback) => {
        setActive(fallback);
        props.products(fallback);
    })
 
    const listMen = listCategory.map((e, index) => {
        let list = "";
        if (e.name === active) {
            list = <ListMenus key={index} name={e.name} icon={e.icon} choseProduct={choseProduct} active={active} idCategory={e.id} />;
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