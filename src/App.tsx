import React, { useEffect, useState, useCallback } from "react";
import styles from "./App.module.scss";
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
import { ResponseStatus } from "./functions/types";
import Spinner from "./assets/icons/Spinner/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

function App() {
  const [name, setName] = useState("");
  const [type, setType] = useState<string[]>([]);
  const [isJokeLoading, setIsJokeLoading] = useState(false);
  const [jokeError, setJokeError] = useState<string>("");
  const [joke, setJoke] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const { t, i18n } = useTranslation();

  const jokesToDownloadRange = {
    max: 100,
    min: 0,
  };

  const downloadJokesFormik = useFormik({
    validateOnMount: true,
    initialValues: {
      numberOfJokesToFetch: "0",
    },
    validationSchema: Yup.object({
      numberOfJokesToFetch: Yup.number()
        .max(
          jokesToDownloadRange.max,
          t("error.tooHighNumber", { number: jokesToDownloadRange.max })
        )
        .min(
          jokesToDownloadRange.min + 1,
          t("error.tooLowNumber", { number: jokesToDownloadRange.min })
        )
        .required(t("error.provideNumber")),
    }),
    onSubmit: (values) => {
      const val = parseInt(values.numberOfJokesToFetch);
      downloadJokes(isNaN(val) ? 0 : val);
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
        if (res.status === ResponseStatus.Success) {
          setJoke(res.data.joke);
          setJokeError("");
        } else {
          setJokeError(res.data);
        }
        setIsJokeLoading(false);
      });
      return;
    }

    const nameArray = name.trim().split(" ");
    const lastName = nameArray.pop();
    const firstName = nameArray.join(" ");
    fetchRandomJoke(firstName, lastName, category).then((res) => {
      if (res.status === ResponseStatus.Success) {
        setJoke(res.data.joke);
        setJokeError("");
      } else {
        setJokeError(res.data);
      }
      setIsJokeLoading(false);
    });
  }, []);

  useEffect(() => {
    drawJoke();
    fetchCategories().then((categories) =>
      categories.status === ResponseStatus.Success
        ? setCategories(categories.data)
        : []
    );
  }, [drawJoke]);
  useEffect(() => {});

  const downloadJokes = async (amount: number) => {
    const jokes = await fetchMultipleJokes(amount);

    if (jokes.status === ResponseStatus.Success) {
      const file = jokes.data.map(
        (obj: { id: number; joke: string }) => obj.joke
      );
      const blob = new Blob(file);
      downloadBlob(blob);
    } else {
      alert(jokes.data);
    }
  };

  return (
    <div className={styles.container}>
      <Card>
        <div
          className={`${styles.image} ${
            name === "" ? styles.chuck : styles.unknown
          }`}
        ></div>

        {isJokeLoading ? (
          <Spinner />
        ) : jokeError?.length > 0 ? (
          <p className={styles.loadError}>{`error: ${jokeError}`}</p>
        ) : (
          <p className={styles.joke}>{joke.trim()}</p>
        )}
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
          {t("drawJoke", { name: name === "" ? "Chuck Norris" : name })}
        </Button>
        <div className={styles.downloads}>
          <NumberPicker
            outOfRange={
              Number(downloadJokesFormik.values.numberOfJokesToFetch) >
                jokesToDownloadRange.max ||
              Number(downloadJokesFormik.values.numberOfJokesToFetch) <
                jokesToDownloadRange.min
            }
            value={downloadJokesFormik.values.numberOfJokesToFetch}
            onChange={(event) => {
              const value = event.target.value;
              downloadJokesFormik.setFieldValue("numberOfJokesToFetch", value);
            }}
            onButtonClick={(valueChange: number) => {
              downloadJokesFormik.setFieldValue(
                "numberOfJokesToFetch",
                Number(downloadJokesFormik.values.numberOfJokesToFetch) +
                  valueChange
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
            {t("saveJoke_interval", {
              postProcess: "interval",
              count: Number(downloadJokesFormik.values.numberOfJokesToFetch),
            })}
          </Button>

          {downloadJokesFormik.errors.numberOfJokesToFetch && (
            <span className={styles.formError}>
              {downloadJokesFormik.errors.numberOfJokesToFetch}
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}

export default App;
