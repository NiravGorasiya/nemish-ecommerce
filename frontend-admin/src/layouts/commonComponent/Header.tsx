import React from 'react';
import { Search as SearchIcon, Notifications as NotificationsIcon, NightsStay as NightsStayIcon, Cast as CastIcon, Public as PublicIcon, PermIdentity as PermIdentityIcon, Settings as SettingsIcon, AccountBalanceWallet as AccountBalanceWalletIcon, Receipt as ReceiptIcon, HelpOutline as HelpOutlineIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from "react-bootstrap";

const Header = () => {
    const navigate = useNavigate();
    const handleLogout =()=>{
        localStorage.removeItem('authToken')
        navigate("/login")
    }
    return (
        <header className="main-header navbar">
            <div className="col-search">
                <form className="searchform">
                    <div className="input-group">
                        <input list="search_terms" type="text" className="form-control" placeholder="Search term" />
                        <button className="btn btn-light bg" type="button">
                            <i><SearchIcon /></i>
                        </button>
                    </div>
                    <datalist id="search_terms">
                        <option value="Products" />
                        <option value="New orders" />
                        <option value="Apple iphone" />
                        <option value="Ahmed Hassan" />
                    </datalist>
                </form>
            </div>
            <div className="col-nav">
                <button className="btn btn-icon btn-mobile me-auto" data-trigger="#offcanvas_aside">
                    <i className="material-icons md-apps"></i>
                </button>
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link btn-icon" href="#">
                            <i><NotificationsIcon className="md-notifications animation-shake" /></i>
                            <span className="badge rounded-pill">3</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link btn-icon darkmode" href="#">
                            <NightsStayIcon />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="requestfullscreen nav-link btn-icon">
                            <CastIcon />
                        </a>
                    </li>
                    <li className="dropdown nav-item">
                        <a className="dropdown-toggle" data-bs-toggle="dropdown" href="#" id="dropdownLanguage" aria-expanded="false">
                            <PublicIcon />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownLanguage">
                            <a className="dropdown-item text-brand" href="#">
                                <img src="assets/imgs/theme/flag-us.png" alt="English" />English
                            </a>
                            <a className="dropdown-item" href="#">
                                <img src="assets/imgs/theme/flag-fr.png" alt="Français" />Français
                            </a>
                            <a className="dropdown-item" href="#">
                                <img src="assets/imgs/theme/flag-jp.png" alt="日本語" />日本語
                            </a>
                            <a className="dropdown-item" href="#">
                                <img src="assets/imgs/theme/flag-cn.png" alt="中国人" />中国人
                            </a>
                        </div>
                    </li>
                    <Dropdown>
                        <Dropdown.Toggle as="a" className="nav-link dropdown-toggle">
                            <img className="img-xs rounded-circle" src="/assets/imgs/people/avatar2.jpg" alt="User" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end">
                            <Dropdown.Item as={Link} to="/profile">
                                <PermIdentityIcon className="me-2" /> Edit Profile
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/settings">
                                <SettingsIcon className="me-2" /> Account Settings
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/wallet">
                                <AccountBalanceWalletIcon className="me-2" /> Wallet
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/billing">
                                <ReceiptIcon className="me-2" /> Billing
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/help">
                                <HelpOutlineIcon className="me-2" /> Help Center
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item className="text-danger" onClick={handleLogout}>
                                <ExitToAppIcon className="me-2" /> Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </ul>
            </div>
        </header>
    );
};

export default Header;
