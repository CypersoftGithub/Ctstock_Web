import React, { useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import axios from "axios";
import { toast } from "react-toastify";

const AddUser = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [passwordVisibility, setPasswordVisibility] = useState({
		password_1: false,
		password_2: false,
		password_3: false,
		password_4: false
	});
	const [userData, setUserData] = useState({
		role: "",
		reference_id: "", 
		firmname: "",
		person_name: "", 
		city: "",
		state: "",
		type: "",
		looking_for: "Yes",
		mob_1: "",
		password_1: "",
		mob_2: "",
		password_2: "",
		mob_3: "",
		password_3: "",
		mob_4: "",
		password_4: "",
		active_status: true,
		software_id: localStorage.getItem("__id") || ""
	});

	const togglePasswordVisibility = (passwordField) => {
		setPasswordVisibility(prev => ({
			...prev,
			[passwordField]: !prev[passwordField]
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post(
				`http://147.93.20.105:5000/api/auth/user/role/v1`,
				userData
			);
			if (response.data.success) {
				toast.success("User created successfully");
				navigate("/user");
			}
		} catch (error) {
			toast.error("Failed to create user");
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
			<h4 className="card-title">Add User Details</h4>
			<Form onSubmit={handleSubmit}>
				<Row>
				<Col md={4}>
					<Form.Group className="mb-3">
					<Form.Label>Reference ID</Form.Label>
					<Form.Control
						type="text"
						name="reference_id"
						onChange={handleInputChange}
					/>
					</Form.Group>
				</Col>
				<Col md={4}>
					<Form.Group className="mb-3">
					<Form.Label>Role</Form.Label>
					<Form.Select
					name="role"
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
						name="person_name"
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
						name="firmname"
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
						onChange={handleInputChange}
					/>
					</Form.Group>
				</Col>
				<Col md={6}>
					<Form.Group className="mb-3">
					<Form.Label>Looking For</Form.Label>
					<Form.Select
						name="looking_for"
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
						name={`mob_${num}`}
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
				</Row>

				<div className="mt-4">
				<button type="submit" className="btn btn-primary" disabled={loading}>
					{loading ? <Spinner animation="border" size="sm" /> : "Add User"}
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

export default AddUser;