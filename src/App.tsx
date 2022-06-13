import React, { useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import Select from "./components/Select/Select";
import Card from "./components/Card/Card";

function App() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  return (
    <div className={"container"}>
      <Card>
        <div className={`image ${name === "" ? "chuck" : "unknown"}`}></div>

        <p className="joke">If Chuck Norris were to travel</p>
        <Select
          style={{ marginBottom: "1.6rem" }}
          value={type}
          name={"Categories"}
          nameOnAction={"Select category"}
          options={["1", "2", "3"]}
          onChange={(value) => {
            console.log("aa");
            setType(value);
          }}
        ></Select>
        <Input
          style={{ marginBottom: "3.3rem" }}
          value={name}
          label="Impersonate Chuck Norris"
          onChange={(event) => setName(event.target.value)}
        />
        <Button
          color={"dark"}
          onClick={() => {
            return true;
          }}
        >
          {`Draw a random ${name === "" ? "Chuck Norris" : name} Joke`}
        </Button>
      </Card>
    </div>
  );
}

export default App;
