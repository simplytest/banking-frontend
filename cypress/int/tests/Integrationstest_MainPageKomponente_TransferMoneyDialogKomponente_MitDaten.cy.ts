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
import { DialogOverviewTransferMoneyDialog, MainPageComponent } from "src/app/main-page/main-page.component";
import { AppRoutingModule } from "src/app/app-routing.module";
import { ContractServerService } from "src/app/_services/contract-server.service";
import { MockContractServerService } from "../mocks/MockContractServerService";

describe("Integrationstest: MainPagekomponente mit TransferMoneyDialogKomponente und Mockservice, Kein Geldtransfer", () =>
{
    it("Komponente wird erstellt: mit DialogSendMoneyTransfer, mit Daten vom Mockservice", () =>
    {
        cy.viewport(1280, 720);
        cy.mount(MainPageComponent, {
            declarations: [
                MainPageComponent,
                DialogOverviewTransferMoneyDialog],

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

        // Dialogbutton "Geld übertragen des Girokontos wird geklickt"
        cy.get("button[id='0-transferieren']").click();

        // Es wird überprüft, dass die Radiobuttons der "TransferDialogkomponente" vorhanden sind
        cy.get("mat-radio-button[id='00001:00002']").should("exist");
        cy.get("mat-radio-button[id='00001:00003']").should("exist");
        cy.get("mat-radio-button[id='00001:00004']").should("exist");

        cy.get("[data-testid='cancel_button']").click();

    });

});
