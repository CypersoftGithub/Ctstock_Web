import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { PencilSimple } from "@phosphor-icons/react";

const CompanyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState({
    __id: "",
    company_code: "",
    customer_type: "",
    company_name: "",
    email_id: "",
    city: "",
    state: "",
    owner_name: "",
    owner_mob: "",
    op_mob1: "",
    op_mob2: "",
    web_site: "",
    address: "",
    GST_NO: "",
    PAN_NO: "",
    softwares: []
  });

  useEffect(() => {
    fetchCompanyData();
  }, [id]);

  const fetchCompanyData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://147.93.20.105:5000/api/company/${id}/v1`);
      if (response.data.success) {
        setCompanyData(response.data.data[0]);
      } else {
        toast.error("Failed to fetch company details");
        navigate("/companies");
      }
    } catch (error) {
      toast.error("Failed to fetch company details");
      navigate("/companies");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
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
            <h4 className="card-title">Company Details</h4>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/software/add/${companyData.__id}`)}
              >
              Add User
            </button>
            <Form>
              <Row>
                <Col md={4}><Form.Group><Form.Label>Company Code</Form.Label><Form.Control type="text" name="company_code" value={companyData.company_code} disabled /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Customer Type</Form.Label><Form.Control type="text" name="customer_type" value={companyData.customer_type} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Company Name</Form.Label><Form.Control type="text" name="company_name" value={companyData.company_name} onChange={handleInputChange} /></Form.Group></Col>
              </Row>
              <Row>
                <Col md={4}><Form.Group><Form.Label>Email</Form.Label><Form.Control type="email" name="email_id" value={companyData.email_id} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>City</Form.Label><Form.Control type="text" name="city" value={companyData.city} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>State</Form.Label><Form.Control type="text" name="state" value={companyData.state} onChange={handleInputChange} /></Form.Group></Col>
              </Row>
              <Row>
                <Col md={4}><Form.Group><Form.Label>Owner Name</Form.Label><Form.Control type="text" name="owner_name" value={companyData.owner_name} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Owner Mobile</Form.Label><Form.Control type="text" name="owner_mob" value={companyData.owner_mob} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Website</Form.Label><Form.Control type="text" name="web_site" value={companyData.web_site} onChange={handleInputChange} /></Form.Group></Col>
              </Row>
              <Row>
                <Col md={6}><Form.Group><Form.Label>GST Number</Form.Label><Form.Control type="text" name="GST_NO" value={companyData.GST_NO} onChange={handleInputChange} /></Form.Group></Col>
                <Col md={6}><Form.Group><Form.Label>PAN Number</Form.Label><Form.Control type="text" name="PAN_NO" value={companyData.PAN_NO} onChange={handleInputChange} /></Form.Group></Col>
              </Row>
              <h5 className="mt-4">Software Details</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Software Code</th>
                    <th>Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Running Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companyData.softwares.map((software, index) => (
                    <tr key={index}>
                      <td>{software.software_code}</td>
                      <td>{software.software_type}</td>
                      <td>{software.start_date}</td>
                      <td>{software.end_date}</td>
                      <td>{software.running_status}</td>
                      <td>
                        <button
                            className="btn btn-link p-0"
                            onClick={() => navigate(`/software/${software.__id}`)}
                            >
                            <PencilSimple size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
              <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={() => navigate("/company")}>Cancel</button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyDetail;