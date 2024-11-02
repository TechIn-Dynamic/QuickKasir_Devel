import { useEffect, useState } from "react";
import Sidebar from "../Kasir/Component/Sidebar";
import Navbar from "../Kasir/Component/Navbar";
import ListMenus from "../Kasir/Component/ListMenus";
import SubMenu from "../Kasir/Component/SubMenu";
import Breakfast from "../Kasir/Breakfast";
import FormCreatePeriode from "../components/FormCreatePeriode";
import FormChangePeriode from "../components/FormChangePeriode";
import FormCategory from "../components/FormCategory";
import { getCategory } from "../services/MasterCategoryService";

const Admin = () => {
    const [showProducts, setShowProducts] = useState("Breakfast");
    const [showHistory, setShowHistory] = useState(false);
    const [changePeriod, setChangePeriod] = useState(false);
    const [formCategory, setFormCategory] = useState(false);
    const [resCat, setResCat] = useState(false);

    const products = ((fallback) => {
        setShowProducts(fallback);
        console.log(fallback);
    })

    const pathname  = window.location.pathname;
    
    let extractedPath;
    if (pathname.includes("/devel")) {
        extractedPath = pathname.split("/devel")[1];
    } else if (pathname.includes("/QuickKasir/")) {
        extractedPath = pathname.split("/QuickKasir/")[1];
    } else {
        extractedPath = pathname;
    }

    extractedPath = extractedPath?.startsWith("/") ? extractedPath.substring(1) : extractedPath;

    const [active, setActive] = useState("Breakfast");
    const [listCategory, setListCategory] = useState([]);

    const fetchMasterCategoryAll = async () => {
        const getCategoryRes = await getCategory();
        
        setListCategory(getCategoryRes.data);
        setActive(getCategoryRes.data[0].name);
        
    };

    useEffect(() => {
        fetchMasterCategoryAll();
    }, [resCat]);
 
    return (
            <>
            <div className="flex gap-2 md:gap-7">
                <Sidebar />
                <div className="w-full h-screen">
                    <Navbar type={extractedPath} />
                    <div className="mt-8">
                        <div className="lexend flex justify-between w-[60.5%]">
                            <h2>Category</h2>
                            <button className="text-[12px] font-bold px-6 py-2 bg-white border border-black" onClick={e => setFormCategory(!formCategory)}>Add Category</button>
                        </div>
                        <SubMenu type={extractedPath} products={products} listCategory={listCategory} setActive={setActive} active={active} />
                        <div className="mt-3 flex justify-between w-[89%]">
                            <div>
                                <input type="text" placeholder="Search Product's Name" className="px-1 w-[300px] py-1 rounded-md" />
                            </div>
                            <div className="flex gap-2">
                                <button className="text-[12px] font-bold px-3 py-1 bg-[#D9D9D9] shadow-md rounded-md" onClick={e => setChangePeriod(!changePeriod)}>+</button>
                                <button className="text-[12px] font-bold px-3 py-1 bg-[#D9D9D9] shadow-md rounded-md" onClick={e => setShowHistory(!showHistory)}>
                                    <img src="images/calender.png" alt="" />
                                </button>
                            </div>
                        </div>
                        <Breakfast   />
                    </div>
                </div>
            </div>

            {/* Modal History */}
            {showHistory && <FormCreatePeriode setShowHistory={setShowHistory}/>}
            {changePeriod && <FormChangePeriode setChangePeriod={setChangePeriod}/>}
            {formCategory && <FormCategory setFormCategory ={setFormCategory} setResCat={setResCat} resCat={resCat}  />}
            {/* Modal History */}
            
            </>
        )
    };

export default Admin;