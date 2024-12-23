import { useEffect, useState } from "react";
import formatDateToInput from "../helpers/HelperFunction";
import { deletePeriode, getPeriode, savePeriode, updatePeriode } from "../services/MasterPeriodeService";
import iconCentang from '../assets/right-correct-checklist-icon-3d-free-png 1.png';

const FormChangePeriode = ({ setChangePeriod }) => {
    const [formData, setFormData] = useState({
        periodeName: "",
        periodeFrom: formatDateToInput(new Date()),
        periodeTo: formatDateToInput(new Date()),
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [listPeriode, setListPeriode] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editField, setEditField] = useState(null);


    const fetchMasterData = async () => {
        const getPeriodeRes = await getPeriode();
        setListPeriode(getPeriodeRes.data);

    };

    useEffect(() => {
        fetchMasterData();
    }, []);

    useEffect(() => {
        const { periodeFrom, periodeTo } = formData;

        const fromDate = new Date(periodeFrom);
        const toDate = new Date(periodeTo);

        if (fromDate > toDate) {
            setFormData((prevData) => ({
                ...prevData,
                periodeTo: formatDateToInput(fromDate),
            }));
        }
    }, [formData.periodeFrom, formData.periodeTo]);


    const handleFormHeaderChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormTableChange = (index, field, value) => {
        const updatedPeriode = [...listPeriode];
        const newDataIndex = updatedPeriode.findIndex(e => e.id == index);

        updatedPeriode[newDataIndex][field] = value;
        setListPeriode(updatedPeriode);
    };

    const handleDoubleClick = (index, field) => {
        setEditIndex(index);
        setEditField(field);
    };

    const handleBlur = async () => {
        const newData = listPeriode.find(e => e.id == editIndex);

        const fromDate = new Date(newData.date_start);
        const toDate = new Date(newData.date_end);

        if (fromDate > toDate) {
            newData.date_end = formatDateToInput(fromDate);
        }

        setLoading(true);

        try {
            await updatePeriode(newData);
            await fetchMasterData();
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }

        setEditIndex(null);
        setEditField(null);
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
            await savePeriode({
                name: formData.periodeName,
                date_start: formData.periodeFrom,
                date_end: formData.periodeTo,
            });
            await fetchMasterData();
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h1 style={styles.title}>Price Periode</h1>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button
                    onClick={(e) => setChangePeriod(false)}
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

                <form onSubmit={handleSubmit} className="flex flex-wrap flexDirection-row">
                    <div style={styles.formGroup}>
                        <label htmlFor="nameProduct" style={styles.label}>Name Product</label>
                        <input
                            type="text"
                            name="nameProduct"
                            value={formData.nameProduct}
                            onChange={handleFormHeaderChange}
                            style={styles.input}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="imgProduct" style={styles.label}>Image</label>
                        <input
                            type="file"
                            name="imgProduct"
                            value={formData.imgProduct}
                            onChange={handleFormHeaderChange}
                            style={styles.input}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div style={styles.formGroup} className="w-full grid">
                        <label htmlFor="description" style={styles.label}>Description</label>
                        <textarea
                            className="w-full mt-2 border border-black px-2"
                            name="description"
                            onChange={handleFormHeaderChange}
                        >{formData.description}</textarea>
                    </div>

                    <div className="w-[100%] text-end p-2 flex justify-end">
                        <button
                            type="submit"
                            className="px-2 py-1 bg-white shadow-md rounded-md text-[12px] font-bold w-[20%] h-full"
                            disabled={loading}
                        >
                            Add Price
                        </button>
                    </div>

                </form>

                <hr style={styles.hr} />

                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead style={styles.thead}>
                            <tr>
                                <th style={styles.th}>Header Period</th>
                                <th style={styles.th}>Start Period</th>
                                <th style={styles.th}>End Period</th>
                                <th style={styles.th}>Price</th>
                                <th style={{ ...styles.th, ...styles.actionColumn }}>#</th>
                            </tr>
                        </thead>
                        <tbody style={styles.tbody}>
                            {listPeriode.map((periode) => {
                                return (
                                    <tr key={periode.id} style={styles.tr}>
                                        <td style={styles.td} onDoubleClick={() => handleDoubleClick(periode.id, 'name')}>
                                            {editIndex === periode.id && editField === 'name' ? (
                                                <input
                                                    style={styles.input}
                                                    type="text"
                                                    value={periode.name || ''}
                                                    onChange={(e) => handleFormTableChange(periode.id, 'name', e.target.value)}
                                                    onBlur={handleBlur}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span>{periode.name}</span>
                                            )}
                                        </td>
                                        <td style={styles.td} onDoubleClick={() => handleDoubleClick(periode.id, 'date_start')}>
                                            {editIndex === periode.id && editField === 'date_start' ? (
                                                <input
                                                    style={styles.input}
                                                    type="date"
                                                    value={periode.date_start ? new Date(periode.date_start).toISOString().substring(0, 10) : ''}
                                                    onChange={(e) => handleFormTableChange(periode.id, 'date_start', e.target.value)}
                                                    onBlur={handleBlur}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span>{periode.date_start ? new Date(periode.date_start).toISOString().substring(0, 10) : ''}</span>
                                            )}
                                        </td>
                                        <td style={styles.td} onDoubleClick={() => handleDoubleClick(periode.id, 'date_end')}>
                                            {editIndex === periode.id && editField === 'date_end' ? (
                                                <input
                                                    style={styles.input}
                                                    type="date"
                                                    value={periode.date_end ? new Date(periode.date_end).toISOString().substring(0, 10) : ''}
                                                    onChange={(e) => handleFormTableChange(periode.id, 'date_end', e.target.value)}
                                                    onBlur={handleBlur}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span>{periode.date_end ? new Date(periode.date_end).toISOString().substring(0, 10) : ''}</span>
                                            )}
                                        </td>
                                        <td style={{ ...styles.td, ...styles.actionColumn }}>
                                            {periode.price}
                                            Rp. 12999
                                        </td>
                                        <td style={{ ...styles.td, ...styles.actionColumn }}>
                                            {periode.status && (
                                                <button>
                                                    <img src={iconCentang} alt="Centang Icon" />
                                                </button>
                                            )}
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
        margin: '0 10px'
    },
    label: {
        color: 'black',
    },
    input: {
        width: '200px',
        border: '1px solid black',
        boxSizing: 'border-box',
        padding: '5px',
        height: '40px'
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
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#AFAFAF',
        fontWeight: '500',
        fontSize: '10px'
    },
    td: {
        border: '1px solid black',
        padding: '3px',
        textAlign: 'center',
        verticalAlign: 'middle',
        fontSize: "10px"
    },
    tr: {
        display: 'table',
        width: '100%',
        tableLayout: 'fixed',
    },
    actionColumn: {
        width: '100px',
    },
};

export default FormChangePeriode;