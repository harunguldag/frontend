import React, { useState } from 'react';
import api from '../api';

function Contactus() {
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setSuccess([]);
        try {
            const res = await api.post("/api/contact_us/", { message, subject });
            if (res.status === 200) {
                setMessage("");
                setSubject("");
                setSuccess(["Your message has been received."]);
            }
        }
        catch (error) {
            setErrors([error.response.data]);
        }
    };

    return (<div className='w-100 mt-3' style={{ marginBottom: "30px" }} >
        <ul className="list-group ">
            <li className="list-group-item">
                <form onSubmit={handleSubmit} >

                    <p>Subject</p>
                    <input
                        placeholder="Subject"
                        className="form-control"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        maxLength={30}
                        required

                    />
                    <p></p>
                    <p></p>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea type="text"
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="form-control"
                            id="message"
                            rows="5"
                            placeholder="Write your message here">

                        </textarea>
                    </div>

                    <div className="error">
                        {<>
                            <ul style={{ padding: "0" }}>
                                {errors.map((error, index) => (
                                    <li key={index}>{` ${error}`}</li>
                                ))}
                            </ul>
                            <ul style={{ padding: "0" }}>
                                {success.map((error, index) => (
                                    <li style={{ "color": "green" }} key={index}>{` ${error}`}</li>
                                ))}
                            </ul>
                        </>

                        }
                    </div>

                    <button type="submit" className="btn btn-outline-secondary">
                        Send
                    </button>
                </form>
            </li>
        </ul>
    </div>
    )
}
export default Contactus;