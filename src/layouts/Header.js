/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  UncontrolledDropdown
} from "reactstrap";
import logo from "../assets/images/logos/android-chrome-512x512.png";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Quản lý sản phẩm",
    href: "/product",
    icon: "bi bi-people",
  },
  {
    title: "Quản lý nhà yến",
    href: "/house",
    icon: "bi bi-people",
  },
  {
    title: "Quản lý lô sản xuất",
    href: "/dashboard",
    icon: "bi bi-people",
  },
  // {
  //   title: "Done",
  //   href: "/done",
  //   icon: "bi bi-people",
  // },
];


const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  // const showMobilemenu = () => {
  //   document.getElementById("sidebarArea").classList.toggle("showSidebar");
  // };

  const [activeItem, setActiveItem] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");

  const handleMenuItemClick = (href) => {
    setActiveItem(href);
  };

  const handleLogoClick = () => {
    setActiveItem("");
  };

  // const showMobilemenu = () => {
  //   document.getElementById("sidebarArea").classList.toggle("showSidebar");
  // };
  let location = useLocation();

  useEffect(() => {
    setActiveItem("");
  }, [location.pathname]);

  const toggleSubMenu = (href) => {
    setActiveItem((prev) => (prev === href ? "" : href));
  };

  return (
    <Navbar color="primary" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <img src={logo} style={{ width: "31px", height: "31px" }} />
        </NavbarBrand>
        {/* <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button> */}
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      {/*TODO: sẽ cập nhật khi có chức năng login  */}
      <Collapse navbar isOpen={isOpen} style={{ height: "32px", zIndex:"999", backgroundColor:"white" }}>
        {/* <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/starter" className="nav-link">
              Starter
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </NavItem>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              DD Menu
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav> */}
        <Nav className="me-auto" navbar>
          {navigation.map((navi, index) => (
            <NavItem key={index} className="nav-link">
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
        {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <img
              src="#"
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Edit Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>My Balance</DropdownItem>
            <DropdownItem>Inbox</DropdownItem>
            <DropdownItem>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
      </Collapse>
    </Navbar>
  );
};

export default Header;
