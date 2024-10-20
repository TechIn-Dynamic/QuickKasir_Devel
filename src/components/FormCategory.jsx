import { useEffect, useState } from "react";
import formatDateToInput from "../helpers/HelperFunction";
import iconCentang from '../assets/right-correct-checklist-icon-3d-free-png 1.png';
import { getAllCategory } from "../services/MasterCategory";

const FormCategory = ({ setFormCategory }) => {
    const [formData, setFormData] = useState({
        periodeName: "",
        periodeFrom: formatDateToInput(new Date()),
        periodeTo: formatDateToInput(new Date()),
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [listCategory, setListCategory] = useState([]);


    const fetchMasterCategory = async () => {
        const dataPeriode = await getAllCategory();
        setListCategory(dataPeriode);

    };

    useEffect(() => {
        fetchMasterCategory();
    }, []);


    const validateForm = () => {
        const { periodeName, periodeFrom, periodeTo } = formData;
        if (!periodeName || !periodeFrom || !periodeTo) {
            setError("All fields are required");
            return false;
        }

        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
            await saveCategory({
                name: formData.periodeName,
                img: formData.periodeFrom,
                ppn: 0
            });
            await fetchMasterCategory();
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const changeInput = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));

        console.log(name + " => " + value);

    };

    let no = 0;

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h1 style={styles.title}> Add Category</h1>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button
                    onClick={(e) => setFormCategory(false)}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}
                >
                    x
                </button>

                <form onSubmit={handleSubmit} className="flex">
                    <div style={styles.formGroup}>
                        <label htmlFor="nameProduct" style={styles.label}>Name Category</label>
                        <input
                            type="text"
                            name="nameProduct"
                            value={formData.nameProduct}
                            onChange={changeInput}
                            className="w-[200px] h-[30px] mt-3 border border-black pl-3"
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="icon" style={styles.label}>Icon</label>
                        <input
                            type="file"
                            name="icon"
                            value={formData.icon}
                            onChange={changeInput}
                            className="w-[200px] p-2 h-full mt-1"
                            required
                        />
                    </div>

                    <div className="w-full text-end flex justify-end h-full py-3 items-end" style={{verticalAlign: "end"}}>
                        <button
                            type="submit"
                            className="px-3 py-4 bg-white w-full shadow-md rounded-md text-[12px] font-bold h-full border"
                            disabled={loading}
                        >
                            Add
                        </button>
                    </div>

                </form>

                <hr style={styles.hr} />

                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead style={styles.thead}>
                            <tr>
                                <th style={styles.th}>No</th>
                                <th style={styles.th}>Icon</th>
                                <th style={styles.th}>Name Category</th>
                                <th style={styles.th}>PPN</th>
                            </tr>
                        </thead>
                        <tbody style={styles.tbody}>
                            {listCategory.map((category, index) => {
                                return (
                                    <tr key={category.id} style={styles.tr}>
                                        <td style={styles.td}>
                                            <span>{index + 1}</span>
                                        </td>
                                        <td style={styles.td}>
                                         <span>{category.icon}</span>
                                        </td>
                                        <td style={styles.td}>
                                            <span>{category.name}</span>
                                        </td>
                                        <td style={{ ...styles.td, ...styles.actionColumn }}>
                                            <span>{category.ppn}</span>
                                        </td>
                                    </tr>
                                );
                                
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const styles = {
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        padding: '20px',
        width: '544px',
        height: '618px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        position: 'relative'
    },
    form: {
        display: 'flex',
        flexDirection: 'row'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
        // margin: '0 10px'
    },
    label: {
        color: 'black',
    },
    input: {
        width: '200px',
        border: '1px solid black',
        boxSizing: 'border-box',
        padding: '5px',
        height: '100%',
        fontSize: '10px'
    },
    button: {
        color: 'black',
        border: '1px solid black',
        cursor: 'pointer',
        marginTop: '22px',
        padding: '5px'
    },
    title: {
        fontSize: '18px',
        marginBottom: '20px',
        color: '#505050',
        textDecoration: 'underline'
    },
    hr: {
        height: '5px',
        backgroundColor: 'black',
        border: 'none',
        margin: '20px 0',
    },
    tableWrapper: {
        border: '1px solid black'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        tableLayout: 'fixed',
    },
    tbody: {
        display: 'block',
        height: '280px',
        overflowY: 'scroll',
        width: '100%',
        scrollbarWidth: 'none',
    },
    thead: {
        display: 'table',
        width: '100%',
        tableLayout: 'fixed',
    },
    th: {
        border: '1px solid black',
        padding: '3px',
        textAlign: 'center',
        backgroundColor: '#AFAFAF',
        fontWeight: '500',
        fontSize: '10px'
    },
    td: {
        border: '1px solid black',
        padding: '3px',
        textAlign: 'center',
        width: "100%",
        verticalAlign: 'middle',
        fontSize: "10px"
    },
    tr: {
        display: 'table',
        width: '100%',
        tableLayout: 'fixed',
    },
    // actionColumn: {
    //     width: '100px',
    // },
};

export default FormCategory;