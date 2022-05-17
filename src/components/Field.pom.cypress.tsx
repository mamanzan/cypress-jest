import { mount } from "@cypress/react";

import { CyPom } from "../../cypress/support/cyBase";
import { Field } from "./Field";

let dataCyRoot = "field";
context("Field POM", () => {
  beforeEach(() => {
    //Arrange
    mount(<Field />);
  });

  it("POM - Should have defaults", () => {
    const field = new FieldPOM(dataCyRoot);
    field.el.textInput.invoke("attr", "placeholder").should("eq", "");
    field.el.clear.should("not.exist");
  });

  it("POM - Should show the clear button when input has text", () => {
    const field = new FieldPOM(dataCyRoot);
    //Act
    field.type("Hello");
    //Assert
    field.el.clear.should("exist");
    field.el.textInput.should("have.value", "Hello");
  });

  it("POM - Should clear text when clicking clear button", () => {
    const field = new FieldPOM(dataCyRoot);
    //Act
    field.type("Hello");
    field.clickClear();
    //Assert
    field.el.clear.should("not.exist");
    field.el.textInput.should("have.value", "");
  });
});

//POM
const dataCySelectors = ["textInput", "clear"] as const;
type Selectors = typeof dataCySelectors[number];

class FieldPOM extends CyPom<Selectors> {
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);
  }
  public type(text: string): void {
    this.el.textInput.type(text);
  }
  public clickClear(): void {
    this.el.clear.click();
  }
}
