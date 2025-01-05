import React from "react";
import Menu from "../Menu";
import { menuItems } from "../../utils/MenuData";

const Sidebar: React.FC = () => {
  return (
    <aside className="navbar-aside sidebar-component" id="offcanvas_aside">
      <div className="aside-top items-center">
        <img
          src="assets/imgs/theme/logo.svg"
          className="logo"
          alt="Evara Dashboard"
        />
        <div>
          <button className="btn btn-icon btn-aside-minimize">
            <i className="text-muted material-icons">menu_open</i>
          </button>
        </div>
      </div>
      <Menu menuItems={menuItems} />;
    </aside>
  );
};

export default Sidebar;
