import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RegisterNewCustomerComponent } from "./register-new-customer.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserModule, By } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "../app-routing.module";

describe("RegisterNewCustomerComponent", () =>
{
    let component: RegisterNewCustomerComponent;
    let fixture: ComponentFixture<RegisterNewCustomerComponent>;

    const privateAccountLabels : string [] = [
        "Vorname",
        "Nachname",
        "Passwort",
        "Straße",
        "Hausnummer",
        "PLZ",
        "Stadt",
        "Land",
        "E-Mail",
        "Geburtstag",
        " © Smart Money GmbH 2023 "
    ];

    const businessAccountLabels : string [] = [
        "Vorname",
        "Nachname",
        "Passwort",
        "Straße",
        "Hausnummer",
        "PLZ",
        "Stadt",
        "Land",
        "E-Mail",
        "Unternehmensname",
        "Umsatzsteuernummer",
        "Jahresumsatz",
        " © Smart Money GmbH 2023 "
    ];

    beforeEach(waitForAsync(() =>
    {
        TestBed.configureTestingModule({
            declarations: [RegisterNewCustomerComponent],
            imports: [
                BrowserModule,
                FormsModule,
                AppRoutingModule,
                HttpClientModule,
                NgbModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(RegisterNewCustomerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Komponente existiert", () =>
    {
        expect(component).toBeTruthy();
    });

    it("Privatkunde ist voreingestellt", () =>
    {
        const Geburtstag : HTMLElement = fixture.nativeElement.querySelector("input[data-testid='birthday_input'");
        expect(Geburtstag).toBeTruthy();

        const Unternehmensname : HTMLElement = fixture.nativeElement.querySelector("input[data-testid='company_input'");
        expect(Unternehmensname).toBeFalsy();

        const Umsatzsteuernummer : HTMLElement = fixture.nativeElement.querySelector("input[data-testid='taxnumber_input'");
        expect(Umsatzsteuernummer).toBeFalsy();

        const Jahresumsatz : HTMLElement = fixture.nativeElement.querySelector("input[data-testid='annual_sales_input'");
        expect(Jahresumsatz).toBeFalsy();
    });

    it("Labels sind vorhanden und korrekt benamt", () =>
    {
        const ComponentLabels : HTMLElement [] = fixture.nativeElement.querySelectorAll("label");

        for (let i = 0; i < ComponentLabels.length; i++)
        {
            expect(ComponentLabels[i].textContent).toContain(privateAccountLabels[i]);
        }
    });

    it("Nach Klick auf den Button 'Business Kunde' ändern sich die Eingabefelder zum Businesskunden ", () =>
    {
        const BusinessKundeButton : HTMLElement = fixture.debugElement.query(By.css("button[data-testid='business_customer_button'")).nativeElement;
        BusinessKundeButton.dispatchEvent(new Event("click"));
        fixture.detectChanges();
        const ComponentLabels : HTMLElement [] = fixture.nativeElement.querySelectorAll("label");

        for (let i = 0; i < ComponentLabels.length; i++)
        {
            expect(ComponentLabels[i].textContent).toContain(businessAccountLabels[i]);
        }
    });

    it("Nach Klick auf den Button 'Business Kunde' ändern sich die Eingabefelder zum Businesskunden ", () =>
    {
        const BusinessKundeButton : HTMLElement = fixture.debugElement.query(By.css("button[data-testid='private_customer_button'")).nativeElement;
        BusinessKundeButton.dispatchEvent(new Event("click"));
        fixture.detectChanges();
        const ComponentLabels : HTMLElement [] = fixture.nativeElement.querySelectorAll("label");

        for (let i = 0; i < ComponentLabels.length; i++)
        {
            expect(ComponentLabels[i].textContent).toContain(privateAccountLabels[i]);
        }
    });
});
