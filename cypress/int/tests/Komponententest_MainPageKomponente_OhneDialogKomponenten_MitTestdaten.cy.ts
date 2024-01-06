import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { MatIconModule } from "@angular/material/icon";
import { MockContractServerService } from "../mocks/MockContractServerService";
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
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MainPageComponent } from "src/app/main-page/main-page.component";
import { AppRoutingModule } from "src/app/app-routing.module";
import { ContractServerService } from "src/app/_services/contract-server.service";

describe("Unittest: MainPagekomponente ohne Dialoge, mit Testdaten", () =>
{

    it("Alle Elemente der Komponente die abhängig von den Testdaten sind, werden angezeigt.", () =>
    {
        cy.viewport(1280, 720);
        cy.mount(MainPageComponent, {
            declarations: [
                MainPageComponent],

            imports: [BrowserModule,
                FormsModule,
                RouterModule,
                AppRoutingModule,
                MatButtonModule,
                MatFormFieldModule,
                MatInputModule,
                HttpClientTestingModule,
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

        /*  MainpageKomponentenElemente */

        cy.get("[data-testid='kundendaten_button']").should("have.text", " Kundendaten ändern ");
        cy.get("[data-testid='kuendigen_button']").should("have.text", " Vertrag kündigen ");
        cy.get("[data-testid='dashboard_button']").should("have.text", " Zum Dashboard ");

        cy.get("[data-testid='erstellen_button']").should("have.text", " Konto erstellen ");

        /*  Tableheader, wenn Daten vorhanden sind */

        cy.get("[data-testid='customer_Label'").should("have.text", " Hallo giro_Only!  Ihre Kundennummer ist: 00001 ");

        cy.get("[data-testid='kontoID_table_head']").should("have.text", " Konto ID ");
        cy.get("[data-testid='kontoTyp_table_head']").should("have.text", " Konto Typ ");
        cy.get("[data-testid='kontostand_table_head']").should("have.text", " Kontostand ");
        cy.get("[data-testid='optionen_table_head']").should("have.text", " Optionen ");

        /*  Dynamische Elemente anhand der Accountdaten*/

        cy.get("th[id='0.kontoID']").should("have.text", " 00001:00001 ");
        cy.get("th[id='1.kontoID']").should("have.text", " 00001:00002 ");
        cy.get("th[id='2.kontoID']").should("have.text", " 00001:00003 ");
        cy.get("th[id='3.kontoID']").should("have.text", " 00001:00004 ");

        cy.get("th[id='0.kontotyp']").should("have.text", " Giro ");
        cy.get("th[id='1.kontotyp']").should("have.text", " FixedRate ");
        cy.get("th[id='2.kontotyp']").should("have.text", " OnCall ");
        cy.get("th[id='3.kontotyp']").should("have.text", " RealEstate ");

        cy.get("th[id='0.kontostand']").should("have.text", " 1000 $ ");
        cy.get("th[id='1.kontostand']").should("have.text", " 1000 $ ");
        cy.get("th[id='2.kontostand']").should("have.text", " 1000 $ ");
        cy.get("th[id='3.kontostand']").should("have.text", " -10000 $ ");

        cy.get("button[id='0-kontoschließen']").should("exist");
        cy.get("button[id='0-ueberweisen']").should("exist");
        cy.get("button[id='0-transferieren']").should("exist");
        cy.get("button[id='0-empfangen']").should("exist");
        cy.get("button[id='0-editieren']").should("exist");

        cy.get("button[id='1-kontoschließen']").should("exist");
        cy.get("button[id='1-ueberweisen']").should("exist");
        cy.get("button[id='1-transferieren']").should("exist");
        cy.get("button[id='1-empfangen']").should("not.exist");
        cy.get("button[id='1-editieren']").should("not.exist");

    });

    it("Radiobuttons der Dialogkomponente werden nicht angezeigt.", () =>
    {
        cy.viewport(1280, 720);
        cy.mount(MainPageComponent, {
            declarations: [
                MainPageComponent],

            imports: [BrowserModule,
                RouterModule,
                AppRoutingModule,
                HttpClientModule,
                MatDialogModule],
            providers: [{ provide: ContractServerService, useClass: MockContractServerService }]
        });

        // Dialogbutton "Geld übertragen des Girokontos wird geklickt"
        cy.get("button[id='0-transferieren']").click();

        // Es wird überprüft, dass die Radiobuttons der "TransferDialogkomponente" nicht vorhanden sind
        cy.get("mat-radio-button[id='00001:00002']").should("not.exist");
        cy.get("mat-radio-button[id='00001:00003']").should("not.exist");
        cy.get("mat-radio-button[id='00001:00004']").should("not.exist");

        // Der Button "Abbrechen" wird geklickt
        cy.get("[data-testid='cancel_button']").click();

    });

});
