import DashboardPagePO from "../../support/pageObjects/DashboardPagePO";

class LoginPage extends DashboardPagePO
{
    visit()
    {
        super.navigateToDashboardPage();
        cy.url().should("include", "/dashboard");
        cy.get("h1").should("contain", "Smart Money");
    }

    login(contract, password)
    {
        super.typeContractID(contract);
        super.typePassword(password);
        super.clickOnLoginButton();
    }

    registerSuccessfulLoginRequestAs(asPrefix: string, userId: string)
    {
        cy.intercept("POST", `**/login/${userId}`, {
            statusCode: 200,
            body: {
                result: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTcxNDY1NDI5Nn0.7RvioDzaHM9nEMP3imlBghveUetX3dRiLYUXZW-9Pd71y7pmA2Bh2uBPXAwZ96GEztgDJ-jAdu9O3Af9aAyJGg"
            },
        }).as(asPrefix + userId);
    }

}
export default new LoginPage();