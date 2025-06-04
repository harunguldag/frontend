import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function ForgetPassword() {
    const [stage, setStage] = useState(0)
    const [errors, setErrors] = useState([]);
    const [find2, setFind2] = useState("");
    const [email, SetEmail] = useState(null)
    // const [number, SetNumber] = useState(null)
    const [selectedValue, setSelectedValue] = useState('email');
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    const Stage0 = () => {
        const [find, setFind] = useState("");

        const handleSubmit = async (e) => {
            setErrors([]);
            e.preventDefault();

            try {
                setLoading(true);
                const res = await api.post("/api/reset-password/", { stage: stage, find: find });
                setFind2(find)
                if (res.data.email !== "") {
                    SetEmail(res.data.email)
                }
                // if (res.data.number !== "") {
                //     SetNumber(res.data.number)
                // }
                setLoading(false);
                setStage(1)
            } catch (error) {
                setLoading(false);
                setErrors([error.response.data.user]);
            }
        };

        return <>
            <h1 className="mb-0">find your account</h1>
            <p></p>
            <p className="mb-4">To change your password, enter the email address or username associated with your account.</p>
            <form onSubmit={handleSubmit}>

                <div className="form-floating mb-3">
                    <input
                        className="form-control rounded-3"
                        type="text"
                        value={find}
                        onChange={(e) => setFind(e.target.value)}
                        // placeholder="Username"
                        maxLength={254}
                        required
                    />
                    <label>Email address or username</label>
                </div>
                <p></p>

                <p></p>
                {loading ?
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary disabled" aria-disabled="true"><div className="text-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div></button> :
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Submit</button>
                }
                {/* <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Submit</button> */}
            </form>
        </>
    }
    const Stage1 = () => {

        const handleChange = (event) => {
            setSelectedValue(event.target.value);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setErrors([]);
            try {
                setLoading(true);
                await api.post("/api/reset-password/", { stage: stage, find: find2, method: selectedValue });
                setLoading(false);
                setStage(2)
            } catch (error) {
                setLoading(false);
                // setErrors([error.response.data.number]);
            }
        };
        return <>
            <h1 className="mb-0">Where should we send the confirmation code?</h1>
            <p></p>
            <p className="mb-4">Before changing your password, we need to make sure it's you who made the change.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={selectedValue}
                            name="radio-buttons-group"
                            onChange={handleChange}
                        >
                            {email !== null && <FormControlLabel value="email" control={<Radio />} label={"Send an e-mail to " + email} />}
                            {/* <hr className="my-4" /> */}
                            {/* {number !== null && <FormControlLabel value="number" control={<Radio />} label={"Send a code via text message to my phone ending with " + number} />} */}
                        </RadioGroup>
                    </FormControl>
                </div>
                <p></p>

                {loading ?
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary disabled" aria-disabled="true"><div className="text-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div></button> :
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Submit</button>
                }
            </form>
        </>
    }
    const Stage2 = () => {
        const [code, setCode] = useState("");
        const handleBack = () => {
            setStage(1)
        };

        const handleSubmit = async (e) => {
            setErrors([]);
            e.preventDefault();
            try {
                setLoading(true);
                const res = await api.post("/api/reset-password/", { stage: stage, find: find2, method: selectedValue, code: code });
                setToken(res.data.token)
                setLoading(false);
                setStage(3)
            } catch (error) {
                setLoading(false);
                setErrors([error.response.data]);
            }
        };

        return <>
            <h1 className="mb-0">We sent you a code</h1>
            <p></p>
            <p className="mb-4">Check if you received the verification code. If you need to request a new code, go back and reselect your verification method.</p>
            <form onSubmit={handleSubmit}>

                <div className="form-floating mb-3">
                    <input
                        className="form-control rounded-3"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter Code"
                        maxLength={254}
                        required
                    />
                    <label>Enter Code</label>
                    
                </div>
                <p>! It may have gone to spam, please check and mark it as not spam.</p>

                <p></p>

                {code === "" ? (
                    <button
                        className="w-100 mb-2 btn btn-lg rounded-3 btn-light"
                        style={{ border: "solid", borderWidth: "1px" }}
                        onClick={handleBack}
                    >
                        Back
                    </button>
                ) : (
                    loading ? (
                        <button
                            className="w-100 mb-2 btn btn-lg rounded-3 btn-primary disabled"
                            aria-disabled="true"
                        >
                            <div className="text-center">
                                <div className="spinner-border" role="status"></div>
                            </div>
                        </button>
                    ) : (
                        <button
                            className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                            type="submit"
                        >
                            submit
                        </button>
                    )
                )}


                {/* {code === "" ? <button className="w-100 mb-2 btn btn-lg rounded-3 btn-light" style={{ border: "solid", borderWidth: "1px" }} onClick={handleBack} >Back</button>
                    :
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Submit</button>} */}
            </form>
        </>
    }
    const Stage3 = () => {
        const [New, setNew] = useState("");
        const [Confirm, setConfirm] = useState("");

        const handleSubmit = async (e) => {
            setErrors([]);
            e.preventDefault();

            if (New !== Confirm) {
                setErrors(["Passwords do not match"]);
                return;
            }

            try {
                setLoading(true);
                await api.post("/api/reset-password/", { stage: stage, token: token, new_password: New, find: find2 });
                localStorage.clear()
                const res = await api.post("/api/token", { "username": find2, "password": New })
                setLoading(false);
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/profile")
            } catch (error) {
                setLoading(false);
                setErrors([error.response.data]);
            }
        }


        return <>
            <h1 className="mb-0">Choose New Password</h1>
            <p></p>
            <p className="mb-4">Make sure your new password is 8 or more characters long. Try to use numbers, letters, and punctuation to create a strong password.</p>
            <form onSubmit={handleSubmit}>


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
                <p></p>
                {/* <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Submit</button> */}
                {loading ?
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary disabled" aria-disabled="true"><div className="text-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div></button> :
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">
                        Submit
                    </button>
                }
            </form>
        </>
    }


    return (
        <div className="modal fade show overlay" tabIndex="-1" role="dialog" >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                            <div className="col-md-3 mb-2 mb-md-0 icon">

                            </div>
                        </a>
                        <button type="button" className="btn-close" onClick={goBack} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-body p-4 text-center">

                            {stage === 0 && <Stage0></Stage0>}
                            {stage === 1 && <Stage1></Stage1>}
                            {stage === 2 && <Stage2></Stage2>}
                            {stage === 3 && <Stage3></Stage3>}
                            <div style={{ margin: "10px" }} className="error">
                                {
                                    <ul style={{ padding: "0" }}>
                                        {errors.map((error, index) => (
                                            <li key={index}>{` ${error}`}</li>
                                        ))}
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ForgetPassword;