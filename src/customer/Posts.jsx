import { useState, useEffect } from "react";
import { getData, deleteData } from "../api/PostApi";
import "../APP.CSS";
import { Form } from "./Form";
import ReactPaginate from "react-paginate";

export const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});
  const [currentPage, setCurrentPage] = useState(0); 
  const rowsPerPage = 5; 


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
      <table border="1" style={{ marginTop: "90px", width: "100%" }}>
        <thead>
          <tr style={{background: "#fff",fontSize:"25px", letterSpacing:"2px", backgroundColor:"#d6c7c7"}}>
            <th style={{padding:"15px 15px", }}>User ID</th>
            <th>Phone Number</th>
            <th>Dob</th>
            <th>Gender</th>
            <th>Name</th>
            <th>Company Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData &&
            currentData.map((item, index) => (
              <tr key={item.id || index} className="page-row" style={{backgroundColor:"#d6c7c7"}}>
                <td>{item.userID ?? "N/A"}</td>
                <td>{item.phoneNumber ?? "N/A"}</td>
                <td>{item.dob ?? "N/A"}</td>
                <td>{item.gender ?? "N/A"}</td>
                <td>{item.name ?? "N/A"}</td>
                <td>{item.companyID ?? "N/A"}</td>
                <td>
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={() => setUpdateDataApi(item)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Delete
                  </button>
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
