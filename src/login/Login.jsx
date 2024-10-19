import { useEffect, useState } from "react";
import { loginService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
           const res =  await loginService({
                identifier: formData.identifier,
                password: formData.password   
            });

            if(res){
                console.log(res.user.level);
                localStorage.setItem('token', res.token);
                if(res.user.level === "karyawan"){
                    navigate("/");
                }else{
                    navigate("/admin");
                }
            }else{
                alert("Username / Password Anda Salah, Harap periksa kembali!")
            }

        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setError(error.response.message);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const { identifier, password } = formData;
        if (!identifier || !password) {
            setError("All fields are required");
            return false;
        }

        setError("");
        return true;
    };

    const changeInput = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
    };
 
    return (
            <>
                <div className="bg-gray-300 h-screen w-screen flex justify-center items-center">
                    <div className="bg-gray-100 w-[25%] h-[40%] shadow-md rounded-xl p-3 px-10 py-5">
                        <h1 className="text-center font-bold text-[30px]">Sign In</h1>

                        <form onSubmit={handleLogin} className="mt-10 grid gap-5">
                            <input type="text" placeholder="Username" name="identifier" className="rounded-2xl pl-4 shadow-md w-full py-2" onChange={changeInput} required/>
                            
                            <div className="relative flex">
                                <input type={showPass ? "text" : "password"} placeholder="Password" id="password" name="password" className="rounded-2xl pl-4 shadow-md w-full py-2" onChange={changeInput} required/>
                                <button type="button" onClick={e => setShowPass(!showPass)}>
                                    {!showPass ? <img src="images/eyes.png" alt="eyes" width={40} className="absolute right-0 bottom-0 pb-1 pr-2" /> : ''}
                                    {showPass ? <img src="images/eye-no.png" alt="eyes" width={40} className="absolute right-0 bottom-0 pb-1 pr-2" /> : ''}
                                </button>
                            </div>


                            <div className="w-full mt-4">
                                <button className="bg-gray-400 text-white font-bold px-2 py-1 w-full rounded-xl shadow-md">
                                    {loading ? 'Loading' : 'Sign In'}
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </>
        )
    };

export default Login;