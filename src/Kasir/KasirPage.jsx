import React, { Suspense, useEffect, useState } from "react";
import Navbar from "./Component/Navbar";
import Loading from "./Component/Loading";
import SubMenu from "./Component/SubMenu";
import Sidebar from "./Component/Sidebar";
import Invoice from "./Component/Invoice";
import Breakfast from "./Breakfast";
import Lunch from "./Lunch";
import Dinner from "./Dinner";
import Coffee from "./Coffee";
import Drink from "./Drink";

export default function KasirPage() {

    const [showProducts, setShowProducts] = useState("Breakfast");

    const products = ((fallback) => {
        setShowProducts(fallback);
    })

    return (
        <>
        <Suspense fallback={<Loading />}>
            <div className="flex gap-2 md:gap-7">
                <Sidebar />
                <div className="w-full h-screen">
                    <Navbar />
                    <div className="flex gap-7 justify-between">
                        <div className="">
                            <SubMenu products={products} />
                            {showProducts === "Breakfast" &&  <Breakfast />}
                            {showProducts === "Lunch" &&  <Lunch />}
                            {showProducts === "Dinner" &&  <Dinner />}
                            {showProducts === "Coffee" &&  <Coffee />}
                            {showProducts === "Drinks" &&  <Drink />}
                        </div>
                        <Invoice />
                    </div>
                </div>
            </div>
        </Suspense>
        </>
    )
}