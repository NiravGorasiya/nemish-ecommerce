import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SubMenuItem {
    title: string;
    link: string;
}

interface MenuItem {
    title: string;
    link?: string;
    icon: string;
    disabled?: boolean;
    submenu?: SubMenuItem[];
}

interface MenuComponentProps {
    menuItems: MenuItem[];
}

const Menu: React.FC<MenuComponentProps> = ({ menuItems }) => {
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
    const { pathname } = useLocation();

    const handleSubMenuToggle = (menuTitle: string) => {
        if (activeSubMenu === menuTitle) {
            setActiveSubMenu(null);
        } else {
            setActiveSubMenu(menuTitle);
        }
    };
    return (
        <nav className='items-center'>
            <ul className="menu-aside">
                {menuItems.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className={`menu-item ${item?.link === pathname ? "active" : ""}`}
                        >
                            <Link
                                className="menu-link d-flex align-items-center"
                                to={item?.link? item.link:""}
                                onClick={(e) => {
                                    if (item.disabled) e.preventDefault();
                                    else if (item.submenu) handleSubMenuToggle(item.title);
                                }}
                            >
                                <i className="icon material-icons">{item.icon}</i>
                                <span className="text">{item.title}</span>
                            </Link>
                            {item.submenu && (
                                <div
                                    className={`submenu${activeSubMenu === item.title ? " active" : ""}`}
                                >
                                    {item.submenu.map((subItem, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            to={subItem.link}
                                            className={subItem.link === pathname ? "active" : ""}
                                        >
                                            {subItem.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Menu