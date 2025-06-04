import React, { useState } from 'react';
import "../styles/settings.css";
import Account from '../components/Account';
import Contactus from '../components/Contactus';
import Payments from '../components/Payments';

function tab(t, setActiveTab) {
    setActiveTab(t);
}

function PcSideBar({ activeTab, setActiveTab }) {
    return (
        <div>
            <main className="d-flex flex-nowrap" style={{ overflowY: "hidden" }} >
                {/* <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary " style={{ width: "170px", position: "-webkit-sticky", height: "95vh" }}> */}
                <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary " style={{ width: "170px", position: "fixed", height: "95vh" }}>

                    <ul className="nav nav-pills flex-column mb-auto ">
                        <li className="nav-item ">
                            <button onClick={() => tab("Account", setActiveTab)} style={{ width: "135px" }} className={activeTab === "Account" ? "nav-link aactive" : "nav-link"} aria-current="page">
                                <svg className="bi pe-none me-2" width="16" height="16"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg></svg>
                                Account
                            </button>
                        </li>
                        <li>
                            <button onClick={() => tab("Payments", setActiveTab)} style={{ width: "135px" }} className={activeTab === "Payments" ? "nav-link aactive" : "nav-link"}>
                                <svg className="bi pe-none me-2" width="16" height="16"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                                </svg></svg>
                                Payments
                            </button>
                        </li>
                        <li>
                            <button onClick={() => tab("Contact", setActiveTab)} style={{ width: "135px" }} className={activeTab === "Contact" ? "nav-link aactive" : "nav-link"}>
                                <svg className="bi pe-none me-2" width="16" height="16"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                                    <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                                    <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                                </svg></svg>
                                Contact us
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="container-fluid" style={{ overflowX: "hidden" }} >
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="d-flex justify-content-center">
                                <div style={{ width: "100%", maxWidth: "1200px", marginLeft: "160px" }}>
                                    {activeTab === 'Account' && <Account />}
                                    {activeTab === 'Payments' && <Payments />}
                                    {activeTab === 'Contact' && <Contactus />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

function PhoneSideBar({ activeTab, setActiveTab }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div  >
            <button style={{ border: "none", position: "fixed", zIndex: "1000", background: "none", }} onClick={toggleSidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fillRule="currentColor" className="bi bi-justify" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                </svg>
            </button>
            <div className={` sidebar ${isSidebarOpen ? 'open' : ''}`}>

                <ul className="nav nav-pills flex-column list-group">
                    <li className="nav-item">
                        <button onClick={() => { tab("Account", setActiveTab); toggleSidebar(); }} className={activeTab === "Account" ? "nav-link aactive" : "nav-link"} aria-current="page">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg> Account
                        </button>
                    </li>
                    <li>
                        <button onClick={() => { tab("Payments", setActiveTab); toggleSidebar(); }} className={activeTab === "Payments" ? "nav-link aactive" : "nav-link"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                            </svg> Payments
                        </button>
                    </li>
                    <li>
                        <button onClick={() => { tab("Contact", setActiveTab); toggleSidebar(); }} className={activeTab === "Contact" ? "nav-link aactive" : "nav-link"}>
                            <svg className="bi pe-none me-2" width="16" height="16"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                                <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                                <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                            </svg></svg>    Contact us
                        </button>
                    </li>

                </ul>

            </div>
            <div className={`content ${isSidebarOpen ? 'shift' : ''}`} >
                {activeTab === 'Account' && <Account />}
                {activeTab === 'Payments' && <Payments />}
                {activeTab === 'Contact' && <Contactus />}
            </div>
        </div>
    );
}

function Settings() {
    const [activeTab, setActiveTab] = useState('Account');


    return (
        <div className="settings">
            <div className='pc'>
                <PcSideBar activeTab={activeTab} setActiveTab={setActiveTab} />

            </div>


            <div className='phone'>
                <PhoneSideBar activeTab={activeTab} setActiveTab={setActiveTab} />

            </div>
        </div>

    )
}
export default Settings;