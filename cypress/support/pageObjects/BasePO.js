class BasePO
{
    navigate(path)
    {
        cy.fixture("config.json").then((data) =>
        {
            cy.visit(data.baseUrl + path);
        });
    }

    angularInputFieldHelperByDataTestID(value, identifier)
    {

        const input = value.split("");
        for (let part of input)
        {
            cy.get("[data-testid='" + identifier + "']").type(part);
        }
    }
}
export default BasePO;
