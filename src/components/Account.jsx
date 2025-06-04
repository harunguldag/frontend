import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../styles/settings.css";
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import api from '../api';
import { useEffect } from 'react';

function Account() {
    const { user } = useContext(UserContext);
    const [errors, setErrors] = useState([]);


    function GeneralData() {
        const { user, setUser } = useContext(UserContext);
        const [username, setUsername] = useState(user.username);
        const match = user.date_joined.match(/^\d{4}-\d{2}-\d{2}/);
        const formattedDate = match ? match[0] : null;

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (username === user.username) {
                return;
            }
            try {
                const res = await api.put("/api/update-user/", { username });
                if (res.status === 200) {
                    setErrors(["name changed"]);
                    setUser({ ...user, username: username });
                }
            }
            catch (error) {
                setErrors([error.response.data.username[0]]);
            }

        }
        return (<>

            <li className="list-group-item">
                <p>general account information</p>
                <form onSubmit={handleSubmit}>

                    <div className="input-group mb-3">
                        <input
                            placeholder="username"
                            className="form-control"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            maxLength={30}
                            required
                        />
                    </div>

                    <div className="input-group ">
                        <p className="form-control">
                            account opening date : {formattedDate}
                        </p>
                    </div>
                    <div className="error">
                        {
                            <ul style={{ padding: "0" }}>
                                {errors.map((error, index) => (
                                    <li key={index}>{`${error}`}</li>
                                ))}
                            </ul>
                        }
                    </div>

                    <button type="submit" className="btn btn-outline-secondary">
                        save
                    </button>
                </form>
            </li>
        </>)
    }

    function ChangeMail() {
        const { user, setUser } = useContext(UserContext);
        const [email, setEmail] = useState("");
        const [countdown, setCountdown] = useState(60);
        const [validate_input, setvalidate_input] = useState(false);
        const [isActive, setIsActive] = useState(true);
        const [validate_code, setvalidate_code] = useState("");
        const [errors, setErrors] = useState([]);
        const [show, setShow] = useState(false);
        const [loading, setLoading] = useState(false);

        const handleShow = () => {
            setShow(true);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                if (email === user.email) {
                    setErrors(["you are using this email"]);
                    return;
                }
                setLoading(true);
                setErrors([]);
                const res = await api.put("api/update-email/", { email, code: validate_code });
                setLoading(false);
                if (res.status === 201) {
                    setUser({ ...user, email: email });
                    handleClose();
                }
                if (res.status === 200) {
                    setErrors(["code sent"]);
                    api.post("api/CreateVCode/", { email })
                    setvalidate_input(true)
                    setIsActive(false)
                }
                if (res.status === 208) {
                    setErrors(["code sent"]);
                    setvalidate_input(true)
                }
            }
            catch (error) {
                setLoading(false);
                if (error.response.data.code) {
                    setErrors([error.response.data.code[0]]);
                }
                if (error.response.data.email) {
                    setErrors([error.response.data.email[0]]);
                }
                if (error.response.data.non_field_errors) {
                    setErrors([error.response.data.non_field_errors[0]]);
                }
            }
        }
        const handleClick = () => {
            api.post("api/CreateVCode/", { email })
            setErrors(["code sent"]);
            setIsActive(false);
        };
        const handleClose = () => {
            setErrors([]);
            setIsActive(false);
            setvalidate_input(false);
            setvalidate_code("");
            setCountdown(0)
            setEmail("");
            setShow(false);
        }

        useEffect(() => {
            let interval = null;

            if (!isActive && countdown > 0) {
                interval = setInterval(() => {
                    setCountdown((countdown) => countdown - 1);
                }, 1000);
            } else if (countdown === 0) {
                clearInterval(interval);
                setIsActive(true);
                setCountdown(60);
            }

            return () => clearInterval(interval);
        }, [isActive, countdown]);

        return (<>
            <li className="list-group-item">
                <p>E-mail</p>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" value={user.email} disabled placeholder={user.email} ></input>
                    {!user.third_party &&
                        <div>
                            {/* <button className="btn btn-outline-secondary" type="button" onClick={deleteapi} >Delete</button> */}
                            <button className="btn btn-outline-secondary" type="button" onClick={handleShow} id="button-addon2">{user.email ? "Change" : "Add"}</button>
                        </div>
                    }
                </div>
                {/* {!user.third_party && <small>Mail cannot be deleted when the user's number is not available.</small>} */}
            </li>
            {
                show && (
                    <div className="modal fade show overlay" tabIndex="-1" role="dialog" >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel"> Change e-mail</h1>
                                    {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>

                                        <input
                                            className="form-control rounded-3"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter new e-mail adress"
                                            maxLength={254}
                                            required
                                        />
                                        <div style={{ margin: "10px" }} className="error">
                                            {
                                                <ul style={{ padding: "0" }}>
                                                    {errors.map((error, index) => (
                                                        <li key={index}>{` ${error}`}</li>
                                                    ))}
                                                </ul>
                                            }
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
                                                <p>! It may have gone to spam, please check and mark it as not spam.</p>

                                            </div>
                                        </div>

                                        {loading ?
                                            <button style={{ marginTop: "10px" }} className="w-100 mb-2 btn btn-lg rounded-3 btn-primary disabled" aria-disabled="true"><div className="text-center">
                                                <div className="spinner-border" role="status">
                                                </div>
                                            </div></button> :
                                            <button style={{ marginTop: "10px" }} className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">
                                                Submit
                                            </button>
                                        }
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleClose} data-bs-dismiss="modal">Close</button>
                                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>)
    }

    function ChangePassword() {
        const [Current, setCurrent] = useState("");
        const [New, setNew] = useState("");
        const [Confirm, setConfirm] = useState("");
        const [errors, setErrors] = useState([]);
        const [show, setShow] = useState(false);
        const [loading, setLoading] = useState(false);

        const handleShow = () => {
            setShow(true);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (Current === New) {
                setErrors(["new password cannot be the same as the old password"]);
                return;
            }
            if (New !== Confirm) {
                setErrors(["passwords do not match"]);
                return;
            }
            try {
                setLoading(true);
                setErrors([]);
                const res = await api.put("/api/update-password/", { old_password: Current, new_password: New })
                setLoading(false);
                if (res.status === 200) {
                    setErrors(["password changed"]);
                }
            }
            catch (error) {
                setLoading(false);
                if (error.response.data.new_password) {
                    setErrors([error.response.data.new_password[0]]);
                }
                if (error.response.data.old_password) {
                    setErrors([error.response.data.old_password[0]]);
                }
            }
        }

        const handleClose = () => {
            setErrors([]);
            setShow(false);
            setCurrent("");
            setNew("");
            setConfirm("");
        }

        return (<>
            <li className="list-group-item">
                <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary" type="button" onClick={handleShow} id="button-addon2">Change Password</button>
                </div>
            </li>
            {
                show && (
                    <div className="modal fade show overlay" tabIndex="-1" role="dialog" >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel1">Change your password</h1>
                                </div>
                                <div className="modal-body">


                                    <form onSubmit={handleSubmit}>

                                        <input
                                            className="form-control rounded-3"
                                            type="password"
                                            value={Current}
                                            onChange={(e) => setCurrent(e.target.value)}
                                            placeholder="Current password"
                                            pattern="\S+"
                                            title="Password cannot contain spaces"
                                            maxLength={128}
                                            minLength={8}
                                            required
                                        />
                                        <Link to="/reset_password" >
                                            <small>Forgot password?</small></Link>
                                        <hr className="my-4" />

                                        <input
                                            className="form-control rounded-3"
                                            type="password"
                                            value={New}
                                            onChange={(e) => setNew(e.target.value)}
                                            placeholder="New password"
                                            pattern="\S+"
                                            title="Password cannot contain spaces"
                                            maxLength={128}
                                            minLength={8}
                                            required
                                            style={{ marginBottom: "10px" }}
                                        />

                                        <input
                                            className="form-control rounded-3"
                                            type="password"
                                            value={Confirm}
                                            onChange={(e) => setConfirm(e.target.value)}
                                            placeholder="Confirm password"
                                            pattern="\S+"
                                            title="Password cannot contain spaces"
                                            maxLength={128}
                                            minLength={8}
                                            required
                                        />

                                        <div style={{ margin: "10px" }} className="error">
                                            {
                                                <ul style={{ padding: "0" }}>
                                                    {errors.map((error, index) => (
                                                        <li key={index}>{` ${error}`}</li>
                                                    ))}
                                                </ul>
                                            }
                                        </div>

                                        <p>When you change your password, other sessions will be terminated.</p>
                                        {loading ?
                                            <button style={{ marginTop: "10px" }} className="w-100 mb-2 btn btn-lg rounded-3 btn-primary disabled" aria-disabled="true"><div className="text-center">
                                                <div className="spinner-border" role="status">
                                                </div>
                                            </div></button> :
                                            <button style={{ marginTop: "10px" }} className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">
                                                Save
                                            </button>
                                        }


                                    </form>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleClose} data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>)}
        </>)
    }

    function Important() {
        const { user } = useContext(UserContext);
        const [show, setShow] = useState(false);
        const [Verify, setVerify] = useState("");
        const navigate = useNavigate();
        const [warning, setwarning,] = useState(false);

        const handleManageSubscription = async (e) => {
            try {
                const res = await api.post('/api/customer-portal/');
                if (res.status === 201) {
                    window.location.href = res.data.url;
                }
            } catch (error) {
                alert("Error while redirecting to customer portal");
            }
        }

        const handleShow = () => {
            setShow(true);
        };

        const handleClose = () => {
            setShow(false);
            setVerify("");
            setwarning(false);
        }

        const handleSubmit = async (e) => {
            e.preventDefault();

            if (Verify !== `delete${user.username}`) {
                return;
            }
            try {
                const res = await api.delete("/api/delete-user/");
                if (res.status === 200) {
                    navigate("/logout");
                }

            }
            catch (error) {
                if (error.status === 400) {
                    setwarning(true);
                }
            }
        }

        return <>
            <li className="list-group-item important">
                <p>
                    <Link to="/logout"><button type="button" className="btn btn-danger">logout</button></Link>
                </p>
                <p>
                    <button type="button" onClick={handleShow} className="btn btn-danger">delete account</button>
                </p>

            </li>
            {
                show && (
                    <div className="modal fade show overlay" tabIndex="-1" role="dialog" >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel1">delete account</h1>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <p>
                                            Please enter <span style={{ fontWeight: 'bold', color: '#000' }}>"delete{user.username}"</span> in the input
                                        </p>
                                        <input
                                            className="form-control rounded-3"
                                            type="text"
                                            value={Verify}
                                            onChange={(e) => setVerify(e.target.value)}
                                            maxLength={254}
                                            required
                                        />
                                    </form>
                                    {warning && <>
                                        <div style={{ backgroundColor: "" }} > <p>{"You have an active subscription. Please cancel your subscription."}</p> </div>
                                    </>}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleClose} data-bs-dismiss="modal">Cancel</button>

                                    {warning ?
                                        <button className="btn btn-outline-secondary" type="button" onClick={handleManageSubscription}>Manage subscription</button>
                                        :
                                        <button type="button" onClick={handleSubmit} className="btn btn-primary">Delete</button>
                                    }


                                </div>
                            </div>
                        </div>
                    </div>)}
        </>
    }

    return (<div className='w-100 mt-3' style={{ marginBottom: "30px" }} >
        <ul className="list-group ">
            <GeneralData />
            <ChangeMail />
            {!user.third_party && <ChangePassword />}
            <Important />
        </ul>
    </div>
    )
}
export default Account