import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import "../styles/navigation.css";
import { UserContext } from '../UserContext';
import { useEffect } from "react";

function Navbar() {
    const { user } = useContext(UserContext);
    const [isDisabled] = useState(user.subscription.status !== "active");
    const [activeIndex, setActiveIndex] = useState(0);
    const [alert, setAlert] = useState(false);

    const handlealert = (a) => {
        if (user.subscription.status !== "active") {
            setAlert(true);
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 5000);
        }
        else {
            handleClick(a);
        }
    }

    useEffect(() => {
        if (window.location.pathname === "/profile") setActiveIndex(0);
        if (window.location.pathname === "/chats") setActiveIndex(1);
        if (window.location.pathname === "/explore") setActiveIndex(2);
        if (window.location.pathname === "/likes") setActiveIndex(3);
        if (window.location.pathname === "/settings") setActiveIndex(4);

    }, ([]))

    const handleClick = (a) => {
        setActiveIndex(a);
    };

    return (
        <div className="container " >
            {alert && <div className="alert alert-danger fixed-alert" role="alert">
                You must pay to use this feature. Please go to Settings - Payments
            </div>}

            <header className="d-flex justify-content-center fixed-bottom " style={{ zIndex: "1000", paddingBottom: "5px" }} >
                <ul className="p-0 m-0 mb-1 d-flex justify-content-center" style={{ width: "100%" }}>
                    <div className="navigation m-0 p-0 align-items-center justify-content-center"  >
                        <ul className='m-0 p-0 ' >

                            <li className={activeIndex === 0 ? "activee" : ""} onClick={(e) => { e.preventDefault(); handlealert(0) }}>
                                <Link to="/profile"
                                    style={{
                                        height: "100%",
                                        paddingBottom: "5px",
                                        pointerEvents: isDisabled ? "none" : "auto",
                                    }}
                                >
                                    <span className="icon">
                                        <i style={{ fontSize: "27px" }} className={`bi bi-person`}></i>
                                    </span>
                                </Link>
                            </li>

                            <li className={activeIndex === 1 ? "activee" : ""} onClick={(e) => { e.preventDefault(); handlealert(1) }}>
                                <Link to={isDisabled ? "#" : "/chats"}
                                    style={{
                                        height: "100%",
                                        paddingBottom: "5px",
                                        pointerEvents: isDisabled ? "none" : "auto",
                                    }}
                                >
                                    <span className="icon">
                                        <i style={{ fontSize: "27px" }} className={`bi bi-chat-dots`}></i>
                                    </span>
                                </Link>
                            </li>

                            <li className={activeIndex === 2 ? "activee" : ""} onClick={() => handleClick(2)}>
                                <Link to="/explore" style={{ height: "100%", paddingBottom: "5px" }}>
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-search-heart" viewBox="0 0 16 16">
                                            <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018" />
                                            <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11" />
                                        </svg>
                                    </span>
                                </Link>
                            </li>

                            <li className={activeIndex === 3 ? "activee" : ""} onClick={() => handleClick(3)}>
                                <Link to="/likes" style={{ height: "100%", paddingBottom: "5px" }}>
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-person-heart" viewBox="0 0 16 16">
                                            <path d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z" />
                                        </svg>
                                    </span>
                                </Link>
                            </li>

                            <li className={activeIndex === 4 ? "activee" : ""} onClick={() => handleClick(4)}>
                                <Link to="/settings" style={{ height: "100%", paddingBottom: "5px" }}>
                                    <span className="icon">
                                        <i style={{ fontSize: "27px" }} className={`bi bi-gear`}></i>
                                    </span>
                                </Link>
                            </li>

                            <div className="indicator" style={{ transform: `translateX(calc(70px * ${activeIndex}))` }}>
                                <span></span>
                            </div>

                        </ul>
                    </div>
                </ul>
            </header>
        </div>
    )
}
export default Navbar;