import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MainPageComponent } from "src/app/main-page/main-page.component";
import { AppRoutingModule } from "src/app/app-routing.module";
import { ContractServerService } from "src/app/_services/contract-server.service";

describe("MainPagekomponente Komponententest (Unittest)", () =>
{
    it("Komponente wird erstellt: ohne Dialoge, ohne Daten", () =>
    {
        cy.viewport(1280, 720);
        cy.mount(MainPageComponent, {
            declarations: [
                MainPageComponent],

            imports: [BrowserModule,
                RouterModule,
                AppRoutingModule,
                HttpClientTestingModule,
                MatDialogModule],
            providers: [ContractServerService],
        });

        /*  MainpageKomponentenElemente sind vorhanden */

        cy.get("[data-testid='kundendaten_button']").should("have.text", " Kundendaten ändern ");
        cy.get("[data-testid='kuendigen_button']").should("have.text", " Vertrag kündigen ");
        cy.get("[data-testid='dashboard_button']").should("have.text", " Abmelden ");

        cy.get("[data-testid='erstellen_button']").should("have.text", " Konto erstellen ");

        /*  Tableheader sind nicht vorhanden, da keine Daten importiert wurden  */

        cy.get("[data-testid='customer_Label'").should("not.exist");

        cy.get("[data-testid='kontoID_table_head']").should("not.exist");
        cy.get("[data-testid='kontoTyp_table_head']").should("not.exist");
        cy.get("[data-testid='kontostand_table_head']").should("not.exist");
        cy.get("[data-testid='optionen_table_head']").should("not.exist");

        /*  Dynamische Elemente der Tabelle sind nicht vorhanden, da keine Daten importiert wurden  */

        cy.get("th[id='0.kontoID']").should("not.exist");
        cy.get("th[id='1.kontoID']").should("not.exist");
        cy.get("th[id='2.kontoID']").should("not.exist");
        cy.get("th[id='3.kontoID']").should("not.exist");

        cy.get("th[id='0.kontotyp']").should("not.exist");
        cy.get("th[id='1.kontotyp']").should("not.exist");
        cy.get("th[id='2.kontotyp']").should("not.exist");
        cy.get("th[id='3.kontotyp']").should("not.exist");

        cy.get("th[id='0.kontostand']").should("not.exist");
        cy.get("th[id='1.kontostand']").should("not.exist");
        cy.get("th[id='2.kontostand']").should("not.exist");
        cy.get("th[id='3.kontostand']").should("not.exist");

        cy.get("button[id='0-kontoschließen']").should("not.exist");
        cy.get("button[id='0-ueberweisen']").should("not.exist");
        cy.get("button[id='0-transferieren']").should("not.exist");
        cy.get("button[id='0-empfangen']").should("not.exist");
        cy.get("button[id='0-editieren']").should("not.exist");

        cy.get("button[id='1-kontoschließen']").should("not.exist");
        cy.get("button[id='1-ueberweisen']").should("not.exist");
        cy.get("button[id='1-transferieren']").should("not.exist");
        cy.get("button[id='1-empfangen']").should("not.exist");
        cy.get("button[id='1-editieren']").should("not.exist");
    });
});
