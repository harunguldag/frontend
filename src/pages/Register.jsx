import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../utils/authHelper";
import api from "../api";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import GoogleSignIn from "../components/GoogleLogin";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password_conf, setPassword_conf] = useState("");
    const [email, setEmail] = useState("");
    const [validate_code, setvalidate_code] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [validate_input, setvalidate_input] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [countdown, setCountdown] = useState(60);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        navigate("/profile")

    };

    const handleClick = () => {
        api.post("api/CreateVCode/", { email })
        setErrors([{ message: "code sent" }]);
        setIsActive(false);
    };


    return (
        <div className="container-fluid p-0">

            <div>
                <div>
                    <div className=" modal modal-sheet position-static d-block body-secondary p-4 py-md-5" tabIndex="-1" role="dialog" id="modalSignin">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content rounded-4 shadow">
                                <Link to="/"><i className="fas fa-beer position-absolute top-0 start-0 m-2"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                </svg></i></Link>
                                <div className="modal-header p-5 pb-4 border-bottom-0">
                                    <h1 className="fw-bold mb-0 fs-2">Sign Up with Email</h1>
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
                                            <label>Username</label>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input
                                                className="form-control rounded-3"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Email"
                                                maxLength={254}
                                                required
                                            />
                                            <label >Email address</label>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input
                                                className="form-control rounded-3"
                                                type="password"
                                                pattern="\S+"
                                                title="Password cannot contain spaces"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password"
                                                maxLength={128}
                                                minLength={8}
                                                required
                                            />
                                            <label >Password</label>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input
                                                className="form-control rounded-3"
                                                type="password"
                                                pattern="\S+"
                                                title="Password cannot contain spaces"
                                                value={password_conf}
                                                onChange={(e) => setPassword_conf(e.target.value)}
                                                placeholder="Password"
                                                maxLength={128}
                                                minLength={8}
                                                required
                                            />
                                            <label>Password confirmation:</label>
                                        </div>

                                        <div style={{ display: validate_input ? 'block' : 'none' }}>

                                            <div className="input-group mb-3">
                                                <input
                                                    placeholder="enter code"
                                                    className="form-control rounded-3"
                                                    value={validate_code}
                                                    onChange={(e) => setvalidate_code(e.target.value)}
                                                    pattern="\d{6}"
                                                    maxLength={6} />

                                                <button
                                                    id="sayacButon"
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={handleClick}
                                                    disabled={!isActive}>
                                                    {isActive ? 'Resend Code' : `Resend Code in ${countdown}`}
                                                </button>
                                            </div>
                                            <p>! It may have gone to spam, please check and mark it as not spam.</p>

                                        </div>

                                        {loading ?
                                            <button className="navbtns w-100 mb-2 btn btn-lg rounded-3 disabled" aria-disabled="true"><div className="text-center">
                                                <div className="spinner-border" role="status">
                                                </div>
                                            </div></button> :
                                            <button className=" border w-100 mb-2 btn btn-lg rounded-3 " type="submit">Sign Up</button>
                                        }

                                    </form>
                                    <small className="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
                                    <hr className="my-4" />
                                    <h2 className="fs-5 fw-bold mb-3">Sign up with Google</h2>
                                    <GoogleSignIn method="register" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Register() {
    if (isAuthenticated()) {
        return <Navigate to="/profile" />;
    }
    return <RegisterForm />
}
export default Register;