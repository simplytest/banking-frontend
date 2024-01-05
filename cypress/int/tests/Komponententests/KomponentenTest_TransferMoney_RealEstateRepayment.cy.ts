import { HttpClientModule } from "@angular/common/http";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
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
import { MockContractServerService } from "../../mocks/MockContractServerService";
import { MainPageComponent, DialogOverviewSendMoneyDialog, DialogOverviewTransferMoneyDialog, TransferMoneyDialog } from "src/app/main-page/main-page.component";

function angularInputFieldHelperByDataTestID(value, identifier)
{
    const betrag = value.split("");
    for (const part of betrag)
    {
        cy.get("[data-testid='" + identifier + "']").type(part);
    }
}

const mockDialogData = {
    token: "mockToken",
    current: "00001:00001",
    accounts: [
        ["00001:00002", { data: { /* ... Daten für das Konto ... */ }, type: "com.simplytest.core.accounts.AccountFixedRate" }],
        ["00001:00003", { data: { /* ... Daten für ein anderes Konto ... */ }, type: "com.simplytest.core.accounts.AccountOnCall" }],
        ["00001:00004", { data: { /* ... Daten für ein anderes Konto ... */ }, type: "com.simplytest.core.accounts.AccountRealEstate" }],
    ],
};

describe("Integration: RealEstateRepayment, Mainpage und Transferdialogkomponente", () =>
{
    it("Repayment Rate can be lower than 5%: Credit= 1000$, Rate= 10$", () =>
    {

        cy.viewport(1280, 720);
        cy.mount(DialogOverviewTransferMoneyDialog, {
            declarations: [
                MainPageComponent,
                DialogOverviewSendMoneyDialog,
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
            providers: [{ provide: ContractServerService, useClass: MockContractServerService },
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
                { provide: MatDialog, useClass: MatDialog },
            ],
        });

    });
});
