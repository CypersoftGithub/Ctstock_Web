import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { PencilSimple } from "@phosphor-icons/react";

const SoftwareDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [softwareData, setSoftwareData] = useState({
    __id: "",
    software_code: "",
    software_type: "",
    register_status: false,
    start_date: "",
    end_date: "",
    rate: 0,
    rate_in: "",
    y_rate: 0,
    application: false,
    store: false,
    data_password: "",
    running_status: "",
    temp_code: "",
    software_open_today: false,
    company_id: "",
    company_name: "",
    software_instance_id: "",
    software_instance_software_code: "",
    software_instance_server_name: "",
    sofwtare_instatnce_data_path: "",
    sofwtare_instance_db_name: "",
    sofwtare_instance_db_username: "",
    software_instance_db_password: "",
    software_instance_code: "",
    store_instance_id: "",
    store_instance_software_code: "",
    store_instance_server_name: "",
    store_instance_data_path: "",
    store_instance_db_name: "",
    store_instance_db_usernam: "",
    store_instance_db_password: "",
    store_instance_code: ""
  });

  const [userData, setUserData] = useState({
    status: 0,
    success: false,
    count: 0,
    data: [],
  }); 

  useEffect(() => {
    fetchSoftwareData();
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    setLoading(true);
    try{
        const response = await axios.get(`http://147.93.20.105:5000/api/auth/users/list/${id}/v1`);
        if (response.data.success) {
            setUserData(response.data);
          } else {
            toast.error("Failed to fetch User details");
            navigate("/software");
          }
    } catch (error) {
        toast.error("Failed to fetch User details");
        navigate("/software");
    } finally {
        setLoading(false);
    }
  }
  const fetchSoftwareData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://147.93.20.105:5000/api/software/${id}/v1`);
      if (response.data.success) {
        setSoftwareData(response.data.data[0]);
      } else {
        toast.error("Failed to fetch software details");
        navigate("/software");
      }
    } catch (error) {
      toast.error("Failed to fetch software details");
      navigate("/software");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSoftwareData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSoftwareData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
    <>
      {loading ? (
        <div className="w-100 d-flex">
          <Spinner animation="border" className="mx-auto" />
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Software Details</h4>
            <Form>
              <Row>
                <Col md={4}><Form.Group><Form.Label>Software Code</Form.Label><Form.Control type="text" name="software_code" value={softwareData.software_code} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Software Type</Form.Label><Form.Control type="text" name="software_type" value={softwareData.software_type} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Register Status</Form.Label><Form.Check type="checkbox" name="register_status" checked={softwareData.register_status} onChange={handleCheckboxChange} /></Form.Group></Col>
              </Row>
              <Row>
                <Col md={4}><Form.Group><Form.Label>Start Date</Form.Label><Form.Control type="date" name="start_date" value={softwareData.start_date} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>End Date</Form.Label><Form.Control type="date" name="end_date" value={softwareData.end_date} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Rate</Form.Label><Form.Control type="number" name="rate" value={softwareData.rate} onChange={handleInputChange} /></Form.Group></Col>
              </Row>
              <Row>
                <Col md={4}><Form.Group><Form.Label>Rate In</Form.Label><Form.Control type="date" name="rate_in" value={softwareData.rate_in} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Yearly Rate</Form.Label><Form.Control type="number" name="y_rate" value={softwareData.y_rate} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Application</Form.Label><Form.Check type="checkbox" name="application" checked={softwareData.application} onChange={handleCheckboxChange} /></Form.Group></Col>
              </Row>
              <Row>
                <Col md={4}><Form.Group><Form.Label>Store</Form.Label><Form.Check type="checkbox" name="store" checked={softwareData.store} onChange={handleCheckboxChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Data Password</Form.Label><Form.Control type="password" name="data_password" value={softwareData.data_password} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Running Status</Form.Label><Form.Control type="text" name="running_status" value={softwareData.running_status} onChange={handleInputChange} /></Form.Group></Col>
              </Row>
              <Row>
                <Col md={4}><Form.Group><Form.Label>Temp Code</Form.Label><Form.Control type="text" name="temp_code" value={softwareData.temp_code} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Software Open Today</Form.Label><Form.Check type="checkbox" name="software_open_today" checked={softwareData.software_open_today} onChange={handleCheckboxChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Company Name</Form.Label><Form.Control type="text" name="company_name" value={softwareData.company_name} onChange={handleInputChange} /></Form.Group></Col>
              </Row>
              <h5 className="mt-4">Software Instance Details</h5>
              <Row>
                <Col md={4}><Form.Group><Form.Label>Software Instance ID</Form.Label><Form.Control type="text" name="software_instance_id" value={softwareData.software_instance_id} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Software Instance Code</Form.Label><Form.Control type="text" name="software_instance_code" value={softwareData.software_instance_code} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Server Name</Form.Label><Form.Control type="text" name="software_instance_server_name" value={softwareData.software_instance_server_name} onChange={handleInputChange} /></Form.Group></Col>
              </Row>
              <Row>
                <Col md={4}><Form.Group><Form.Label>Data Path</Form.Label><Form.Control type="text" name="sofwtare_instatnce_data_path" value={softwareData.sofwtare_instatnce_data_path} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>DB Name</Form.Label><Form.Control type="text" name="sofwtare_instance_db_name" value={softwareData.sofwtare_instance_db_name} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>DB Username</Form.Label><Form.Control type="text" name="sofwtare_instance_db_username" value={softwareData.sofwtare_instance_db_username} onChange={handleInputChange} /></Form.Group></Col>
              </Row>
              <Row>
                <Col md={4}><Form.Group><Form.Label>DB Password</Form.Label><Form.Control type="password" name="software_instance_db_password" value={softwareData.software_instance_db_password} onChange={handleInputChange} /></Form.Group></Col>
              </Row>
              <h5 className="mt-4">Store Instance Details</h5>
              <Row>
                <Col md={4}><Form.Group><Form.Label>Store Instance ID</Form.Label><Form.Control type="text" name="store_instance_id" value={softwareData.store_instance_id || ""} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Store Instance Code</Form.Label><Form.Control type="text" name="store_instance_code" value={softwareData.store_instance_code || ""} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Server Name</Form.Label><Form.Control type="text" name="store_instance_server_name" value={softwareData.store_instance_server_name || ""} onChange={handleInputChange} /></Form.Group></Col>
              </Row>
              <Row>
                <Col md={4}><Form.Group><Form.Label>Data Path</Form.Label><Form.Control type="text" name="store_instance_data_path" value={softwareData.store_instance_data_path || ""} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>DB Name</Form.Label><Form.Control type="text" name="store_instance_db_name" value={softwareData.store_instance_db_name || ""} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>DB Username</Form.Label><Form.Control type="text" name="store_instance_db_usernam" value={softwareData.store_instance_db_usernam || ""} onChange={handleInputChange} /></Form.Group></Col>
              </Row>
              <Row>
                <Col md={4}><Form.Group><Form.Label>DB Password</Form.Label><Form.Control type="password" name="store_instance_db_password" value={softwareData.store_instance_db_password || ""} onChange={handleInputChange} /></Form.Group></Col>
              </Row>
              <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
              <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={() => navigate("/software")}>Cancel</button>
            </Form>
            <h5 className="mt-4">User Details</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Reference ID</th>
                    <th>Firm Name</th>
                    <th>Person Name</th>
                    <th>Active Status</th>
                    <th>First Login</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.data.map((user, index) => (
                    <tr key={index}>
                      <td>{user.Role}</td>
                      <td>{user.Reference_id}</td>
                      <td>{user.FirmName}</td>
                      <td>{user.Person_name}</td>
                      <td>{user.active_status ? "Active" : "Inactive"}</td>
                      <td>{user.first_login}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default SoftwareDetail;