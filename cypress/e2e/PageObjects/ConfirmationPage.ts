class ConfirmationPage
{
    static verifyTitle(title: string)
    {
        cy.get("h1[data-testid='title']").should("have.text", title);
    }

    static verifyTitleContains(text: string)
    {
        cy.get("h1[data-testid='title']").should("contain.text", text);
    }

    static clickCloseButton()
    {
        cy.get("button[data-testid='close_button']").click();
    }
}

export default ConfirmationPage;