import { useState } from "react";
import Grid from "./grid";
import SliderContainer from "./sliderContainer";
import Button from "./button";

const ResultSimulation = ({ data, handleReset }) => {
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
          <SliderContainer
            value={level}
            onChange={setLevel}
            label_before="Level"
            max={data.data.length - 1}
          />
        </>
      ) : (
        "no result"
      )}
      Result
      <Button label={"Reset"} onClick={handleReset} />
    </>
  );
};

export default ResultSimulation;
