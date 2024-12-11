import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Input from "./components/Containers/Input";
import Slider from "./components/Containers/Slider";
import Button from "./components/Containers/Button";
import SimulationResult from "./components/SimulationResult";

export type Status = 0 | 1 | 2;
export type Response = {
  height: number;
  width: number;
  propagation: number;
  data: { [key: string]: Status }[];
};
function App() {
  const [height, setHeight] = useState<number>(40);
  const [width, setWidth] = useState<number>(60);
  const [propagationChance, setPropagationChance] = useState<number>(40);
  const [cellStatus, setCellStatus] = useState<{ [key: string]: Status }>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const [response, setResponse] = useState<null | Response>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(showResult);
  }, [showResult]);

  const toggleCell = (pos_x: number, pos_y: number) => {
    console.log("toggle cell :", pos_x, pos_y);
    let newStatus: Status = 1;
    if (cellStatus[`${pos_x}_${pos_y}`]) {
      newStatus = ((cellStatus[`${pos_x}_${pos_y}`] + 1) % 3) as Status;
    }
    setCellStatus({
      ...cellStatus,
      [`${pos_x}_${pos_y}`]: newStatus,
    });
  };

  const sendRequest = async () => {
    setIsLoading(true);
    const response = await fetch("http://localhost:8080/fire-simulation", {
      method: "POST",
      body: JSON.stringify({
        height: height,
        width: width,
        propagation: propagationChance,
        cellStatus: cellStatus,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();
    setIsLoading(false);
    setShowResult(true);
    setResponse(data);
  };

  const handleGridReset = (resetData: boolean = false) => {
    setShowResult(false);
    resetData && setCellStatus({});
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#282c34",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "calc(10px + 2vmin)",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {showResult ? (
            <>
              <SimulationResult data={response} handleReset={handleGridReset} />
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "20px",
                }}
              >
                <Input
                  value={height}
                  onChange={setHeight}
                  placeholder="Height"
                />
                <Input value={width} onChange={setWidth} placeholder="Width" />
              </div>
              <div>
                <Slider
                  value={propagationChance}
                  onChange={setPropagationChance}
                  label_before="Propagation"
                  label_after="%"
                />
              </div>

              <Grid
                height={height}
                width={width}
                onToggleCell={toggleCell}
                cellStatus={cellStatus}
              />
              <Button
                label={isLoading ? "Loading ..." : "Simulate"}
                disabled={isLoading}
                onClick={sendRequest}
              />
              <Button label={"Reset"} onClick={() => handleGridReset(true)} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
