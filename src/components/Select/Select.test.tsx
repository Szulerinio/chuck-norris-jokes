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

    render(<Select {...props} />);

    const closedSelect = (await screen.findByText(props.name)).parentElement;
    expect(closedSelect).toBeInTheDocument();
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
