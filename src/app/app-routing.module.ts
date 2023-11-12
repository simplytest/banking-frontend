import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { EditAddressFormComponent } from "./edit-address-form/edit-address-form.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { RegisterNewCustomerComponent } from "./register-new-customer/register-new-customer.component";

const routes: Routes = [
    { path: "", redirectTo: "/dashboard", pathMatch: "full" },
    { path: "dashboard", component: DashboardComponent },
    { path: "registerForm/:id", component: EditAddressFormComponent },
    { path: "registerNewCustomer", component: RegisterNewCustomerComponent },
    { path: "mainPage/:id", component: MainPageComponent },
    { path: "createAccount/:id", component: CreateAccountComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule
{ }
