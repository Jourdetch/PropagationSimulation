import { useEffect, useState } from "react";
import "./App.css";
import "./components/grid";
import Grid from "./components/grid";
import InputContainer from "./components/inputContainer";
import SliderContainer from "./components/sliderContainer";
import Button from "./components/button";
import ResultSimulation from "./components/resultSimulation";

function App() {
  const [height, setHeight] = useState(40);
  const [width, setWidth] = useState(60);
  const [propagationChance, setPropagationChance] = useState(40);
  const [cellStatus, setCellStatus] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    console.log(showResult);
  }, [showResult]);

  const toggleCell = (pos_x, pos_y) => {
    console.log("toggle cell :", pos_x, pos_y);
    let newStatus = 1;
    if (cellStatus[`${pos_x}_${pos_y}`]) {
      newStatus = (cellStatus[`${pos_x}_${pos_y}`] + 1) % 3;
    }
    setCellStatus({
      ...cellStatus,
      [`${pos_x}_${pos_y}`]: newStatus,
    });
    // console.log("cellStatus :", cellStatus);
  };

  const sendRequest = async () => {
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
    setShowResult(true);
    setResponse(data);
  };

  return (
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
            <ResultSimulation
              data={response}
              handleReset={() => setShowResult((prev) => !prev)}
            />
          </>
        ) : (
          <>
            <div
              style={{ display: "flex", flexDirection: "row", margin: "20px" }}
            >
              <InputContainer
                value={height}
                onChange={setHeight}
                placeholder="Height"
              />
              <InputContainer
                value={width}
                onChange={setWidth}
                placeholder="Width"
              />
            </div>
            <div>
              <SliderContainer
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
            <Button label={"Simulate"} onClick={sendRequest} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
