import { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";
import Button from "../BtnComponents/btn";
import InputField from "../InputField/Input"; 

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
          marginBottom: "40px",
          fontWeight: "600",
          lineHeight: "100%",
        }}
      >
        User Details Add or Edit
      </label>
      <form className="flex-container" onSubmit={handleFormSubmit}>
        <div
          className="input-field"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop:"30px"
          }}
        >
          <InputField
            label="User Id"
            name="userID"
            type="text"
            value={addData.userID}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={addData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Dob"
            name="dob"
            type="date"
            value={addData.dob}
            onChange={handleInputChange}
            max={new Date().toISOString().split("T")[0]}
            required
          />

          <InputField
            label="Gender"
            name="gender"
            type="select"
            value={addData.gender}
            onChange={handleInputChange}
            options={["Male", "Female"]}
            required
          />
          <InputField
            label="Name"
            name="name"
            type="text"
            value={addData.name}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Company Id"
            name="companyID"
            type="text"
            value={addData.companyID}
            onChange={handleInputChange}
            required
          />
        </div>
        {loading && <div className="loaderp"></div>}
        <Button label={isEmpty ? "Add" : "Edit"} type="submit" />
      </form>
    </>
  );
};
