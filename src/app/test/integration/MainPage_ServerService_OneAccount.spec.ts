import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { ContractServerService } from "src/app/_services/contract-server.service";
import { AppRoutingModule } from "src/app/app-routing.module";
import { MainPageComponent } from "src/app/main-page/main-page.component";

import { Contract } from "src/app/types/contract";
import MockedResultData from "../testData/customer_only_giro.json";

class ContractServerServiceMock extends ContractServerService
{
    constructor()
    {
        super(null);
    }

    getContract()
    {
        return new Observable<Contract>(subscriber =>
        {
            subscriber.next(MockedResultData as unknown as Contract);
            subscriber.complete();
        });
    }
}

describe("Integration Mainpage <-> ContractServerService", () =>
{
    let component: MainPageComponent;
    let fixture: ComponentFixture<MainPageComponent>;

    beforeEach(waitForAsync(() =>
    {
        TestBed.configureTestingModule({
            declarations: [MainPageComponent],

            imports:
            [
                BrowserModule,
                AppRoutingModule,
                HttpClientModule,
                MatDialogModule
            ],
            providers:
            [
                { provide: ContractServerService, useClass: ContractServerServiceMock }
            ],
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(MainPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Komponente wird erstellt", () =>
    {
        expect(component).toBeTruthy();
    });

    it("Daten werden korrekt angezeigt", () =>
    {

        /* Begrüßung */

        const greeting : HTMLElement = fixture.nativeElement.querySelectorAll("label[data-testid='customer_Label'");

        expect(greeting.textContent).toBe("Hallo: !" +
        "Ihre Kontonummer ist: 00001 ");

        /*  Kontodaten      */

        const id : HTMLElement = fixture.nativeElement.querySelectorAll("#0.kontoID");
        const typ : HTMLElement = fixture.nativeElement.querySelectorAll("#0.kontotyp");
        const balance : HTMLElement = fixture.nativeElement.querySelectorAll("#0.kontostand");

        expect(id.textContent).toBe(" 00001:00001 ");
        expect(typ.textContent).toBe(" Giro ");
        expect(balance.textContent).toBe(" 1000 $ ");

        /*  Kontofunktionen      */

        const delete_acc : HTMLElement = fixture.nativeElement.querySelectorAll("#0-kontoschließen");
        const send : HTMLElement = fixture.nativeElement.querySelectorAll("#0-ueberweisen");
        const transfer : HTMLElement = fixture.nativeElement.querySelectorAll("#0-transferieren");
        const recieve : HTMLElement = fixture.nativeElement.querySelectorAll("#0-empfangen");
        const edit : HTMLElement = fixture.nativeElement.querySelectorAll("#0-editieren");

        expect(delete_acc).toBeTruthy();
        expect(send).toBeTruthy();
        expect(transfer).toBeTruthy();
        expect(recieve).toBeTruthy();
        expect(edit).toBeTruthy();
    });
});
