class LoginIntercepts {

    registerInvalidAccountRequestAs(responseName: string) {
        cy.intercept("POST", `**/login/111111`, {
            statusCode: 404,
            body: {
                timestamp: "May 20, 2024, 6:43:31 PM",
                status: 404,
                error: "Not Found",
                message: "404 NOT_FOUND",
                path: "/api/contracts/login/111111"
            }
        }).as(responseName);
    }

    registerFaultyLoginOn(userId: string) {
        cy.intercept("POST", `**/login/${userId}`, {
            statusCode: 400,
            body: {
                error: {
                    error: "BadCredentials"
                }
            }
        }).as("failedLoginRequest");
    }

    registerExemplaryLoginAs(asPrefix: string, responseName: string) {
        cy.intercept("POST", `**/login/${responseName}`, {
            statusCode: 200,
            body: {
                result: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTcxNDY1NDI5Nn0.7RvioDzaHM9nEMP3imlBghveUetX3dRiLYUXZW-9Pd71y7pmA2Bh2uBPXAwZ96GEztgDJ-jAdu9O3Af9aAyJGg"
            }
        }).as(asPrefix + responseName);
    }

    interceptAccountDetailsAfterSuccessfulLoginAs(responseName: string) {
        cy.intercept("GET", "**/api/contracts", {
            statusCode: 200,
            body: {
                id: {
                    counter: 7,
                    parent: 33,
                    child: 0
                },
                customer: {
                    type: "com.simplytest.core.customers.CustomerPrivate",
                    data: {
                        birthDay: "Oct 10, 1980, 12:00:00 AM",
                        schufaScore: 0.0,
                        transactionFee: 0.0,
                        monthlyFee: 2.99,
                        firstName: "Max",
                        lastName: "Wendeley",
                        address: {
                            country: "Deutschland",
                            zipCode: "897897",
                            street: "Hauptstraße",
                            house: "1",
                            city: "Musterstadt",
                            email: "art@muster.de"
                        }
                    }
                },
                accounts: {
                    "00033:00001": {
                        type: "com.simplytest.core.accounts.AccountGiro",
                        data: {
                            sendLimit: 3000.0,
                            dispoLimit: 0.0,
                            dispoRate: 0.0,
                            balance: 9000.0,
                            boundPeriod: 0.0,
                            interestRate: 0.0
                        }
                    },
                    "00033:00007": {
                        type: "com.simplytest.core.accounts.AccountFixedRate",
                        data: {
                            runtime: 0.0,
                            balance: 1000.0,
                            boundPeriod: 0.0,
                            interestRate: 0.0
                        }
                    }
                }
            }
        }).as(responseName);
    }
}

export default new LoginIntercepts();