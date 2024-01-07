import { HttpClientModule } from "@angular/common/http";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "src/app/app-routing.module";
import { ContractServerService } from "src/app/_services/contract-server.service";
import { MockContractServerService } from "../../mocks/MockContractServerService";
import { MainPageComponent, DialogOverviewSendMoneyDialog, DialogOverviewTransferMoneyDialog, TransferMoneyDialog } from "src/app/main-page/main-page.component";

function fillAngularInputFieldByDataTestID(value, identifier)
{
    cy.get("[data-testid='" + identifier + "']").focus();
    cy.get("[data-testid='" + identifier + "']").clear();
    const betrag = value.split("");
    for (const part of betrag)
    {
        cy.get("[data-testid='" + identifier + "']").type(part);
    }
}

const mockDialogData = {
    token: "mockToken",
    current: "00001:00001",
    accounts: [
        ["00001:00002", { data: { balance: 1000.0, boundPeriod: 0.0, interestRate: 0.0 }, type: "com.simplytest.core.accounts.AccountFixedRate" }],
        ["00001:00003", { data: { runtime: 0.0, balance: 1000.0, boundPeriod: 0.0, interestRate: 0.0 }, type: "com.simplytest.core.accounts.AccountOnCall" }],
        ["00001:00004", { data: { remainingAmount: 0.0, creditAmount: 1000.0, payedAmount: 0.0, maxSpecialRepayment: 50.0, runtimeAmount: 0.0,
            repaymentRate: 100.0, monthlyAmount: 8333.333333333334, balance: -1000.0, boundPeriod: 0.0, interestRate: 0.0 },
        type: "com.simplytest.core.accounts.AccountRealEstate" }],
    ],
};

function setupAngular()
{
    cy.viewport(1280, 720);
    cy.mount(DialogOverviewTransferMoneyDialog, {
        declarations: [
            MainPageComponent,
            DialogOverviewSendMoneyDialog,
            DialogOverviewTransferMoneyDialog,
            TransferMoneyDialog],

        imports: [BrowserModule,
            FormsModule,
            RouterModule,
            AppRoutingModule,
            MatButtonModule,
            MatFormFieldModule,
            MatInputModule,
            HttpClientModule,
            FontAwesomeModule,
            NgbModule,
            MatDialogModule,
            BrowserAnimationsModule,
            ReactiveFormsModule,
            MatRadioModule,
            MatIconModule,
            MatTooltipModule],
        providers: [{ provide: ContractServerService, useClass: MockContractServerService },
            { provide: MatDialogRef, useValue: {} },
            { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
            { provide: MatDialog, useClass: MatDialog },
        ],
    });
}

describe("Komponententest: TransferMoneyDialog RealEstate Repayment Rate Logik", () =>
{
    it("Repayment Rate can be lower than 5%: Credit= 1000$, Rate= 10$", () =>
    {
        setupAngular();
        
        fillAngularInputFieldByDataTestID("10", "amount_input");
        cy.get("[id$=':00004-input'").click();
        cy.get("[data-testid='transfer_money_button']").should("be.enabled");
    });

    it("Repayment Rate can be lower than 5%: Credit= 1000$, Rate= 49$, Boundary Value", () =>
    {
        setupAngular();

        fillAngularInputFieldByDataTestID("49", "amount_input");
        cy.get("[id$=':00004-input'").click();
        cy.get("[data-testid='transfer_money_button']").should("be.enabled");
    });

    it("Repayment Rate can be lower than 5%: Credit= 1000$, Rate= 50$, Boundary Value", () =>
    {
        setupAngular();

        fillAngularInputFieldByDataTestID("50", "amount_input");
        cy.get("[id$=':00004-input'").click();
        cy.get("[data-testid='transfer_money_button']").should("be.enabled");
    });

    it("Repayment Rate can not be higher than 5%: Credit= 1000$, Rate= 51$, Boundary Value", () =>
    {
        setupAngular();

        fillAngularInputFieldByDataTestID("51", "amount_input");
        cy.get("[id$=':00004-input'").click();
        cy.get("[data-testid='error_label']").should("have.text", " Betrag ist nicht zulässig ");
        cy.get("[data-testid='error_label']").should("have.css", "color").and("eq", "rgb(244, 67, 54)");
        cy.get("[data-testid='transfer_money_button']").should("be.disabled");
    });

    it("Repayment Rate can not be higher than 5%: Credit= 1000$, Rate= 100$", () =>
    {
        setupAngular();

        fillAngularInputFieldByDataTestID("100", "amount_input");
        cy.get("[id$=':00004-input'").click();
        cy.get("[data-testid='error_label']").should("have.text", " Betrag ist nicht zulässig ");
        cy.get("[data-testid='error_label']").should("have.css", "color").and("eq", "rgb(244, 67, 54)");
        cy.get("[data-testid='transfer_money_button']").should("be.disabled");
    });

});
