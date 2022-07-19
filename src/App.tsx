import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import ButtonColors from "./components/Button/types";
import Input from "./components/Input/Input";
import Select from "./components/Select/Select";
import Card from "./components/Card/Card";
import NumberPicker from "./components/NumberPicker/NumberPicker";
import {
  fetchRandomJoke,
  fetchCategories,
  fetchMultipleJokes,
} from "./functions/fetchJoke";
import { downloadBlob } from "./functions/download";
import Spinner from "./assets/icons/Spinner/Spinner";
import { useTranslation } from "react-i18next";

function App() {
  const [name, setName] = useState("");
  const [type, setType] = useState<string[]>([]);
  const [isJokeLoading, setIsJokeLoading] = useState(false);
  const [joke, setJoke] = useState("");
  const [categories, setCategories] = useState([]);
  const [numberOfJokesToFetch, setNumberOfJokesToFetch] = useState(0);

  const { t, i18n } = useTranslation();

  const handleNumberOfJokesButtonsClick = (valueChange: number) => {
    setNumberOfJokesToFetch((prev) =>
      prev + valueChange > 100 || prev + valueChange < 0
        ? prev
        : prev + valueChange
    );
  };
  const handleNumberOfJokesInputChange = (value: string) => {
    setNumberOfJokesToFetch((prev) => {
      if (value === "") {
        return 0;
      }
      return parseInt(value) > 100
        ? 100
        : parseInt(value) < 0
        ? 0
        : parseInt(value);
    });
  };
  const handleTypeChange = (value?: string) => {
    if (!value) {
      setType([]);
    } else {
      setType((prevValue) => {
        if (prevValue.indexOf(value) === -1) {
          return [...prevValue, value];
        }
        return prevValue.filter((element) => element !== value);
      });
    }
  };

  const drawJoke = useCallback((name?: string, category?: string[]) => {
    setIsJokeLoading(true);
    if (name === undefined) {
      fetchRandomJoke().then((res) => {
        setJoke(res.joke);
        setIsJokeLoading(false);
      });
      return;
    }

    const nameArray = name.trim().split(" ");
    const lastName = nameArray.pop();
    const firstName = nameArray.join("%20");
    fetchRandomJoke(firstName, lastName, category).then((res) => {
      setJoke(res.joke);
      setIsJokeLoading(false);
    });
  }, []);

  useEffect(() => {
    drawJoke();
    fetchCategories().then((categories) => setCategories(categories));
  }, [drawJoke]);

  const downloadJokes = async (amount: number) => {
    const file = await fetchMultipleJokes(amount)
      .then((res) => res.map((obj: { id: number; joke: string }) => obj.joke))
      .then((res) => new Blob(res));
    downloadBlob(file);
  };

  return (
    <div className={"container"}>
      <Card>
        <div className={`image ${name === "" ? "chuck" : "unknown"}`}></div>

        {isJokeLoading ? <Spinner /> : <p className="joke">{joke}</p>}
        <Select
          style={{ marginBottom: "1.6rem" }}
          value={type}
          name={t("categories")}
          nameOnAction={t("selectCategory")}
          options={categories}
          onChange={(value) => {
            handleTypeChange(value);
          }}
        ></Select>
        <Input
          style={{ marginBottom: "3.3rem" }}
          value={name}
          label={t("impersonate")}
          onChange={(event) => setName(event.target.value)}
        />
        <Button
          style={{ marginBottom: "6rem" }}
          color={ButtonColors.Dark}
          onClick={() => {
            drawJoke(name, type);
          }}
        >
          {`Draw a random ${name === "" ? "Chuck Norris" : name} Joke`}
        </Button>
        <div className="downloads">
          <NumberPicker
            value={numberOfJokesToFetch.toString()}
            onChange={(event) => {
              handleNumberOfJokesInputChange(event.target.value);
            }}
            onButtonClick={(valueChange: number) => {
              handleNumberOfJokesButtonsClick(valueChange);
            }}
          ></NumberPicker>
          <Button
            color={
              numberOfJokesToFetch < 1 || numberOfJokesToFetch > 100
                ? ButtonColors.Gray
                : ButtonColors.Dark
            }
            wide
            disabled={numberOfJokesToFetch < 1 || numberOfJokesToFetch > 100}
            onClick={() => downloadJokes(numberOfJokesToFetch)}
          >
            {t("saveJoke", { count: numberOfJokesToFetch })}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default App;
