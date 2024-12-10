const Button = ({
  label,
  onClick,
  ...rest
}: {
  label: string;
  onClick: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
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
      <button onClick={onClick} style={{ fontSize: "0.8em" }} {...rest}>
        {label}
      </button>
    </div>
  );
};

export default Button;
