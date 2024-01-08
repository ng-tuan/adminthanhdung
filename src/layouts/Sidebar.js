import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Order",
    href: "/order",
    icon: "bi bi-people",
  },
  {
    title: "Process",
    href: "/process",
    icon: "bi bi-people",
  },
  {
    title: "Submit",
    href: "/submit",
    icon: "bi bi-people",
  },
  {
    title: "Done",
    href: "/done",
    icon: "bi bi-people",
  },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");

  const handleMenuItemClick = (href) => {
    setActiveItem(href);
  };

  const handleLogoClick = () => {
    setActiveItem("");
  };

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  useEffect(() => {
    setActiveItem("");
  }, [location.pathname]);
  
  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo onClick={handleLogoClick} />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                onClick={() => handleMenuItemClick(navi.href)}
                className={
                  (location.pathname === navi.href || activeItem === navi.href)
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
