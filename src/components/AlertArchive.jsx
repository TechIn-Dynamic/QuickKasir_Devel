import { useEffect, useState } from "react";
import formatDateToInput from "../helpers/HelperFunction";

const AlertArchive = ({ setShowModal }) => {
    const [formData, setFormData] = useState({
        periodeName: "",
        periodeFrom: formatDateToInput(new Date()),
        periodeTo: formatDateToInput(new Date()),
    });
    
    const setArchive = () => {
        console.log("Archive");
    };

    return (
        <div style={styles.modalOverlay}>
           <div style={styles.modalContent}>
            <p>
                Ketika Product Di Arsipkan Maka Produk Tidak Akan Muncul Di Kasir
                </p>

                <div className="flex justify-end gap-9 mt-5">
                    <button
                        onClick={(e) => setArchive()}
                        style={{
                            top: '10px',
                            right: '10px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '16px',
                            cursor: 'pointer',
                            backgroundColor: '#3C3E40'
                        }}
                        className="px-10 py-1 rounded-md shadow-md text-white font-bold"
                    >
                        Archive
                    </button>
                    <button
                        onClick={(e) => setShowModal(false)}
                        style={{
                            top: '10px',
                            right: '10px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '16px',
                            cursor: 'pointer',
                            backgroundColor: '#0B7AF8'
                        }}
                        className="px-10 py-1 rounded-md shadow-md text-white font-bold"
                    >
                        Cancel
                    </button>
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
        alignItems: 'top',
        paddingTop: '40px',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        padding: '20px',
        width: '544px',
        height: '118px',
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
        alignItems: 'top'
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
        verticalAlign: 'top',
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

export default AlertArchive;