import { mount } from "@cypress/react";

import { Field } from "./Field";
import "../index.css";
import "./Field.css";

describe("Field", () => {
  beforeEach(() => {
    //Arrange
    mount(<Field />);
  });

  it("Should have defaults", () => {
    const field = cy.get("[data-cy='field']");
    //Assert
    field.get("input").invoke("attr", "placeholder").should("eq", "");
    field.get("button").should("not.exist");
  });

  it("Should show the clear button when input has text", () => {
    const field = cy.get("[data-cy='field']");
    //Act
    field.get("input").type("Hello");
    //Assert
    field.get("button").should("exist");
    field.get("input").should("have.value", "Hello");
  });

  it("Should clear text when clicking clear button", () => {
    const field = cy.get("[data-cy='field']");
    //Act
    field.get("input").type("Hello");
    field.get("button").click();
    //Assert
    field.get("button").should("not.exist");
    field.get("input").invoke("attr", "value").should("eq", "");
  });
});
