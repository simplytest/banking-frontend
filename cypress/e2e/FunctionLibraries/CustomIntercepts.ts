class CustomIntercepts {
    registerSuccessfulLoginRequestAs(asPrefix: string, userId: string) {
        cy.intercept("POST", `**/login/${userId}`, {
            statusCode: 200,
            body: {
                result: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTcxNDY1NDI5Nn0.7RvioDzaHM9nEMP3imlBghveUetX3dRiLYUXZW-9Pd71y7pmA2Bh2uBPXAwZ96GEztgDJ-jAdu9O3Af9aAyJGg"
            }
        }).as(asPrefix + userId);
    }
    registerFailedLoginRequestWrongPasswordAs(asPrefix: string, userId: string) {
        cy.intercept("POST", `**/login/${userId}`, {
            statusCode: 400,
            body: {
                "error": {
                  "error": "BadCredentials"
                }
              }
        }).as(asPrefix + userId);
    }
    registerFailedLoginRequestIdNotFoundAs(asPrefix: string, userId: string) {
        cy.intercept("POST", `**/login/${userId}`, {
            statusCode: 404,
            body: {
                "timestamp": "Mar 28, 2025, 10:55:44 AM",
                "status": 404,
                "error": "Not Found",
                "message": "404 NOT_FOUND",
                "path": "/api/contracts/login/2"
              }
        }).as(asPrefix + userId);
    }

    registerSuccessfulReceiveMoneyRequestAs(responseName: string) {
        cy.fixture("transactionData").then((transactionData) => {
            cy.intercept("GET", `${Cypress.env("backendUrl")}/api/accounts/1/receive?amount=${transactionData.receiveMoney.amount}`, {
                statusCode: 200,
                body: {
                    result: transactionData.receiveMoney.result
                }
            }).as(responseName);
        });
    }
    registerSuccessfulAccountDataRequestAs(responseName: string) {
        cy.fixture("contracts").then((contracts) => {

            cy.intercept("GET", `${Cypress.env("backendUrl")}/api/contracts`, {
                statusCode: 200,
                body: contracts.initial
            }).as(responseName);

        });
    }
}

export default new CustomIntercepts();