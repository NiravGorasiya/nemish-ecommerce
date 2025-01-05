import React from 'react';
import { Search as SearchIcon, Notifications as NotificationsIcon, NightsStay as NightsStayIcon, Cast as CastIcon, Public as PublicIcon, PermIdentity as PermIdentityIcon, Settings as SettingsIcon, AccountBalanceWallet as AccountBalanceWalletIcon, Receipt as ReceiptIcon, HelpOutline as HelpOutlineIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';

const Header = () => {
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
                    <li className="dropdown nav-item">
                        <a className="dropdown-toggle" data-bs-toggle="dropdown" href="#" id="dropdownAccount" aria-expanded="false">
                            <img className="img-xs rounded-circle" src="assets/imgs/people/avatar2.jpg" alt="User" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownAccount">
                            <a className="dropdown-item" href="#"><PermIdentityIcon /> Edit Profile</a>
                            <a className="dropdown-item" href="#"><SettingsIcon /> Account Settings</a>
                            <a className="dropdown-item" href="#"><AccountBalanceWalletIcon /> Wallet</a>
                            <a className="dropdown-item" href="#"><ReceiptIcon /> Billing</a>
                            <a className="dropdown-item" href="#"><HelpOutlineIcon /> Help center</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item text-danger" href="#"><ExitToAppIcon /> Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
