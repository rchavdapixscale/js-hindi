import Button from "../BtnComponents/btn";
import "./Table.css"

const Table = ({ columns, data, onEdit, onDelete }) => {
  return (
    <table className="table-row">
      <thead>
        <tr className="table-now">
          {columns.map((col, index) => (
            <th className="now-me" key={index}>{col.header}</th>
          ))}
          <th className="now-me">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr className="itme-can" key={item.id || index}>
            {columns.map((col, colIndex) => (
              <td className="itme-do" key={colIndex}>{item[col.accessor] ?? "N/A"}</td>
            ))}
            <td className="td-can">
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
