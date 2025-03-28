class ResponseUtility {


    waitForFailureResponseOf(requestName: string, expectedStatusCode: number) {
        cy.wait("@" + requestName).then((interception) => {
            expect(interception.response.statusCode).to.equal(expectedStatusCode);
            //expect(interception.request.url).to.contain(endpoint);
            expect(interception.request.method).to.equal("POST");
        });
    }

    waitForSuccessfulResponseOf(requestName: string) {
        cy.wait("@" + requestName).then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });
    }
    verifyResponseOf(alias: string, callback: (response: any) => void) {
        cy.wait(`@${alias}`).then((interception) => {
            callback(interception.response);
        });
    }

    verifySuccessfulResponseOf(alias: string) {
        cy.wait(`@${alias}`).its("response.statusCode").should("eq", 200);
    }

    verifyFailedResponseOf(alias: string, statusCode: number) {
        cy.wait(`@${alias}`).its("response.statusCode").should("eq", statusCode);
    }
}

export default new ResponseUtility();