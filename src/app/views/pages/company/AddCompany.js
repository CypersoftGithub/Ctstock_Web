import React, { useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddCompany = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [companyData, setCompanyData] = useState({
        company_code: "",
        customer_type: "Manufacturing", // Default value
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
        PAN_NO: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompanyData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://147.93.20.105:5000/api/register/company/v1", companyData);
            if (response.data.success) {
                toast.success("Company added successfully");
                navigate("/company");
            }
        } catch (error) {
            toast.error("Failed to add company");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Add Company Details</h4>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Company Code</Form.Label>
                                <Form.Control type="text" name="company_code" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Customer Type</Form.Label>
                                <Form.Select name="customer_type" onChange={handleInputChange}>
                                    <option value="Manufacturing">Manufacturing</option>
                                    <option value="Trading">Trading</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control type="text" name="company_name" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email ID</Form.Label>
                                <Form.Control type="email" name="email_id" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" name="city" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" name="state" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Owner Name</Form.Label>
                                <Form.Control type="text" name="owner_name" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Owner Mobile</Form.Label>
                                <Form.Control type="text" name="owner_mob" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Optional Mobile 1</Form.Label>
                                <Form.Control type="text" name="op_mob1" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Optional Mobile 2</Form.Label>
                                <Form.Control type="text" name="op_mob2" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Website</Form.Label>
                                <Form.Control type="text" name="web_site" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>GST Number</Form.Label>
                                <Form.Control type="text" name="GST_NO" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>PAN Number</Form.Label>
                                <Form.Control type="text" name="PAN_NO" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="mt-4">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : "Add Company"}
                        </button>
                        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/company")}>
                            Cancel
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddCompany;