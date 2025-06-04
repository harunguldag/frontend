import React from "react";
import { isAuthenticated } from "../utils/authHelper";
import { Navigate, Link } from "react-router-dom";
import '../styles/landing.css';
import LandingNavBar from "../components/LandingNavBAr";
import Landing_pc from "../components/Landing_pc";
import Landing_mobile from "../components/Landing_mobile";


function Landing() {
    if (isAuthenticated()) { return <Navigate to="/profile" />; }

    return (
        <div >

            <LandingNavBar />

            <div className="lpc"><Landing_pc /></div>

            <div className="lphone"><Landing_mobile /></div>

        </div>
    );


} export default Landing;
