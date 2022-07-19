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
import { useFormik } from "formik";
import { DownloadJokesFormikValues, DownloadJokesFormikErrors } from "./types";
function App() {
  const [name, setName] = useState("");
  const [type, setType] = useState<string[]>([]);
  const [isJokeLoading, setIsJokeLoading] = useState(false);
  const [joke, setJoke] = useState("");
  const [categories, setCategories] = useState([]);

  const downloadJokesFormik = useFormik({
    initialValues: {
      numberOfJokesToFetch: 0,
    },
    validate: (values: DownloadJokesFormikValues) => {
      const errors: DownloadJokesFormikErrors = {};
      if (!values.numberOfJokesToFetch || values.numberOfJokesToFetch < 1) {
        errors.numberOfJokesToFetch = "Provide a nubmer higher than 0";
      } else if (values.numberOfJokesToFetch > 100) {
        errors.numberOfJokesToFetch = "Too many jokes";
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log(values.numberOfJokesToFetch);

      downloadJokes(values.numberOfJokesToFetch);
    },
  });

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
          name={"Categories"}
          nameOnAction={"Select category"}
          options={categories}
          onChange={(value) => {
            handleTypeChange(value);
          }}
        ></Select>
        <Input
          style={{ marginBottom: "3.3rem" }}
          value={name}
          label="Impersonate Chuck Norris"
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
            value={downloadJokesFormik.values.numberOfJokesToFetch.toString()}
            onChange={(event) => {
              downloadJokesFormik.setFieldValue(
                "numberOfJokesToFetch",
                parseInt(event.target.value)
              );
            }}
            onButtonClick={(valueChange: number) => {
              downloadJokesFormik.setFieldValue(
                "numberOfJokesToFetch",
                downloadJokesFormik.values.numberOfJokesToFetch + valueChange
              );
            }}
          ></NumberPicker>
          <Button
            color={
              downloadJokesFormik.errors.numberOfJokesToFetch
                ? ButtonColors.Gray
                : ButtonColors.Dark
            }
            wide
            disabled={!!downloadJokesFormik.errors.numberOfJokesToFetch}
            onClick={() => {
              downloadJokesFormik.handleSubmit();
            }}
          >
            Save Jokes
          </Button>

          {downloadJokesFormik.errors.numberOfJokesToFetch
            ? downloadJokesFormik.errors.numberOfJokesToFetch
            : null}
        </div>
      </Card>
    </div>
  );
}

export default App;
