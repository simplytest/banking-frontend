class SendMoneyPage
{
    static verifyTitle(title: string)
    {
        cy.get("h1[data-testid='title']").should("have.text", title);
    }

    static enterAmount(amount: string)
    {
        cy.get("input[data-testid='send_amount']").focus().type(amount);
    }

    static enterIban(iban: string)
    {
        cy.get("input[data-testid='send_iban']").click().type(iban);
    }

    static clickSendButton()
    {
        cy.get("button[data-testid='send_money_button']").click();
    }
}

export default SendMoneyPage;