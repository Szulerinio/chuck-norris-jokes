import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NumberPicker from "./NumberPicker";
import { ChangeEvent } from "react";
import userEvent from "@testing-library/user-event";

const props = {
  value: "0",
  onChange: (event: ChangeEvent<HTMLInputElement>) => {},
  onButtonClick: (valueChange: number) => {},
};

describe("NumberPicker component", () => {
  test("renders number input", () => {
    render(<NumberPicker {...props} />);
    const inputElement = screen.getByRole("spinbutton");
    expect(inputElement).toHaveValue(0);
  });

  test("renders +/- buttons", () => {
    render(<NumberPicker {...props} />);
    const buttonElements = screen.getAllByRole("button");
    expect(buttonElements).toHaveLength(2);
    buttonElements.map((element) => expect(element).toBeInTheDocument());
  });

  test("handles button click", async () => {
    let value = "0";
    const onButtonClick = (valueChange: number) => {
      value = (Number(value) + valueChange).toString();
    };
    render(<NumberPicker {...props} onButtonClick={onButtonClick} />);
    const buttonElements = screen.getAllByRole("button");

    await userEvent.click(buttonElements[0]);
    expect(value).toBe(`-1`);

    await userEvent.click(buttonElements[1]);
    expect(value).toBe(`0`);

    await userEvent.click(buttonElements[1]);
    expect(value).toBe(`1`);
  });

  test("handles input value change", async () => {
    let value = "0";
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      value += event.target.value;
    };
    render(<NumberPicker {...props} onChange={onChange} />);
    const inputElement = screen.getByRole<HTMLInputElement>("spinbutton");

    expect(value).toBe(`0`);

    await userEvent.type(inputElement, "1");
    expect(value).toBe(`01`);

    await userEvent.type(inputElement, "3");
    expect(value).toBe(`013`);
    // TODO: test deleting value
    // await userEvent.type(inputElement, "{Delete}");
    // expect(value).toBe(``);
    // await userEvent.type(inputElement, "{Backspace}");
    // expect(value).toBe(``);
    // currently broken, source:  https://github.com/testing-library/react-testing-library/issues/359
  });
  test("rejects input value change on letter", async () => {
    let value = "0";
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      value += event.target.value;
    };
    render(<NumberPicker {...props} onChange={onChange} />);
    const inputElement = screen.getByRole<HTMLInputElement>("spinbutton");

    expect(value).toBe(`0`);

    await userEvent.type(inputElement, "g");
    expect(value).toBe(`0`);
  });
});
