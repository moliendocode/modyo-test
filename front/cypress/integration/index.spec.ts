describe("List", () => {
    it("should display 'Bulbasaur'", () => {
        cy.visit("http://localhost:3000/");

        cy.get("input").first().type("bulb");
        cy.get("li").first().should("have.text", "Bulbasaur");
        cy.get("body").screenshot();
    });
});
