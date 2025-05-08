import Button from "../BtnComponents/btn";

const Table = ({ columns, data, onEdit, onDelete }) => {
  return (
    <table style={{ border:"1px", marginTop: "40px", width: "100%", paddingTop:"40px" }}>
      <thead>
        <tr style={{ background: "#d6c7c7", fontSize: "25px", letterSpacing: "1px", }}>
          {columns.map((col, index) => (
            <th key={index} style={{ padding: "15px" }}>{col.header}</th>
          ))}
          <th style={{ padding: "15px", fontSize:""}}>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id || index} style={{ backgroundColor: "#fff" }}>
            {columns.map((col, colIndex) => (
              <td style={{border:"1px solid",fontSize:"20px", textAlign:"center"}} key={colIndex}>{item[col.accessor] ?? "N/A"}</td>
            ))}
            <td style={{border:"1px solid", textAlign:"center"}}>
              <Button label="Edit" onClick={() => onEdit(item)} />
              <Button label="Delete" onClick={() => onDelete(item.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
