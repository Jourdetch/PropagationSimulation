const Cell = ({
  status = 0,
  onClick,
}: {
  status: 0 | 1 | 2;
  onClick: () => void;
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
      onClick={onClick}
    ></div>
  );
};

export default Cell;
