import React, { useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddRegister = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [registerData, setRegisterData] = useState({
        code_of_software: "",
        software_type: "", // Default value
        register_status: "",
        start_date: "",
        end_date: "",
        rate: "",
        rate_in_with_date: "",
        yearly_rate: "",
        application: "",
        store: "",
        data_password: "",
        status: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("registerData-------", registerData);

        // try {
        //     const response = await axios.post("http://147.93.20.105:5000/api/register123/company/v1", registerData);
        //     if (response.data.success) {
        //         toast.success("Register added successfully");
        //         navigate("/register");
        //     }
        // } catch (error) {
        //     toast.error("Failed to add company");
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Add Register Details</h4>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Software Code</Form.Label>
                                <Form.Control type="text" name="code_of_software" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Software Type</Form.Label>
                                <Form.Control type="text" name="software_type" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Register Status</Form.Label>
                                <Form.Select name="register_status" onChange={handleInputChange}>
                                    <option value="Demo">demo</option>
                                    <option value="View">view</option>
                                    <option value="Full">full</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="start_date"
                                    value={registerData.start_date}
                                    onChange={handleDateChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="end_date"
                                    value={registerData.end_date}
                                    onChange={handleDateChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Rate</Form.Label>
                                <Form.Control type="number" name="rate" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Rate(with Date)</Form.Label>
                                <Form.Control type="number" name="rate_in_with_date" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Yearly Rate</Form.Label>
                                <Form.Control type="number" name="yearly_rate" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Application</Form.Label>
                                <Form.Control type="radiobutton" name="application" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Store</Form.Label>
                                <Form.Control type="radiobutton" name="store" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="Password" name="data_password" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select name="register_status" onChange={handleInputChange}>
                                    <option value="for_close">For Close</option>
                                    <option value="Running">Running</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="mt-4">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : "Add Register"}
                        </button>
                        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/register")}>
                            Cancel
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddRegister;