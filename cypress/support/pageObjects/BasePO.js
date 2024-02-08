class BasePO
{
    navigate(path)
    {
        cy.visit(path);
    }
}

export default BasePO;
