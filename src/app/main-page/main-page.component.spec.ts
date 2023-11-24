import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MainPageComponent } from "./main-page.component";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { ContractServerService } from "../_services/contract-server.service";

describe("MainPageComponent", () =>
{
    let component: MainPageComponent;
    let fixture: ComponentFixture<MainPageComponent>;

    beforeEach(waitForAsync(() =>
    {
        TestBed.configureTestingModule({
            declarations: [MainPageComponent],

            imports: [BrowserModule,
                AppRoutingModule,
                HttpClientModule,
                MatDialogModule,],
            providers: [ContractServerService]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(MainPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Komponente wurde erstellt", () =>
    {
        expect(component).toBeTruthy();
    });

    it("Buttons werden ohne Daten angezeigt", () =>
    {

        /*      Buttons      */

        const datenAendernButton : HTMLElement = fixture.nativeElement.querySelector("button[data-testid='kundendaten_button'");
        const vertragKuendigenButton : HTMLElement = fixture.nativeElement.querySelector("button[data-testid='kuendigen_button'");
        const dashboardButton : HTMLElement = fixture.nativeElement.querySelector("button[data-testid='dashboard_button'");
        const kontoErstellenButton : HTMLElement = fixture.nativeElement.querySelector("button[data-testid='erstellen_button'");

        expect(datenAendernButton.textContent).toEqual(" Kundendaten ändern ");
        expect(vertragKuendigenButton.textContent).toEqual(" Vertrag kündigen ");
        expect(dashboardButton.textContent).toEqual(" Zum Dashboard ");
        expect(kontoErstellenButton.textContent).toEqual(" Konto erstellen ");

    });
});
