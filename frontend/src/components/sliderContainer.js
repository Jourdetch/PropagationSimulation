const SliderContainer = ({
  value,
  onChange,
  label_before = "",
  label_after = "",
  min = 0,
  max = 100,
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
      {label_before}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => {
          onChange(Number(event.target.value));
        }}
        style={{ margin: "-3px 10px" }}
      />
      {value}
      {label_after}
    </div>
  );
};

export default SliderContainer;
