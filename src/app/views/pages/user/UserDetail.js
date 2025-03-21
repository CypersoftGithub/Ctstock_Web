import React, { useEffect, useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import axios from "axios";
import { toast } from "react-toastify";

const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    password_1: false,
    password_2: false,
    password_3: false,
    password_4: false
  });

  const togglePasswordVisibility = (passwordField) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [passwordField]: !prev[passwordField]
    }));
  };

  const [userData, setUserData] = useState({
    __id: "",
    Role: "",
    Reference_id: "",
    FirmName: "",
    Person_name: "",
    city: "",
    state: "",
    type: "",
    looking_for: "",
    Mob_1: "",
    password_1: "",
    Mob_2: "",
    password_2: "",
    Mob_3: "",
    password_3: "",
    Mob_4: "",
    password_4: "",
    active_status: false,
    first_login: "",
    otp_verified: false
  });

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://147.93.20.105:5000/api/auth/user/${id}/v1`);
      if (response.data.success) {
        // Since the API returns an array with one item, we take the first item
        setUserData(response.data.data[0]);
      } else {
        toast.error("Failed to fetch user details");
        navigate("/users");
      }
    } catch (error) {
      toast.error("Failed to fetch user details");
      navigate("/users");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Transform the userData to match API request format
      const requestData = {
        role: userData.Role,
        reference_id: userData.Reference_id,
        firmname: userData.FirmName,
        person_name: userData.Person_name,
        city: userData.city,
        state: userData.state,
        type: userData.type,
        looking_for: userData.looking_for,
        mob_1: userData.Mob_1,
        password_1: userData.password_1,
        mob_2: userData.Mob_2,
        password_2: userData.password_2,
        mob_3: userData.Mob_3,
        password_3: userData.password_3,
        mob_4: userData.Mob_4,
        password_4: userData.password_4,
        active_status: userData.active_status
      };

      const response = await axios.put(
        `http://147.93.20.105:5000/api/auth/user/${id}/v1`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        toast.success("User details updated successfully");
        navigate("/user");
      } else {
        toast.error(response.data.message || "Failed to update user details");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update user details");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <>
      {loading ? (
        <div className="w-100 d-flex">
          <div className="spinner-border text-primary mx-auto" role="status"></div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">User Details</h4>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Reference ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="Reference_id"
                      value={userData.Reference_id}
                      onChange={handleInputChange}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="Role"
                    value={userData.Role}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="SE">SE</option>
                    <option value="REF">REF</option>
                    <option value="Customer">Customer</option>
                    <option value="New User">New User</option>
                    <option value="Factory">Factory</option>
                  </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Person Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="Person_name"
                      value={userData.Person_name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Firm Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="FirmName"
                      value={userData.FirmName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={userData.city}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={userData.state}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="type"
                      value={userData.type}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Looking For</Form.Label>
                    <Form.Select
                      name="looking_for"
                      value={userData.looking_for}
                      onChange={handleInputChange}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Mobile Numbers and Passwords */}
              {[1, 2, 3, 4].map((num) => (
                <Row key={num}>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile {num}</Form.Label>
                      <Form.Control
                        type="text"
                        name={`Mob_${num}`}
                        value={userData[`Mob_${num}`]}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password {num}</Form.Label>
                      <div className="position-relative">
                      <Form.Control
                        type={passwordVisibility[`password_${num}`] ? "text" : "password"}
                        name={`password_${num}`}
                        value={userData[`password_${num}`]}
                        onChange={handleInputChange}
                      />
                      <div 
                        className="position-absolute" 
                        style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                        onClick={() => togglePasswordVisibility(`password_${num}`)}
                      >
                        {passwordVisibility[`password_${num}`] ? (
                        <Eye size={20} />
                        ) : (
                        <EyeSlash size={20} />
                        )}
                      </div>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              ))}

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Active Status"
                      name="active_status"
                      checked={userData.active_status}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="OTP Verified"
                      name="otp_verified"
                      checked={userData.otp_verified}
                      onChange={handleInputChange}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Login</Form.Label>
                    <Form.Control
                      type="text"
                      value={new Date(userData.first_login).toLocaleString()}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>

                <div className="mt-4">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => navigate("/user")}
                >
                  Cancel
                </button>
                </div>
              </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetail;
