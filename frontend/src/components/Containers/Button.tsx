const Button = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <div
      style={{
        border: "1px solid red",
        borderRadius: "15px",
        padding: "15px",
        margin: "10px",
        lineHeight: "0.35",
      }}
    >
      <button onClick={onClick} style={{ fontSize: "0.8em" }}>
        {label}
      </button>
    </div>
  );
};

export default Button;
