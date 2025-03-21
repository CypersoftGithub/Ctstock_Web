import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Funnel, PencilSimple } from "@phosphor-icons/react";
import axios from "axios";
import { toast } from "react-toastify";


const Users = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const paginationPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://147.93.20.105:5000/api/auth/users/list/${localStorage.getItem('__id')}/v1`);
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      name: "Reference ID",
      selector: (row) => row.Reference_id,
      sortable: true,
    },
    {
      name: "Person Name",
      selector: (row) => row.Person_name,
      sortable: true,
    },
    {
      name: "Firm Name",
      selector: (row) => row.FirmName,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.Role,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Looking For",
      selector: (row) => row.looking_for,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="btn btn-link p-0"
          onClick={() => navigate(`/user/${row.__id}`)}
        >
          <PencilSimple size={20} />
        </button>
      ),
    }
  ];

  const filteredData = users.filter((item) => {
    return (
      item.Person_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.FirmName?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.Reference_id?.toLowerCase().includes(searchText.toLowerCase())
    );
  });


  const handleSearch = (value) => {
    setSearchText(value);
    setResetPaginationToggle(!resetPaginationToggle);
  };




  const exportUsersToCsv = () => {
    const csvData = users.map(user => ({
      Reference_ID: user.Reference_id,
      Person_Name: user.Person_name,
      Firm_Name: user.FirmName,
      Role: user.Role,
      City: user.city,
      State: user.state,
      Type: user.type,
      Looking_For: user.looking_for,
      Mobile_1: user.Mob_1,
      Mobile_2: user.Mob_2,
      Mobile_3: user.Mob_3,
      Mobile_4: user.Mob_4,
      First_Login: user.first_login,
      Active_Status: user.active_status ? "Yes" : "No",
      OTP_Verified: user.otp_verified ? "Yes" : "No"
    }));

    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };


  return (
    <>
      {isLoading ? (
        <div className="w-100 d-flex">
            <div className="spinner-border text-primary mx-auto" role="status"></div>
        </div>
      ) : (
        <>
            <div>
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                <DataTable
                  title={
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title">Users List</h6>
                    <button
                    className="btn btn-primary"
                    onClick={() => navigate('/user/add')}
                    >
                    Add User
                    </button>
                  </div>
                  }
                  columns={columns}
                  data={filteredData}
                  pagination
                  paginationPerPage={paginationPerPage}
                  highlightOnHover
                  pointerOnHover
                  subHeader
                  subHeaderAlign="left"
                  subHeaderComponent={
                  <Row className="mb-3 w-100">
                    <Col md={8} className="d-flex align-items-start flex-column gap-2">
                    <span className="d-flex align-items-center gap-2 me-3 filterby_label">
                      <Funnel />
                      Filter By :
                    </span>
                    <div className="table_filter">
                      <input
                      type="text"
                      className="form-control"
                      placeholder="Search by name, firm or reference ID"
                      value={searchText}
                      onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                    </Col>
                    <Col md={4} className="d-flex align-items-end">
                    {/* <button
                      className="btn_primary_outline_sm ms-auto"
                      onClick={exportUsersToCsv}
                    >
                      Export CSV
                    </button> */}
                    </Col>
                  </Row>
                  }
                />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}


    </>
  );
};

export default Users;
