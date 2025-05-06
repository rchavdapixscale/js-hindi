import { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";

export const Form = ({ data, setData, updateDataApi, refreshData }) => {
  const [addData, setAddData] = useState({
    name: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    userID: 2,
    companyID: 1,
  });

  const [loading, setLoading] = useState(false);
  const [setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  let isEmpty = Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    if (updateDataApi) {
      setAddData({
        userID: updateDataApi.userID || 2,
        phoneNumber: updateDataApi.phoneNumber || "",
        dob: updateDataApi.dob ? updateDataApi.dob.substring(0, 10) : "",
        gender: updateDataApi.gender || "",
        name: updateDataApi.name || "",
        companyID: updateDataApi.companyID || 1,
      });
    }
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "phoneNumber" && !/^\d*$/.test(value)) {
      return;
    }

    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPostData = async () => {
    if (!addData.name.trim() || !addData.phoneNumber.trim()) {
      alert("Please fill out the required fields: Name and Phone Number.");
      return;
    }
    setLoading(true);
    try {
      const res = await postData({
        ...addData,
        userID: Number(addData.userID),
        companyID: Number(addData.companyID),
      });
      if (res.status === 201) {
        // setData([...data, res.data]);
        setCurrentPage(totalPages);
        refreshData();
        setAddData({
          userID: 0,
          phoneNumber: "",
          dob: "",
          gender: "",
          name: "",
          companyID: 0,
        });
      }
    } catch (error) {
      console.error("Error while adding data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data.length === 0) {
      const blankRows = Array.from({ length: 1 }, () => ({
        userID: "",
        phoneNumber: "",
        dob: "",
        gender: "",
        name: "",
        companyID: "",
      }));
      setData(blankRows);
    }
  }, [data, setData]);

  const updatePostData = async () => {
    try {
      setLoading(true);
      const res = await updateData(updateDataApi.id, addData);
      console.log(res);
      if (res.status === 200) {
        setData((prev) =>
          prev.map((curElem) =>
            curElem.id === updateDataApi.id ? res.data : curElem
          )
        );
        refreshData();
      }
    } catch ({ error }) {
      console.log("Error while updating data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (updateDataApi && updateDataApi.id) {
      updatePostData();
    } else {
      addPostData();
    }
  };

  useEffect(() => {
    if (updateDataApi && Object.keys(updateDataApi).length !== 0) {
      setAddData({
        userID: updateDataApi.userID || 2,
        companyID: updateDataApi.companyID || 1,
        name: updateDataApi.name || "",
        phoneNumber: updateDataApi.phoneNumber || "",
        gender: updateDataApi.gender || "",
        dob: updateDataApi.dob ? updateDataApi.dob.substring(0, 10) : "",
      });
    }
  }, [updateDataApi]);

  return (
    <>
      <label
        htmlFor="roleName"
        style={{
          fontSize: "32px",
          paddingLeft: "29px",
          marginBottom: "40px",
          fontWeight: "600",
          lineHeight: "100%",
        }}
      >
        User Details Add or Edit 
      </label>
      <form className="flex-container" onSubmit={handleFormSubmit}>
        <div className="input-field">
          <div
            className="form-group"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "",
            }}
          >
            <label
              htmlFor="roleName"
              style={{
                fontWeight: "600",
                marginBottom: "6px",
                color: "#333",
                fontSize: "18px",
              }}
            >
              User Id<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="userID"
              placeholder="User ID"
              value={addData.userID}
              onChange={handleInputChange}
              autoComplete="username"
            />
          </div>
          <div
            className="form-group"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "",
            }}
          >
            <label
              htmlFor="roleName"
              style={{
                fontWeight: "600",
                marginBottom: "6px",
                color: "#333",
                fontSize: "18px",
              }}
            >
              Phone Number<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={addData.phoneNumber}
              onChange={handleInputChange}
              autoComplete="tel"
              pattern="^\d{10}$"
              maxLength="10"
              title="Phone number must be exactly 10 digits"
              required
            />
          </div>
          <div
            className="form-group"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "",
            }}
          >
            <label
              htmlFor="roleName"
              style={{
                fontWeight: "600",
                marginBottom: "6px",
                color: "#333",
                fontSize: "18px",
              }}
            >
              Dob<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={addData.dob}
              onChange={handleInputChange}
              max={new Date().toISOString().split("T")[0]}
              showYearDropdown
              scrollableYearDropdown
              required
            />
          </div>
          <div
            className="form-group"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "",
            }}
          >
            <label
              htmlFor="roleName"
              style={{
                fontWeight: "600",
                marginBottom: "6px",
                color: "#333",
                fontSize: "18px",
              }}
            >
              Gender<span style={{ color: "red" }}>*</span>
            </label>
            <select
              style={{ width: "326px", height: "42px" }}
              name="gender"
              value={addData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div
            className="form-group"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "",
            }}
          >
            <label
              htmlFor="roleName"
              style={{
                fontWeight: "600",
                marginBottom: "6px",
                color: "#333",
                fontSize: "18px",
              }}
            >
              Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={addData.name}
              onChange={handleInputChange}
              autoComplete="name"
            />
          </div>
          <div
            className="form-group"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "",
            }}
          >
            <label
              htmlFor="roleName"
              style={{
                fontWeight: "600",
                marginBottom: "6px",
                color: "#333",
                fontSize: "18px",
              }}
            >
              Company Id<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="companyID"
              placeholder="Company ID"
              value={addData.companyID}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
        </div>
        {loading && <div className="loaderp"></div>}
        <button
          style={{ background: "grey" }}
          type="submit"
          value={isEmpty ? "Add" : "Edit"}
        >
          {isEmpty ? "Add" : "Edit"}
        </button>
      </form>
    </>
  );
};
