class ResponseUtility {

    waitForInvalidAccountOn(requestName: string) {
        cy.wait("@" + requestName).then((interception) => {
            expect(interception.response.statusCode).to.equal(404);
            expect(interception.request.url).to.contain("/login/111111");
            expect(interception.request.method).to.equal("POST");
        });
    }

    waitForFailureOn(requestName: string) {
        cy.wait("@" + requestName).then((interception) => {
            expect(interception.response.statusCode).to.equal(400);
            expect(interception.request.url).to.contain("/login/00033");
            expect(interception.request.method).to.equal("POST");
        });
    }

    waitForStatus200On(requestName: string) {
        cy.wait("@" + requestName).then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });
    }

}

export default new ResponseUtility();