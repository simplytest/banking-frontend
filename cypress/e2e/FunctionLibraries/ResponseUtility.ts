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

}

export default new ResponseUtility();