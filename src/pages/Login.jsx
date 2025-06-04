import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/authHelper";
import GoogleSignIn from "../components/GoogleLogin";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setErrors([]);
        setLoading(true);
        e.preventDefault();
        navigate("/profile")
    };

    return (
        <div className="container-fluid p-0">
            <div >
                <div className=" modal modal-sheet position-static d-block body-secondary p-4 py-md-5" tabIndex="-1" role="dialog" id="modalSignin">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content rounded-4 shadow">
                            <Link to="/"><i className="fas fa-beer position-absolute top-0 start-0 m-2"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg></i></Link>
                            <div className="modal-header p-5 pb-4 border-bottom-0">
                                <h1 className="fw-bold mb-0 fs-2">Log in to your account</h1>
                            </div>
                            <div className="modal-body p-5 pt-0">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input
                                            className="form-control rounded-3"
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Username"
                                            maxLength={30}
                                            required
                                        />
                                        <label>Username or Email</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            className="form-control rounded-3"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            maxLength={128}
                                            required
                                        />
                                        <label >Password</label>
                                    </div>
                                    <div className="error">
                                        {errors.length > 0 && (
                                            <ul>
                                                {errors.map((error, index) => (
                                                    <li key={index}>{`${error.message[0]}`}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {loading ?
                                        <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary disabled" aria-disabled="true"><div className="text-center">
                                            <div className="spinner-border" role="status">
                                            </div>
                                        </div></button> :
                                        <button className=" border w-100 mb-2 btn btn-lg rounded-3 " type="submit">
                                            Login
                                        </button>
                                    }

                                    <Link to="/reset_password">
                                        <small>Forgot password?</small></Link>

                                </form>
                                <hr className="my-4" />
                                <h2 className="fs-5 fw-bold mb-3">Login with Google</h2>
                                <GoogleSignIn method="login" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Login() {
    if (isAuthenticated()) {
        return <Navigate to="/profile" />;
    }
    return <LoginForm />
}
export default Login;