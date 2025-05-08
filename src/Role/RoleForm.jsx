import { useEffect, useState } from "react";
import { addRole, updateRole } from "../api/PostsApi";
import Button from "../BtnComponents/btn";
import InputField from "../InputField/Input";

const RoleForm = ({
  data,
  setData,
  updateRoleApi,
  setUpdateRoleApi,
  refreshData,
}) => {
  const [addData, setAddData] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const [setCurrentPage] = useState(1);
  let isEmpty = !updateRoleApi || Object.keys(updateRoleApi).length === 0;

  useEffect(() => {
    if (updateRoleApi) {
      setAddData({
        name: updateRoleApi.name || "",
      });
    }
  }, [updateRoleApi]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPostData = async () => {
    if (!addData.name.trim()) {
      alert("Please fill out the required field: Name.");
      return;
    }

    setLoading(true);
    try {
      const res = await addRole({
        name: addData.name,
      });

      if (res.status === 201) {
        setData((prev) => [...prev, res.data]);
        setCurrentPage(setCurrentPage);
        refreshData();
        setAddData({
          name: "",
        });
      }
    } catch (error) {
      console.error(
        "Error while adding data:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const updatePostData = async () => {
    try {
      setLoading(true);
      const res = await updateRole(updateRoleApi.id, addData);
      console.log(res);
      if (res.status === 200) {
        setData((prev) =>
          prev.map((curElem) =>
            curElem.id === updateRoleApi.id ? res.data : curElem
          )
        );
        refreshData();
        setUpdateRoleApi({});
      }
    } catch ({ error }) {
      console.error(
        "Error while adding data:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
      setAddData({ name: "" });
      setUpdateRoleApi({});
    }
  };

  useEffect(() => {
    if (updateRoleApi && Object.keys(updateRoleApi).length !== 0) {
      setAddData({
        name: updateRoleApi.name || "",
      });
    }
  }, [updateRoleApi]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (updateRoleApi && updateRoleApi.id) {
      updatePostData();
    } else {
      addPostData();
    }
  };

  useEffect(() => {
    if (data.length === 0) {
      const blankRows = Array.from({ length: 1 }, () => ({
        name: "",
      }));
      setData(blankRows);
    }
  }, [data, setData]);

  useEffect(() => {
    if (updateRoleApi && Object.keys(updateRoleApi).length !== 0) {
      setAddData({
        name: updateRoleApi.name || "",
      });
    }
  }, [updateRoleApi]);

  return (
    <>
      <label
        htmlFor="roleName"
        style={{
          fontSize: "24px",
          marginBottom: "40px",
          fontWeight: "600",
          lineHeight: "100%",
        
        }}
      >
        Role Details Add or Edit
      </label>
      <form onSubmit={handleFormSubmit} style={{marginTop:"30px"}}>
        <InputField
          label="Role Name"
          name="name"
          value={addData.name}
          onChange={handleInputChange}
          required
        />

        {loading && <div className="loaderp"></div>}
        <Button label={isEmpty ? "Add" : "Edit"} type="submit" />
      </form>
    </>
  );
};

export default RoleForm;
