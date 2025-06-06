class ResponseUtility
{
    waitForSuccessfulResponseOf(requestName: string)
    {
        cy.wait("@" + requestName).then((interception) =>
        {
            expect(interception.response.statusCode).to.equal(200);
        });
    }
}
export default new ResponseUtility();