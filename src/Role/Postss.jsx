import { useState, useEffect } from "react";
import { getRoles, deleteRole } from "../api/PostsApi";
import "../APP.CSS";
import RoleForm from "./RoleForm"; 
import ReactPaginate from "react-paginate";
// import {  Form } from "react-router-dom";

export const Postss = () => {
  const [data, setData] = useState([]);
  const [updateRoleApi, setupdateRoleApi] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  

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
      <table>
        <thead>
          <tr style={{background:"grey"}}>
            <th style={{padding:"20px 30px", fontSize:"25px", fontWeight:"700"}}>Name</th>
            <th style={{padding:"20px 30px", fontSize:"25px", fontWeight:"700"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData &&
            currentData.map((item, index) => (
              
              <tr key={item.id }>
                <td style={{border:"1px solid black", background:"white", textAlign:"center", fontSize:"20px", fontFamily:"sans-serif", padding:"15px 35px"}}>{item.name || index}</td>
                <td style={{background:"white"}}>
                  <button onClick={() => setupdateRoleApi(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </>
  );
};

export default Postss;

