import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, ModalBody } from "react-bootstrap";
import { toast } from "react-toastify";
import FeatherIcon from "feather-icons-react";
import { UserCircle, SignOut } from "@phosphor-icons/react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalShow, setModalShow] = React.useState(false);
  const toggleOffcanvas = () => {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  };
  const handleLogout = () => {
    try {
      // Clear all stored data
      localStorage.clear();
      // Show success message
      toast.success("Logged out successfully");
      // Redirect to login page
      navigate("/login");
      setModalShow(false);
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  // const toggleRightSidebar = () => {
  //   document.querySelector(".right-sidebar").classList.toggle("open");
  // };

  const targetRef = useRef(null);
  const [profiledropdown, setProfiledropdown] = React.useState(false);
  const handleButtonClick = (event) => {
    event.stopPropagation(); // Stop event propagation
    setProfiledropdown(!profiledropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (targetRef.current && !targetRef.current.contains(event.target)) {
        setProfiledropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setProfiledropdown(false);
  }, [location.pathname]);
  return (
    <>
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          {/* <Link className="navbar-brand brand-logo" to="/">
            <img src={require("../../../assets/images/logo-final.png")} alt="logo" />
          </Link>
          <Link className="navbar-brand brand-logo-mini" to="/">
            <img
              src={require("../../../assets/images/logo-mini.png")}
              alt="logo"
            />
          </Link> */}
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            onClick={() => document.body.classList.toggle("sidebar-icon-only")}
          >
            <FeatherIcon className="cursor-pointer" icon="menu" size="18" />
          </button>

          {/* <CustomModal
            confirmOnClick={handleLogout}
            btnClass="mdi-logout mx-2 ms-auto text-primary ml-auto align-self-center navbar-logout-btn"
            modalBodyContent="Are you sure want to Logout!"
          /> */}
          <div className="navbar_profile my-auto ms-auto">
            <span onClick={handleButtonClick} className="navbar_profile_btn">
              <UserCircle size={25} />
            </span>
            {profiledropdown ? (
              <div className="navbar_profile_dropdown" ref={targetRef}>
                <button onClick={() => setModalShow(true)}>
                  Logout <SignOut size={18} />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            onClick={toggleOffcanvas}
          >
            <FeatherIcon className="cursor-pointer" icon="menu" size="18" />
          </button>
        </div>
      </nav>
      <Modal
        show={modalShow}
        size="sx"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalBody>
          <h4>Are you sure want to logout!</h4>
        </ModalBody>
        <Modal.Footer>
          <button
            type="button"
            className="btn_secondary"
            onClick={() => setModalShow(false)}
          >
            Not now
          </button>
          <button onClick={handleLogout} type="button" className="btn_primary">
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
