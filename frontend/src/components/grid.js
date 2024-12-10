import "./cell";
import Cell from "./cell";

const Grid = ({ height, width, cellStatus = [], onToggleCell = () => {} }) => {
  const getCellStatus = (pos_x, pos_y) => {
    // return firePosition.includes(`${pos_x}_${pos_y}`);
    return cellStatus[`${pos_x}_${pos_y}`];
  };

  return (
    <div
      style={{
        border: "1px solid red",
        borderRadius: "15px",
        padding: "15px",
        margin: "10px",
        lineHeight: "0.5",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {[...Array(height)].map((_, row) => (
          <div
            key={`row_${row}`}
            style={{ display: "flex", flexDirection: "row", gap: "2px" }}
          >
            {[...Array(width)].map((_, column) => (
              <Cell
                key={`cell_${row}-${column}`}
                status={getCellStatus(row, column)}
                onClick={() => {
                  onToggleCell(row, column);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
