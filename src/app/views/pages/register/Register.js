import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Funnel, PencilSimple } from "@phosphor-icons/react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [registerData, setRegisterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const paginationPerPage = 10;

  useEffect(() => {
    fetchRegisterDetails();
  }, []);

  const fetchRegisterDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://147.93.20.105:5000/api/company/list/v1`);
      if (response.data.success) {
        setRegisterData(response.data.data);
      } else {
        toast.error("Failed to fetch register details");
      }
    } catch (error) {
      toast.error("Failed to fetch register details");
      console.error("Error fetching register details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      name: "Software Code",
      selector: (row) => row.company_code,
      sortable: true,
    },
    {
      name: "Software Type",
      selector: (row) => row.customer_type,
      sortable: true,
    },
    {
      name: "Register Status",
      selector: (row) => row.company_name,
      sortable: true,
    },
    {
      name: "Rate",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="btn btn-link p-0"
          onClick={() => navigate(`/company/${row.__id}`)}
        >
          <PencilSimple size={20} />
        </button>
      ),
    },
  ];

  const filteredData = registerData.filter((item) => {
    return (
      item.customer_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.company_code?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.owner_name?.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const handleSearch = (value) => {
    setSearchText(value);
    setResetPaginationToggle(!resetPaginationToggle);
  };

  const exportRegisterToCsv = () => {
    const csvData = registerData.map(company => ({
      Company_Code: company.company_code,
      Customer_Type: company.customer_type,
      Customer_Name: company.customer_name,
      City: company.city,
      State: company.state,
      Owner_Name: company.owner_name,
      Owner_Mobile: company.owner_mob
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
    a.download = 'registerData.csv';
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
                          <h6 className="card-title">Register List</h6>
                          <button
                            className="btn btn-primary"
                            onClick={() => navigate('/register/add')}
                          >
                            Add Register
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
                                placeholder="Search by name, register code"
                                value={searchText}
                                onChange={(e) => handleSearch(e.target.value)}
                              />
                            </div>
                          </Col>
                          <Col md={4} className="d-flex align-items-end">
                            <button
                              className="btn_primary_outline_sm ms-auto"
                              onClick={exportRegisterToCsv}
                            >
                              Export CSV
                            </button>
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

export default Register;
