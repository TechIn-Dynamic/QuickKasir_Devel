import { useEffect, useState } from "react";
import formatDateToInput from "../helpers/HelperFunction";
import { savePeriodeData } from "../services/MasterPeriodeServices";

const FormCreatePeriode = ({ isFormOpen = true }) => {
    const [formData, setFormData] = useState({
        periodeName: "",
        periodeFrom: formatDateToInput(new Date()),
        periodeTo: formatDateToInput(new Date()),
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(isFormOpen);

    useEffect(() => {
        const { periodeFrom, periodeTo } = formData;

        const fromDate = new Date(periodeFrom);
        const toDate = new Date(periodeTo);

        if (fromDate > toDate || toDate < fromDate) {
            setFormData((prevData) => ({
                ...prevData,
                periodeTo: formatDateToInput(fromDate),
            }));
        }
    }, [formData.periodeFrom, formData.periodeTo]);

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

        try {
            await savePeriodeData(formData);
            setIsOpen(false);
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };


    if (!isOpen) return null;
    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h1 style={styles.title}>New Periode</h1>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="periodeName" style={styles.label}>Period Name:</label>
                        <input
                            type="text"
                            name="periodeName"
                            value={formData.periodeName}
                            onChange={handleChange}
                            placeholder="Enter period name"
                            style={styles.input}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="periodeFrom" style={styles.label}>From:</label>
                        <input
                            type="date"
                            name="periodeFrom"
                            value={formData.periodeFrom}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="periodeTo" style={styles.label}>To:</label>
                        <input
                            type="date"
                            name="periodeTo"
                            value={formData.periodeTo}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={styles.button}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
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
        width: '400px',
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
        width: '100%',
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
    }
};

export default FormCreatePeriode;