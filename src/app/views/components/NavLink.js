import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({
  commonUrl,
  isPathActive,
  iconClass,
  title,
  url,
  child = [],
}) => {
  const [subdirectory, setSubdirectory] = useState(false);
  const { pathname } = useLocation();

  // Check if the current path is exactly the commonUrl or any of the child URLs
  const isActive =
    pathname === commonUrl || child.some((c) => pathname.includes(c.url));
  const isExactMatch = pathname === commonUrl;

  return (
    <>
      <li
        className={
          isExactMatch
            ? "nav-item active"
            : isActive
            ? "nav-item active"
            : "nav-item"
        }
      >
        <Link
          className="nav-link"
          to={url}
          onClick={() => setSubdirectory(!subdirectory)}
        >
          <span className="menu-title">{title}</span>
          {iconClass}
        </Link>
      </li>
      {child.length > 0 && subdirectory && (
        <ul className="nav">
          {child.map((c) => (
            <li
              key={c.url}
              className={
                pathname.includes(c.url) ? "nav-item active" : "nav-item"
              }
            >
              <Link className="nav-link py-3" to={c.url}>
                {c.iconClass}
                <span className="menu-title">{c.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NavLink;
