import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CreateAccountComponent, DialogCreateRealEstateAccountDialog } from "./create-account/create-account.component";
import { ContractNotFoundDialog, DashboardComponent } from "./dashboard/dashboard.component";
import { EditAddressFormComponent } from "./edit-address-form/edit-address-form.component";
import { LangSwitchComponent } from "./lang-switch/lang-switch.component";
import { ChangeDispoLimitDialog, ChangeSendLimitDialog, DialogOverviewEditGiroAccountDialog, DialogOverviewReceiveMoneyDialog, DialogOverviewSendMoneyDialog, DialogOverviewTransferMoneyDialog, MainPageComponent, MoneySendDialog, ReceiveMoneyDialog, TransferMoneyDialog, TransferMoneyFalseDialog } from "./main-page/main-page.component";
import { RegisterNewCustomerComponent } from "./register-new-customer/register-new-customer.component";

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
        LangSwitchComponent,
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
        MatTooltipModule,
        MatSelectModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule
{ }
