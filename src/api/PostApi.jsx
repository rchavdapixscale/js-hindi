import axios from "axios";

const apiKey = "05646635804321276";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiY2l0eUlEIjoyLCJyb2xlSUQiOjIsImNvbXBhbnlJRCI6MSwiZmlyc3ROYW1lIjoiTUFOSUtPTkRBIiwibGFzdE5hbWUiOiJIWUQiLCJicmFuY2hOYW1lIjoiR1JFRU4gREFZIFNQQSAtIE1BTklLT05EQSIsInVzZXJOYW1lIjoiTUFOSUtPTkRBSFlEIiwicGFzc3dvcmQiOiIkMmEkMTAkTUZ2by5RdWVoQWkzbWtTYlJxdjhUZXgzSGRha0V1UkJxNW5UdzUwN1ZVejlVb1kvbmUuai4iLCJlbWFpbCI6ImdyZWVuZGF5c3BhbWFuaWtvbmRhQGdtYWlsLmNvbSIsInNsdWciOiIiLCJpc1dlYkRpc3BsYXkiOnRydWUsInBob25lTnVtYmVyIjoiOTg3OTczNDQwNCIsInBob25lTnVtYmVyMiI6Ijk4Nzk3MzQ0MDQiLCJvdHAiOiIxMjM0NTYiLCJvdHBDb3VudCI6MSwib3RwSXNzdWVEYXRlIjoiMjAyNS0wNC0yMlQwNjo1MzoxOS4wMDBaIiwiYWRkcmVzcyI6IkhZREVSQUJBRCIsImJpbGxUaXRsZSI6IkdSRUVOIERBWSBTUEEiLCJiaWxsQ29kZSI6IkhZTSIsImdzdE5vIjoiMDlBQUFDSDc0MDlSMVpaIiwiaXNTaG93R3N0Ijp0cnVlLCJhcmVhTmFtZSI6bnVsbCwiZGVzY3JpcHRpb24iOm51bGwsIm1hcFVybCI6Imh0dHBzOi8vbWFwcy5hcHAuZ29vLmdsL2ZqV0ZlZWQ1d2RlZ1NIREY3IiwiaW1hZ2VzIjpudWxsLCJ0aHVtYm5pbEltYWdlIjpudWxsLCJjYXJkSW1hZ2UiOm51bGwsImljb25JbWFnZSI6bnVsbCwiaUZyYW1lTWFwIjpudWxsLCJmZWVkYmFja1VybCI6Ii8iLCJyZXZpZXdVcmwiOiIvIiwiaXNXZWJMb2dpbiI6dHJ1ZSwiaXNBcHBMb2dpbiI6ZmFsc2UsImlzQWN0aXZlIjp0cnVlLCJpc0RlbGV0ZWQiOmZhbHNlLCJjcmVhdGVkQnkiOjEsInVwZGF0ZWRCeSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNC0xMi0yNlQwOTo0NDoxMi4wMDBaIiwidXBkYXRlZEF0IjoiMjAyNS0wNC0yMlQwNjo1MzoxOS4wMDBaIiwicm9vbUlEIjpudWxsLCJweF9yb2xlIjp7Im5hbWUiOiJCcmFuY2gifSwicHhfY29tcGFueSI6eyJjb21wYW55TmFtZSI6IkdSRUVOREFZUyBTUEEgUFRWLiBMVEQuIiwiZGlzcGxheU5hbWUiOiJHUkVFTkRBWVMgU1BBIiwiYmlsbENvZGUiOiJHIiwiY2FzaEJpbGxDb2RlIjoiRyJ9LCJweF9jaXR5Ijp7ImlkIjoyLCJuYW1lIjoiTUFESVBBS0FNIn0sImlhdCI6MTc0NTMwNDk0NCwiZXhwIjoxNzQ1MzQwOTQ0fQ.DbHEF0OBbliIKdL32lCzmqLItiGsF_W7a5m0d3N-kG0";

const api = axios.create({
  baseURL: "https://green-bill-api-dev.myjilo.com/api/customer",
  headers: {
    "x-api-key": apiKey,
    Authorization: token,
    "Content-Type": "application/json",
  },
});

export const getData = (filtersa = {}) => {
  const defaultFilters = {
    where: {
      isActive: true,
      isDeleted: false,
      searchText: "",
    },
    pagination: {
      sortBy: "createdAt",
      descending: true,
      rows: 100,
      page: 1,
    },
  };
  const queryParams = {
    ...defaultFilters,
    ...filtersa,
  };

  return api.post("/list", queryParams);
};


export const deleteData = async (id) => {
  try {
    const url = `https://green-bill-api-dev.myjilo.com/api/customer/${id}`;
    console.log("Deleting URL:", url);

    const res = await axios.delete(url, {
      headers: {
        "x-api-key": apiKey,
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    console.error("Error while deleting:", error.response || error.message);
    throw error;
  }
};

// post method

export const postData = async (formData) => {
  try {
    const res = await axios.post(
      "https://green-bill-api-dev.myjilo.com/api/customer",
      formData,
      {
        headers: {
          "x-api-key": apiKey,
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    console.error("POST error:", error.response?.data || error.message);
    return error.response;
  }
};

// updateData Method

export const updateData = async (id, post) => {
  try {
    const res = await axios.put(
      `https://green-bill-api-dev.myjilo.com/api/customer/${id}`,
      post,
      {
        headers: {
          "x-api-key": apiKey,
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    
    return res;
  } catch (error) {
    console.error("PUT error:", error.response?.data || error.message);
    return error.response;
  }
};
