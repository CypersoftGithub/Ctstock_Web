import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavLink from "../components/NavLink";
import { Users, Briefcase, Article } from "@phosphor-icons/react";

const sidebarData = [
  {
    iconClass: <Users size={18} />,
    title: "User",
    url: "/user",
  },
  {
    iconClass: <Briefcase size={18} />,
    title: "Company",
    url: "/company",
  },
  {
    iconClass: <Article size={18} />,
    title: "Register",
    url: "/register",
  }
];

const Sidebar = () => {
  const location = useLocation();
  const [menuState, setMenuState] = useState({});
  const [bodyClass, setBodyClass] = useState("sidebar-icon-only");

  const toggleMenuState = (menuStateKey) => {
    setMenuState((prevState) => ({
      ...Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
      [menuStateKey]: !prevState[menuStateKey],
    }));
  };

  const onRouteChanged = () => {
    document.querySelector("#sidebar").classList.remove("active");
    setMenuState({});
  };

  const isPathActive = (path) => location.pathname.startsWith(path);

  useEffect(() => {
    onRouteChanged();
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", () => {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", () => {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });

    return () => {
      // Clean up event listeners if needed
    };
  }, [location]);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        {sidebarData.map((item, index) => (
          <NavLink
            key={index}
            isPathActive={isPathActive}
            url={item.url}
            iconClass={item.iconClass}
            title={item.title}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
