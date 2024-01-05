import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
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

function angularInputFieldHelperByDataTestID(value, identifier)
{

    const betrag = value.split("");
    for (const part of betrag)
    {
        cy.get("[data-testid='" + identifier + "']").type(part);
    }
}

describe("Integration: RealEstateRepayment, Mainpage und Transferdialogkomponente", () =>
{
    it("Repayment Rate can be lower than 5%: Credit= 1000$, Rate= 10$", () =>
    {

        cy.viewport(1280, 720);
        cy.mount(MainPageComponent, {
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
            providers: [{ provide: ContractServerService, useClass: MockContractServerService }],
        });

        cy.get("[id='0-transferieren'").click();
        cy.get("[data-testid='amount_input']").focus();
        cy.get("[data-testid='amount_input']").clear();
        angularInputFieldHelperByDataTestID("10", "amount_input");
        cy.get("[id$=':00004'").click();
        cy.get("[data-testid='transfer_money_button'").click();
        cy.get("[data-testid='close_button'").click();

        cy.get("[id='0.kontostand']").should("have.text", " 990 $ ");
        cy.get("[id='3.kontostand']").should("have.text", " -990 $ ");
    });

    it("Repayment Rate can be lower than 5%: Credit= 1000$, Rate= 49$, Boundary Value", () =>
    {

        cy.viewport(1280, 720);
        cy.mount(MainPageComponent, {
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
            providers: [{ provide: ContractServerService, useClass: MockContractServerService }],
        });

        cy.get("[id='0-transferieren'").click();
        cy.get("[data-testid='amount_input']").focus();
        cy.get("[data-testid='amount_input']").clear();
        angularInputFieldHelperByDataTestID("49", "amount_input");
        cy.get("[id$=':00004'").click();
        cy.get("[data-testid='transfer_money_button'").click();
        cy.get("[data-testid='close_button'").click();

        cy.get("[id='0.kontostand']").should("have.text", " 941 $ ");
        cy.get("[id='3.kontostand']").should("have.text", " -941 $ ");
    });

    it("Repayment Rate can be exact 5%: credit= 1000$, Rate= 50$", () =>
    {

        cy.viewport(1280, 720);
        cy.mount(MainPageComponent, {
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
            providers: [{ provide: ContractServerService, useClass: MockContractServerService }],
        });

        cy.get("[id='0-transferieren'").click();
        cy.get("[data-testid='amount_input']").focus();
        cy.get("[data-testid='amount_input']").clear();
        angularInputFieldHelperByDataTestID("50", "amount_input");
        cy.get("[id$=':00004'").click();
        cy.get("[data-testid='transfer_money_button'").click();
        cy.get("[data-testid='close_button'").click();

        cy.get("[id='0.kontostand']").should("have.text", " 891 $ ");
        cy.get("[id='3.kontostand']").should("have.text", " -891 $ ");
    });

    it("Repayment Rate can not be higher than 5%: Credit= 1000$, Rate= 51$, Boundary Value", () =>
    {

        cy.viewport(1280, 720);
        cy.mount(MainPageComponent, {
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
            providers: [{ provide: ContractServerService, useClass: MockContractServerService }],
        });

        cy.get("[id='0-transferieren'").click();
        cy.get("[data-testid='amount_input']").focus();
        cy.get("[data-testid='amount_input']").clear();
        angularInputFieldHelperByDataTestID("51", "amount_input");
        cy.get("[id$=':00004'").click();
        cy.get("[data-testid='error_label']").should("have.text", " Betrag ist nicht zulässig ");
        cy.get("[data-testid='error_label']").should("have.css", "color").and("eq", "rgb(244, 67, 54)");
        cy.get("[data-testid='transfer_money_button']").should("be.disabled");
        cy.get("[data-testid='cancel_button'").click();
        cy.get("[id='0.kontostand']").should("have.text", " 891 $ ");
        cy.get("[id='3.kontostand']").should("have.text", " -891 $ ");

    });

    it("Repayment Rate can not be higher than 5%: Credit= 1000$, Rate= 100$", () =>
    {

        cy.viewport(1280, 720);
        cy.mount(MainPageComponent, {
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
            providers: [{ provide: ContractServerService, useClass: MockContractServerService }],
        });

        cy.get("[id='0-transferieren'").click();
        cy.get("[data-testid='amount_input']").focus();
        cy.get("[data-testid='amount_input']").clear();
        angularInputFieldHelperByDataTestID("51", "amount_input");
        cy.get("[id$=':00004'").click();
        cy.get("[data-testid='error_label']").should("have.text", " Betrag ist nicht zulässig ");
        cy.get("[data-testid='error_label']").should("have.css", "color").and("eq", "rgb(244, 67, 54)");
        cy.get("[data-testid='transfer_money_button']").should("be.disabled");
        cy.get("[data-testid='cancel_button'").click();
        cy.get("[id='0.kontostand']").should("have.text", " 891 $ ");
        cy.get("[id='3.kontostand']").should("have.text", " -891 $ ");

    });
});
