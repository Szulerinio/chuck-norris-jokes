import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./Card";

const prop = "Hello, world!";
const child: JSX.Element[] = [<span key={1}>{prop}</span>];
describe("Card component", () => {
  test("renders children", () => {
    render(<Card>{child}</Card>);

    const childrenElement = screen.getByText(prop);
    expect(childrenElement).toBeInTheDocument();
  });
});
