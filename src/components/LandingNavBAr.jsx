import { Link, useNavigate, useLocation } from "react-router-dom";
import '../styles/landing.css';
const apiEndpoint = process.env.REACT_APP_API_URL;


function LandingNavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname.endsWith(path);
    return (
        <>
            <nav className="pcnav custom-navbar">
                <div className="container-fluid">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
                        <div className="col-md-3 mb-2 mb-md-0 icon">
                          
                        </div>
                        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 helpers">
                            <li><Link className={`nav-link px-2" ${isActive("/") ? "active" : ""}`} to="/">Home</Link></li>
                            <li><Link className={`nav-link px-2" ${isActive("/pricing") ? "active" : ""}`} to="/pricing">Pricing</Link></li>
                            <li><Link className={`nav-link px-2" ${isActive("/contactus") ? "active" : ""}`} to="/contactus">Contact us</Link></li>
                            <li><Link className={`nav-link px-2" ${isActive("/useonphone") ? "active" : ""}`} to="/useonphone">use on phone</Link></li>
                        </ul>

                        <div className="col-md-3 text-end forms">
                            <Link to="/login"><button type="button" className="navbtn btn btn-outline-primary me-2">Login</button></Link>
                            <Link to="/register"><button type="button" className="navbtns btn btn-primary">Sign-up</button></Link>
                        </div>
                    </div>
                </div>
            </nav>

            <nav className="phonenav custom-navbar navbar-expand-md navbar" aria-label="Fourth navbar example">
                <div className="container-fluid">

                    <div
                        style={{
                            width: '32px',
                            height: '32px',
                            backgroundImage: `url(${apiEndpoint}/media/icons/logo192.png)`,
                            backgroundSize: 'cover',
                            viewBox: '0 0 16 16',
                        }}
                    ></div>

                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                    </svg>

                    <div className="collapse navbar-collapse " id="navbarsExample04">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0 align-items-center justify-content-center">
                            <li><Link className={`nav-link px-2" ${isActive("/") ? "active" : ""}`} to="/">Home</Link></li>
                            <li><Link className={`nav-link px-2" ${isActive("/pricing") ? "active" : ""}`} to="/pricing">Pricing</Link></li>
                            <li><Link className={`nav-link px-2" ${isActive("/contactus") ? "active" : ""}`} to="/contactus">Contact us</Link></li>
                            <li><Link className={`nav-link px-2" ${isActive("/useonphone") ? "active" : ""}`} to="/useonphone">use on phone</Link></li>
                            <div className="d-grid gap-2 col-12 mx-auto mt-2">
                                <button onClick={() => navigate('/login')} type="button" className=" navbtn btn btn-outline-primary">Login</button>
                                <button onClick={() => navigate('/register')} type="button" className="navbtns btn btn-primary">Sign-up</button>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default LandingNavBar;