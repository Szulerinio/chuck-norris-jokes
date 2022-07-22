import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Select from "./Select";

const defaultProps = {
  value: [],
  options: ["one", "two"],
  name: "categories",
  nameOnAction: "selectCategory",
  onChange: (value?: string) => {
    if (!value) {
      values = [];
      return;
    }
    if (values.indexOf(value) === -1) {
      values = [...values, value];
      return;
    }
    values = values.filter((element) => element !== value);
    return;
  },
};
let values: string[] = [];
describe("Select component", () => {
  test("shows placeholder", async () => {
    const props = {
      ...defaultProps,
    };

    render(<Select {...props} />);

    const closedSelect = (await screen.findByText(props.name)).parentElement;
    expect(closedSelect).toBeInTheDocument();
    expect(closedSelect).toHaveTextContent(props.name);
  });

  test("doesn't display dropdown initially", async () => {
    const props = {
      ...defaultProps,
    };

    render(<Select {...props} />);

    const dropdown = (await screen.findByText(props.nameOnAction))
      .parentElement;
    expect(dropdown).not.toHaveClass("open");
  });

  test("displays selected options", async () => {
    const props = {
      ...defaultProps,
      value: ["one"],
    };

    render(<Select {...props} />);

    const closedSelect = await screen.queryByText(props.name);

    expect(closedSelect).not.toBeInTheDocument();
  });
});
