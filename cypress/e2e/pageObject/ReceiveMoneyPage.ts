class ReceiveMoneyPage
{
    static verifyTitle(title: string)
    {
        cy.get("h1[data-testid='receiveMoney_title']").should("have.text", title);
    }

    static enterAmount(amount: string)
    {
        cy.get("input[data-testid='receiveMoney_input']").focus().type(amount);
    }

    static clickSendButton()
    {
        cy.get("button[data-testid='send_money_button']").click();
    }
}

export default ReceiveMoneyPage;