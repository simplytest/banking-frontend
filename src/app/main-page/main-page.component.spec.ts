import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MainPageComponent } from "./main-page.component";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";

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
                MatDialogModule]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(MainPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () =>
    {
        expect(component).toBeTruthy();
    });
});
