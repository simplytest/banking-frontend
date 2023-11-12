import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { EditAddressFormComponent } from "./edit-address-form/edit-address-form.component";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { ContractNotFoundDialog, DashboardComponent } from "./dashboard/dashboard.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { ChangeDispoLimitDialog, ChangeSendLimitDialog, DialogOverviewEditGiroAccountDialog, DialogOverviewReceiveMoneyDialog, DialogOverviewSendMoneyDialog, DialogOverviewTransferMoneyDialog, MainPageComponent, MoneySendDialog, ReceiveMoneyDialog, TransferMoneyDialog, TransferMoneyFalseDialog } from "./main-page/main-page.component";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CreateAccountComponent, DialogCreateRealEstateAccountDialog } from "./create-account/create-account.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatDialogModule } from "@angular/material/dialog";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { RegisterNewCustomerComponent } from "./register-new-customer/register-new-customer.component";

import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    declarations: [
        AppComponent,
        EditAddressFormComponent,
        DashboardComponent,
        MainPageComponent,
        CreateAccountComponent,
        DialogOverviewSendMoneyDialog,
        DialogOverviewTransferMoneyDialog,
        DialogOverviewReceiveMoneyDialog,
        DialogOverviewEditGiroAccountDialog,
        DialogCreateRealEstateAccountDialog,
        RegisterNewCustomerComponent,
        MoneySendDialog,
        TransferMoneyDialog,
        TransferMoneyFalseDialog,
        ReceiveMoneyDialog,
        ChangeDispoLimitDialog,
        ChangeSendLimitDialog,
        ContractNotFoundDialog,
    ],
    imports: [
        BrowserModule,
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
        MatTooltipModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule
{ }
