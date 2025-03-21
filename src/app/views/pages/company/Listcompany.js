import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Funnel, PencilSimple } from "@phosphor-icons/react";
import axios from "axios";
import { toast } from "react-toastify";

const Company = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const paginationPerPage = 10;

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://147.93.20.105:5000/api/company/list/v1`);
      if (response.data.success) {
        setCompanies(response.data.data);
      } else {
        toast.error("Failed to fetch companies");
      }
    } catch (error) {
      toast.error("Failed to fetch companies");
      console.error("Error fetching companies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      name: "Company Code",
      selector: (row) => row.company_code,
      sortable: true,
    },
    {
      name: "Customer Type",
      selector: (row) => row.customer_type,
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.company_name,
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
      name: "Owner Name",
      selector: (row) => row.owner_name,
      sortable: true,
    },
    {
      name: "Owner Mobile",
      selector: (row) => row.owner_mob,
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

  const filteredData = companies.filter((item) => {
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

  const exportCompaniesToCsv = () => {
    const csvData = companies.map(company => ({
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
    a.download = 'companies.csv';
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
                          <h6 className="card-title">Company List</h6>
                          <button
                            className="btn btn-primary"
                            onClick={() => navigate('/company/add')}
                          >
                            Add Company
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
                                placeholder="Search by name, company code or owner"
                                value={searchText}
                                onChange={(e) => handleSearch(e.target.value)}
                              />
                            </div>
                          </Col>
                          <Col md={4} className="d-flex align-items-end">
                            <button
                              className="btn_primary_outline_sm ms-auto"
                              onClick={exportCompaniesToCsv}
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

export default Company;
