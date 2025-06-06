class CustomIntercepts
{
    registerSuccessfulLoginRequestAs(asPrefix: string, userId: string) {
        cy.intercept("POST", `**/login/${userId}`, {
            statusCode: 200,
            body: {
                result: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTcxNDY1NDI5Nn0.7RvioDzaHM9nEMP3imlBghveUetX3dRiLYUXZW-9Pd71y7pmA2Bh2uBPXAwZ96GEztgDJ-jAdu9O3Af9aAyJGg",
            },
        }).as(asPrefix + userId);
    }
    registerSuccessfulAccountDataRequestAs(responseName: string)
    {
        cy.fixture("contracts").then((contracts) =>
        {

            cy.intercept("GET", `${Cypress.env("backendUrl")}/api/contracts`, {
                statusCode: 200,
                body: contracts.initial,
            }).as(responseName);

        });
    }
}
export default new CustomIntercepts();