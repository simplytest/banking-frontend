import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ContractServerService } from "../_services/contract-server.service";
import { Address } from "../types/address";
import Cookies from "js-cookie";

@Component({
    selector: "app-edit-address-form",
    templateUrl: "./edit-address-form.component.html",
    styleUrls: ["./edit-address-form.component.css"],
})
export class EditAddressFormComponent implements OnInit
{
    token: string;
    address: Address;

    constructor(private router: Router, private service: ContractServerService, private route: ActivatedRoute)
    {
    }

    ngOnInit()
    {
        this.token = Cookies.get("session");
        this.getContracts();
    }

    getContracts()
    {
        this.service.getContract(this.token).subscribe(contract =>
        {
            this.address = contract.customer.data.address;
        });
    }

    async onSubmit(value: any)
    {
        const { currentAddress } = value;

        this.service.changeAddress(this.token, currentAddress).subscribe(() =>
        {
            this.goToMainPage();
        });

    }

    goToMainPage()
    {
        this.router.navigate(["/mainPage"]);
    }
}
