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
import { MockContractServerService } from "../mocks/MockContractServerService";
import { MainPageComponent, DialogOverviewSendMoneyDialog, DialogOverviewTransferMoneyDialog, DialogOverviewReceiveMoneyDialog, DialogOverviewEditGiroAccountDialog, MoneySendDialog, TransferMoneyDialog, TransferMoneyFalseDialog, ReceiveMoneyDialog } from "src/app/main-page/main-page.component";

describe("Integration: MainPagekomponente mit kompletten positivem TransferMoney Ablauf", () =>
{

    it("100 $ werden vom Girokonto auf das Festgeldkonto übertragen", () =>
    {

        cy.viewport(1280, 720);
        cy.mount(MainPageComponent, {
            declarations: [
                MainPageComponent,
                DialogOverviewSendMoneyDialog,
                DialogOverviewTransferMoneyDialog,
                DialogOverviewReceiveMoneyDialog,
                DialogOverviewEditGiroAccountDialog,
                MoneySendDialog,
                TransferMoneyDialog,
                TransferMoneyFalseDialog,
                ReceiveMoneyDialog,],

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
            providers: [{ provide: ContractServerService, useClass: MockContractServerService }]
        });

        // Dialogbutton "Transferieren des Girokontos wird geklickt"
        cy.get("button[id='0-transferieren']").click();

        // Der zu übertragende Wert = 100$ wird eingetragen
        cy.get("[data-testid='amount_input']")
            .focus()
            .should("have.value", "0")
            .clear()
            .type("100")
            .invoke("val")
            .should("eq","100")

        // Der Radiobutton für das Konto, auf welchen der Wert übertragen werden soll, wird ausgewählt.
        cy.get("mat-radio-button[id='00001:00002']").click();

        // Der Button "Geld übertragen" wird geklickt, um den Transfer zu starten.
        cy.get("[data-testid='transfer_money_button']").click();

        // Der sich öffnende Dialog "Geld übertragen!" wird geschlossen.
        cy.get("[data-testid='money_transfer_success_close']").click();

        // Es wird überprüft, dass der Wert korrekt vom Girokonto abgezogen wurde.
        cy.get("th[id='0.kontostand']").should("have.text", " 900 $ ");

        // Es wird überprüft, dass der Wert korrekt auf das Festgeldkonto übertragen wurde.
        cy.get("th[id='1.kontostand']").should("have.text", " 1100 $ ");

    });

    it("300 $ werden vom Girokonto auf das Tagesgeldkonto übertragen", () =>
    {

        cy.viewport(1280, 720);
        cy.mount(MainPageComponent, {
            declarations: [
                MainPageComponent,
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
            providers: [{ provide: ContractServerService, useClass: MockContractServerService }]
        });

        // Dialogbutton "Transferieren des Girokontos wird geklickt"
        cy.get("button[id='0-transferieren']").click();

        // Der zu übertragende Wert = 300$ wird eingetragen
        cy.get("[data-testid='amount_input']")
            .focus()
            .should("have.value", "0")
            .clear();

        cy.get("[data-testid='amount_input']")
            .focus()
            .type("300");

        cy.get("[data-testid='amount_input']")
            .focus()
            .should("have.value", "300");

        // Der Radiobutton für das Konto, auf welchen der Wert übertragen werden soll, wird ausgewählt.
        cy.get("mat-radio-button[id='00001:00003']").click();

        // Der Button "Geld übertragen" wird geklickt, um den Transfer zu starten.
        cy.get("[data-testid='transfer_money_button']").click();

        // Der sich öffnende Dialog "Geld übertragen!" wird geschlossen.
        cy.get("[data-testid='money_transfer_success_close']").click();

        // Es wird überprüft, dass der Wert korrekt vom Girokonto abgezogen wurde.
        cy.get("th[id='0.kontostand']").should("have.text", " 600 $ ");

        // Es wird überprüft, dass der Wert korrekt auf das Tagesgeldkonto übertragen wurde.
        cy.get("th[id='2.kontostand']").should("have.text", " 1300 $ ");

    });

    it("600 $ werden vom Girokonto zur Tilgung des Kredites auf das Immobilien-Finanzierungskonto übertragen", () =>
    {

        cy.viewport(1280, 720);
        cy.mount(MainPageComponent, {
            declarations: [
                MainPageComponent,
                DialogOverviewSendMoneyDialog,
                DialogOverviewTransferMoneyDialog,
                DialogOverviewReceiveMoneyDialog,
                DialogOverviewEditGiroAccountDialog,
                MoneySendDialog,
                TransferMoneyDialog,
                TransferMoneyFalseDialog,
                ReceiveMoneyDialog,],

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
            providers: [{ provide: ContractServerService, useClass: MockContractServerService }]
        });

        // Dialogbutton "Transferieren des Girokontos wird geklickt"
        cy.get("button[id='0-transferieren']").click();

        // Der zu übertragende Wert = 300$ wird eingetragen
        cy
        cy.get("[data-testid='amount_input']")
            .focus()
            .should("have.value", "0")
            .clear()
            .type("6")
            .type("0")
            .type("0")
            .invoke("val")
            .should("eq","600")

        // Der Radiobutton für das Konto, auf welchen der Wert übertragen werden soll, wird ausgewählt.
        cy.get("mat-radio-button[id='00001:00004']").click();

        // Der Button "Geld übertragen" wird geklickt, um den Transfer zu starten.
        cy.get("[data-testid='transfer_money_button']").click();

        // Der sich öffnende Dialog "Geld übertragen!" wird geschlossen.
        cy.get("[data-testid='money_transfer_success_close']").click();

        // Es wird überprüft, dass der Wert korrekt vom Girokonto abgezogen wurde.
        cy.get("th[id='0.kontostand']").should("have.text", " 0 $ ");

        // Es wird überprüft, dass der Wert korrekt auf das Immobilien-Finanzierungskonto übertragen wurde.
        cy.get("th[id='3.kontostand']").should("have.text", " -9400 $ ");

    });

});
