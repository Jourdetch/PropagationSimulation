import { useState } from "react";
import Grid from "./Grid";
import Slider from "./Containers/Slider";
import Button from "./Containers/Button";

const SimulationResult = ({
  data,
  handleReset,
}: {
  data: any;
  handleReset: (resetData: boolean) => void;
}) => {
  const [level, setLevel] = useState(0);
  console.log(data);
  console.log(data.data.length);
  return (
    <>
      {data ? (
        <>
          <Grid
            height={data.height}
            width={data.width}
            cellStatus={data.data[level]}
          />
          <Slider
            value={level}
            onChange={setLevel}
            label_before="Level"
            max={data.data.length - 1}
          />
        </>
      ) : (
        "Error : no result"
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Button label={"Retry"} onClick={() => handleReset(false)} />
        <Button label={"Reset"} onClick={() => handleReset(true)} />
      </div>
    </>
  );
};

export default SimulationResult;
