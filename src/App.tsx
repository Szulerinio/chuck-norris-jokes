import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import Select from "./components/Select/Select";
import Card from "./components/Card/Card";
import { fetchRandomJoke, fetchCategories } from "./functions/fetchJoke";

function App() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [joke, setJoke] = useState("");
  const [categories, setCategories] = useState([]);
  // console.log(fetchRandomJoke());

  const drawJoke = useCallback((name?: string, category?: string) => {
    if (name === undefined) {
      fetchRandomJoke().then((res) => {
        setJoke(res.joke);
      });
      return;
    }
    const nameArray = name.trim().split(" ");
    const lastName = nameArray.pop();
    const firstName = nameArray.join("%20");
    fetchRandomJoke(firstName, lastName, category).then((res) => {
      setJoke(res.joke);
    });
  }, []);

  useEffect(() => {
    drawJoke();
    fetchCategories().then((categories) => setCategories(categories));
  }, [drawJoke]);

  return (
    <div className={"container"}>
      <Card>
        <div className={`image ${name === "" ? "chuck" : "unknown"}`}></div>

        <p className="joke">{joke}</p>
        <Select
          style={{ marginBottom: "1.6rem" }}
          value={type}
          name={"Categories"}
          nameOnAction={"Select category"}
          options={categories}
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
            drawJoke(name, type);
          }}
        >
          {`Draw a random ${name === "" ? "Chuck Norris" : name} Joke`}
        </Button>
      </Card>
    </div>
  );
}

export default App;
