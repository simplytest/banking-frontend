class DashboardPage
{
    static verifyWelcomeMessage(message: string)
    {
        cy.get("label[data-testid=\"customer_Label\"]").should("contain.text", message);
    }

    static clickReceiveMoneyButton(index: number)
    {
        cy.get(`button[id='${index}-empfangen']`).click();
    }

    static clickSendMoneyButton(index: number)
    {
        cy.get(`button[id='${index}-ueberweisen']`).click();
    }
}

export default DashboardPage;