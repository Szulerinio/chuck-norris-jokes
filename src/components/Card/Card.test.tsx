import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./Card";

const textProps = ["Hello, world!", "Goodbye, world!", "Spaghetti!"];
const children: JSX.Element[] = textProps.map((text, index) => (
  <span key={index}>{text}</span>
));
describe("Card component", () => {
  test("renders single child", () => {
    render(<Card>{children}</Card>);

    const childElement = screen.getByText(textProps[0]);
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent(textProps[0]);
  });
  test("renders multiple children", () => {
    render(<Card>{children}</Card>);
    const childrenElements = textProps.map((text) => screen.getByText(text));
    expect(childrenElements).toHaveLength(textProps.length);
    childrenElements.forEach((childElement, index) => {
      expect(childElement).toBeInTheDocument();
      expect(childElement).toHaveTextContent(textProps[index]);
    });
  });
});
