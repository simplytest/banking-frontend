import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { CreateAccountComponent } from "./create-account.component";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { AppRoutingModule } from "../app-routing.module";

describe("CreateAccountComponent", () =>
{
    let component: CreateAccountComponent;
    let fixture: ComponentFixture<CreateAccountComponent>;

    beforeEach(waitForAsync(() =>
    {
        TestBed.configureTestingModule({
            declarations:
            [
                CreateAccountComponent,
            ],
            imports:
            [
                AppRoutingModule,
                HttpClientModule,
                MatDialogModule,
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(CreateAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Komponente wurde erstellt", () =>
    {
        expect(component).toBeTruthy();
    });
});
