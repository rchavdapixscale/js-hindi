import { useState, useEffect } from "react";
import { getData, deleteData } from "../api/PostApi";
import "../APP.CSS";
import { Form } from "./Form";
import Pagination from "../PageNation/PageNation";
import Table from "../TableComponents/Table";

export const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  const customerColumns = [
    { header: "User ID", accessor: "userID" },
    { header: "Phone Number", accessor: "phoneNumber" },
    { header: "Dob", accessor: "dob" },
    { header: "Gender", accessor: "gender" },
    { header: "Name", accessor: "name" },
    { header: "Company Id", accessor: "companyID" },
  ];

  const getPostData = async () => {
    const res = await getData();
    console.log("res.data:", res.data);

    const rows =
      res.data?.rows || res.data?.data?.rows || res.data?.result?.rows || [];

    if (rows.length) {
      setData(rows);
    } else {
      console.error("Rows not found in response structure:", res.data);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteData(id);
        alert("Deleted successfully!");
        getPostData();
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Failed to delete the record.");
      }
    }
  };

  const offset = currentPage * rowsPerPage;
  const currentData = data.slice(offset, offset + rowsPerPage);
  const pageCount = Math.ceil(data.length / rowsPerPage);

  useEffect(() => {
    getPostData();
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <>
      <section className="section-form">
        <Form
          data={currentData}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
          refreshData={getPostData}
        />
      </section>

      <Table
        columns={customerColumns}
        data={currentData}
        onEdit={setUpdateDataApi}
        onDelete={handleDelete}
      />

      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </>
  );
};
