export type Cy = Cypress.Chainable<JQuery<HTMLElement>>;

export const CyGet = (selector: string): Cy => {
  const dataCy = `[data-cy='${selector}']`;
  return cy.get(dataCy);
};

export const CyGetChild = (parent: string, child: string): Cy => {
  const dataCy = `[data-cy='${parent}'] [data-cy='${child}']`;
  return cy.get(dataCy);
};

//https://stackoverflow.com/questions/67083645/typescript-dynamic-getter-setter
//Basically saing we have an El object type of strings for property names
//and that their return type is a Cy ... a.k.a cy object for chaining cypress commands
export type El<T extends string> = Record<T, Cy>;
//need to extend string here to make compiler happy lets it know CyPom is definitley string
export class CyPom<T extends string> {
  public el: El<T>;

  get root(): Cy {
    return CyGet(this.rootCy);
  }

  constructor(public rootCy: string, properties: string[]) {
    this.el = {} as El<T>;
    properties.forEach((property: string) => {
      Object.defineProperty(this.el, property, {
        get() {
          const result = CyGetChild(rootCy, property);
          return result;
        },
      });
    });
  }
}
