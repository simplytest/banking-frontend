class BasePO
{
    navigate(path)
    {
        cy.visit(path);
    }

    angularInputFieldHelperByDataTestID(value, identifier)
    {

        const input = value.split("");
        for (let part of input)
        {
            cy.get("[data-testid='" + identifier + "']").type(part);
        }
        cy.get("[data-testid='" + identifier + "']").should("have.value", value);
    }
}

export default BasePO;
