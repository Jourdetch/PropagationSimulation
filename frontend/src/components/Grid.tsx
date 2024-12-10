import { useState } from "react";
import { Status } from "../App";
import Cell from "./Cell";

const Grid = ({
  height,
  width,
  cellStatus = {},
  onToggleCell = () => {},
}: {
  height: number;
  width: number;
  cellStatus: { [key: string]: Status };
  onToggleCell?: (x: number, y: number) => void;
}) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const getCellStatus = (pos_x: number, pos_y: number) => {
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
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
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
                toggleCell={() => {
                  isMouseDown && onToggleCell(row, column);
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
