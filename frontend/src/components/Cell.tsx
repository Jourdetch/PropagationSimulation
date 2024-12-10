const Cell = ({
  status = 0,
  toggleCell,
}: {
  status: 0 | 1 | 2;
  toggleCell: () => void;
}) => {
  return (
    <div
      style={{
        width: "10px",
        height: "10px",
        backgroundColor:
          status === 0 ? "#2196f3" : status === 1 ? "red" : "grey",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #333",
        fontSize: "18px",
      }}
      onMouseOver={toggleCell}
    ></div>
  );
};

export default Cell;
