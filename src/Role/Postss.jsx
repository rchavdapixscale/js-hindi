import { useState, useEffect } from "react";
import { getRoles, deleteRole } from "../api/PostsApi";
import RoleForm from "./RoleForm";
// import Button from "../BtnComponents/btn";
import Pagination from "../PageNation/PageNation";
import Table from "../TableComponents/Table";
import "./Postss.css"
// import {  Form } from "react-router-dom";

export const Postss = () => {
  const [data, setData] = useState([]);
  const [updateRoleApi, setupdateRoleApi] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  const roleColumns = [{ header: "Name", accessor: "name" }];

  const getRoleData = async () => {
    const res = await getRoles();
    console.log("res.data", res.data);

    const rows =
      res.data?.rows || res.data?.data.rows || res.data?.result?.rows || [];

    if (rows.length) {
      setData(rows);
    } else {
      console.error("Rows not found in response structure:", res.data);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteRole(id);
        alert("Deleted successfully!");
        getRoleData();
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Failed to delete the record");
      }
    }
  };

  const offset = currentPage * rowsPerPage;
  const currentData = data.slice(offset, offset + rowsPerPage);
  const pageCount = Math.ceil(data.length / rowsPerPage);

  useEffect(() => {
    getRoleData();
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <>
      <div className="section-form">
        <RoleForm
          data={currentData}
          setData={setData}
          updateRoleApi={updateRoleApi}
          setUpdateRoleApi={setupdateRoleApi}
          refreshData={getRoleData}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Table
        columns={roleColumns}
        data={currentData}
        onEdit={setupdateRoleApi}
        onDelete={handleDelete}
      />
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </>
  );
};

export default Postss;
