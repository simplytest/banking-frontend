import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DashboardComponent } from "./dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule, By } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";

describe("DashboardComponent", () =>
{
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(waitForAsync(() =>
    {
        TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            imports:
            [
                AppRoutingModule,
                BrowserModule,
                MatDialogModule,
                HttpClientModule,
                FormsModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Dashboard existiert", () =>
    {
        expect(component).toBeTruthy();
    });

    it("HTML Elemente werden gerendert", () =>
    {
        /*  Label   */

        const Contract_ID_Label: HTMLElement = fixture.debugElement.query(By.css("label[data-testid='contract_label']")).nativeElement;
        const Passwort_Label: HTMLElement = fixture.debugElement.query(By.css("label[data-testid='password_label']")).nativeElement;

        expect(Contract_ID_Label.textContent).toEqual("Contract ID:");
        expect(Passwort_Label.textContent).toEqual("Passwort:");

        /*  Input   */

        expect(fixture.debugElement.query(By.css("input[data-testid='contract_input']"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("input[data-testid='password_input']"))).toBeTruthy();

        /*  Buttons   */

        const Login_Label: HTMLElement = fixture.debugElement.query(By.css("button[data-testid='login_button']")).nativeElement;
        const Registrieren_Label: HTMLElement = fixture.debugElement.query(By.css("button[data-testid='register_button']")).nativeElement;

        expect(Login_Label.textContent).toEqual(" Login ");
        expect(Registrieren_Label.textContent).toEqual(" Registrieren ");
    });

    it("Inputelemente können befüllt werden", () =>
    {
        const contractID = fixture.debugElement.query(By.css("input[data-testid='contract_input']")).nativeElement;
        const passwordInput = fixture.debugElement.query(By.css("input[data-testid='password_input']")).nativeElement;

        expect(contractID.value).toBe("");
        contractID.value = "contract_id";
        contractID.dispatchEvent(new Event("input"));

        expect(passwordInput.value).toBe("");
        passwordInput.value = "password";
        passwordInput.dispatchEvent(new Event("input"));

        /* trigger detect changes */

        fixture.detectChanges();

        /* expect the changed value */

        expect(contractID.value).toBe("contract_id");
        expect(passwordInput.value).toBe("password");
    });
});
