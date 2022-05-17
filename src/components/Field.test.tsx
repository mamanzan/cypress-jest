import { fireEvent, render } from "@testing-library/react";

import { Field } from "./Field";

describe("Field", () => {
  test("Should have defaults", () => {
    const { container: field } = render(<Field />);
    //Assert
    expect(field.querySelector("input")).toHaveAttribute("placeholder", "");
    expect(field.querySelector("button")).not.toBeInTheDocument();
  });

  test("Should show the clear button when input has text", () => {
    const { container: field } = render(<Field />);
    //Act
    fireEvent.change(field.querySelector("input") as Element, {
      target: { value: "Hello" },
    });
    //Assert
    expect(field.querySelector("button")).toBeInTheDocument();
    expect(field.querySelector("input")).toHaveValue("Hello");
  });

  test("Should clear text when clicking clear button", () => {
    const { container: field } = render(<Field />);
    //Act
    fireEvent.change(field.querySelector("input") as Element, {
      target: { value: "Hello" },
    });
    fireEvent.click(field.querySelector("button") as Element);
    //Assert
    expect(field.querySelector("button")).not.toBeInTheDocument();
    expect(field.querySelector("input")).toHaveAttribute("placeholder", "");
  });
});
