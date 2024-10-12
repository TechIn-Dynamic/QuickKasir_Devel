import { useEffect, useState } from "react";
import CONFIG from "../config/config.json";
import axios from "axios";
import formatDateToInput from "../helpers/HelperFunction";
import { getPeriodeData } from "../services/MasterPeriodeServices";

const FormCreateMenu = ({ isFormOpen = true }) => {
    const [formData, setFormData] = useState({
        periodeName: "",
        periodeFrom: formatDateToInput(new Date()),
        periodeTo: formatDateToInput(new Date()),
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(isFormOpen);
    const [listPeriode, setListPeriode] = useState([]);

    useEffect(() => {
        const fetchPeriodeData = async () => {
            const dataPeriode = await getPeriodeData();
            setListPeriode(dataPeriode);
        };

        fetchPeriodeData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PERIODE}`, {
                name: formData.periodeName,
                date_start: formData.periodeFrom,
                date_end: formData.periodeTo
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log("Response:", response.data);
            setIsOpen(false);
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setError("Failed to create periode. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    if (!isOpen) return null;
    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h1 style={styles.title}>New Menu</h1>
                {error && <div style={{ color: 'red' }}>{error}</div>}


                <div style={styles.form}>
                    <div style={styles.formGroup}>
                        <input
                            type="text"
                            placeholder="Enter menu name"
                            style={styles.input}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="number"
                            placeholder="Enter default price"
                            style={styles.input}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <textarea
                            type="text"
                            placeholder="Enter menu detail"
                            style={styles.input}
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <input
                            type="image"
                            style={styles.input}
                            autoComplete="off"
                            required
                        />
                    </div>
                </div>

                <div style={styles.form}>
                    <button>Add</button>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Periode</th>
                                <th style={styles.th}>Price</th>
                                <th style={styles.th}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={styles.td}>
                                    <select style={styles.input}>
                                        {listPeriode.map((e) => (
                                            <option key={e.id} value={e.id}>
                                                {e.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td style={styles.td}>
                                    <input style={styles.input} type="number" />
                                </td>
                                <td style={styles.td}>
                                    <button>
                                        Delete
                                    </button>
                                </td>
                            </tr>
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
        backgroundColor: '#D9D9D9',
        padding: '20px',
        borderRadius: '8px',
        width: '700px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        padding: '10px',
        margin: '5px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    button: {
        backgroundColor: '#0900FF',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
    },
    title: {
        textAlign: 'center',
        fontSize: '20px',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        border: '1px solid #ccc',
        padding: '10px',
        textAlign: 'left',
        backgroundColor: '#f4f4f4',
    },
    td: {
        border: '1px solid #ccc',
        padding: '10px',
    }
};

export default FormCreateMenu;