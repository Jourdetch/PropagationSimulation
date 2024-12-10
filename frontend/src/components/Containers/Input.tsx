const Input = ({
  value,
  onChange,
  placeholder = "",
}: {
  value: number;
  onChange: (value: number) => void;
  placeholder: string;
}) => {
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
      <input
        value={value}
        type="number"
        placeholder={placeholder}
        onChange={(event) => {
          onChange(Number(event.target.value));
        }}
        style={{ fontSize: "1.2em" }}
      />
    </div>
  );
};

export default Input;
