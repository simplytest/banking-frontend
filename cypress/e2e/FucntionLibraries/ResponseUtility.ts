class ResponseUtility
{
    waitForSuccessfulResponseOf(requestName: string)
    {
        cy.wait("@" + requestName).then((interception) =>
        {
            expect(interception.response.statusCode).to.equal(200);
        });
    }
    verifyResponseOf(alias: string, callback: (response: any) => void)
    {
        cy.wait(`@${alias}`).then((interception) =>
        {
            callback(interception.response);
        });
    }
    verifySuccessfulResponseOf(alias: string)
    {
        cy.wait(`@${alias}`).its("response.statusCode").should("eq", 200);
    }
}
export default new ResponseUtility();