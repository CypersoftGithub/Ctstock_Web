import React, { useEffect, useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeSlash, Buildings, Phone } from "@phosphor-icons/react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [adminData, setAdminData] = useState({
    company_code: "",
    mobile_no: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {

    if (localStorage.getItem("token")) {
      navigate("/user");
    }
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      setGreeting("Good Morning");
    } else if (curHr < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!adminData.company_code.trim()) {
      newErrors.company_code = "Company code is required";
    }
    
    if (!adminData.mobile_no.trim()) {
      newErrors.mobile_no = "Phone number is required";
    } else if (!/^\d{10}$/.test(adminData.mobile_no)) {
      newErrors.mobile_no = "Please enter a valid 10-digit phone number";
    }
    
    if (!adminData.password) {
      newErrors.password = "Password is required";
    } else if (adminData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
      "http://147.93.20.105:5000/api/auth/app/login/v1",
      adminData,
      {
        headers: {
        'Content-Type': 'application/json',
        },
      }
      );
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("token", response.data.data);
        localStorage.setItem("__id", response.data.user_id);
        if(response.data.role == "Admin") {
          toast.success("Login successful!");
          navigate("/user");
        } else {
          toast.error(response.data.message || "Login failed");
        }
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
      error.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="d-flex align-items-center auth px-0 w-100">
          <Row className="w-100 mx-0">
            <Col xxl={4} xl={5} lg={6} md={8} sm={10} xs={12} className="mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <h2 className="text-center mb-4">CT Stock</h2>
                <h4 className="login_heading">Hello! there, {greeting}</h4>

                <p className="login_desc">Let's you in</p>
                <Form className="pt-4" onSubmit={handleLoginSubmit}>
                    <Form.Group className="search-field mb-3">
                    <label className="form-label form-label-required form-label-lg">
                      Company Code
                    </label>
                    <div className="form-control-icon">
                      <input
                        className={`form-control ${errors.company_code ? 'is-invalid' : ''}`}
                      type="text"
                      id="company_code"
                      value={adminData.company_code}
                      onChange={(e) =>
                        setAdminData({ ...adminData, company_code: e.target.value })
                      }
                      placeholder="Enter company code"
                      required
                        />
                        <Buildings />
                        {errors.company_code && (
                          <div className="invalid-feedback">{errors.company_code}</div>
                        )}
                      </div>
                      </Form.Group>
                    <Form.Group className="search-field mb-3">
                    <label className="form-label form-label-required form-label-lg">
                      Phone Number
                    </label>
                    <div className="form-control-icon">
                      <input
                        className={`form-control ${errors.mobile_no ? 'is-invalid' : ''}`}
                        type="tel"
                        id="mobile_no"
                        value={adminData.mobile_no}
                        onChange={(e) =>
                        setAdminData({ ...adminData, mobile_no: e.target.value })
                        }
                      placeholder="Enter phone number"
                      required
                        />
                        <Phone />
                        {errors.mobile_no && (
                          <div className="invalid-feedback">{errors.mobile_no}</div>
                        )}
                      </div>
                      </Form.Group>
                  <Form.Group className="search-field">
                    <label className="form-label form-label-required form-label-lg">
                      Password
                    </label>
                    <div className="form-control-icon">
                      <input
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={adminData.password}
                        onChange={(e) =>
                          setAdminData({ ...adminData, password: e.target.value })
                        }
                        placeholder="Enter your password"
                        required
                      />

                      {showPassword ? (
                        <Eye onClick={() => setShowPassword(false)} />
                      ) : (
                        <EyeSlash onClick={() => setShowPassword(true)} />
                        )}
                        {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>
                  </Form.Group>
                  <div className="mt-5">
                    <button
                        type="submit"
                      disabled={loading}
                      className="w-100 btn_primary"
                    >
                        {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                    </button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Login;
