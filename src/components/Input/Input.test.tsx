import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

const props = {
  value: "Hello",
  label: "impersonate",
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => event.target.value,
};

describe("Input component", () => {
  test("renders label", () => {
    render(<Input {...props} />);
    const inputElement = screen.getByText(props.label);
    expect(inputElement).toBeInTheDocument();
  });

  test("renders value", () => {
    render(<Input {...props} />);
    const inputElement = screen.getByDisplayValue(props.value);
    expect(inputElement).toBeInTheDocument();
  });

  test("runs onChange on keypress", async () => {
    let value = "";
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      value += event.target.value;
    };
    render(<Input label={props.label} value={value} onChange={onChange} />);
    const inputElement = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(inputElement, "Hello World");
    expect(value).toBe(`Hello World`);
  });
});
