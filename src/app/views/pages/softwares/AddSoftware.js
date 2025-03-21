import React, { useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const AddSoftware = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [softwareData, setSoftwareData] = useState({
        software_code: "",
        software_type: "",
        status: "Demo",
        register_status: false,
        start_date: "",
        end_date: "",
        rate: "",
        rate_in: "",
        y_rate: "",
        application: false,
        db_server_name: "",
        data_path: "",
        db_name: "",
        db_username: "",
        db_password: "",
        store: false,
        store_server_name: "",
        store_data_path: "",
        store_db_name: "",
        store_db_username: "",
        store_db_password: "",
        data_password: "",
        running_status: "Running",
        temp_code: "",
        software_open_today: true,
        company_id: id
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSoftwareData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/register/software/v1", softwareData);
            if (response.data.success) {
                toast.success("Software added successfully");
            }
        } catch (error) {
            toast.error("Failed to add software");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Add Software Details</h4>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Software Code</Form.Label>
                                <Form.Control type="text" name="software_code" onChange={handleInputChange} />
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
                                <Form.Label>Status</Form.Label>
                                <Form.Select name="status" onChange={handleInputChange}>
                                    <option value="Demo">Demo</option>
                                    <option value="Full">Full</option>
                                    <option value="View">View</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control type="date" name="start_date" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control type="date" name="end_date" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Rate</Form.Label>
                                <Form.Control type="number" name="rate" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Rate In</Form.Label>
                                <Form.Control type="date" name="rate_in" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Yearly Rate</Form.Label>
                                <Form.Control type="number" name="y_rate" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Check type="checkbox" label="Registration Status" name="register_status" checked={softwareData.register_status} onChange={handleInputChange} />
                        </Col>
                        <Col md={4}>
                            <Form.Check type="checkbox" label="Application" name="application" checked={softwareData.application} onChange={handleInputChange} />
                        </Col>
                        <Col md={4}>
                            <Form.Check type="checkbox" label="Store" name="store" checked={softwareData.store} onChange={handleInputChange} />
                        </Col>
                    </Row>

                    {softwareData.application && (
                        <>
                            <h5 className="mt-3">Application Details</h5>
                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>DB Server Name</Form.Label>
                                        <Form.Control type="text" name="db_server_name" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>DB Name</Form.Label>
                                        <Form.Control type="text" name="db_name" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Data Path</Form.Label>
                                        <Form.Control type="text" name="data_path" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                            <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>DB User Name</Form.Label>
                                        <Form.Control type="text" name="db_username" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>DB Password</Form.Label>
                                        <Form.Control type="text" name="db_password" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </>
                    )}

                    {softwareData.store && (
                        <>
                            <h5 className="mt-3">Store Details</h5>
                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Store Server Name</Form.Label>
                                        <Form.Control type="text" name="store_server_name" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Store Data path</Form.Label>
                                        <Form.Control type="text" name="store_data_path" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Store DB Name</Form.Label>
                                        <Form.Control type="text" name="store_db_name" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                            <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Store Username Name</Form.Label>
                                        <Form.Control type="text" name="store_db_username" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Store Password</Form.Label>
                                        <Form.Control type="text" name="store_db_password" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </>
                    )}

                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Data Password</Form.Label>
                                <Form.Control type="password" name="data_password" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                        <Form.Group className="mb-3">
                                <Form.Label>Running Status</Form.Label>
                                <Form.Select name="running_status" onChange={handleInputChange}>
                                    <option value="for Close">For Close</option>
                                    <option value="Running">Running</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Temporary Code</Form.Label>
                                <Form.Control type="text" name="temp_code" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="mt-4">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : "Add Software"}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddSoftware;