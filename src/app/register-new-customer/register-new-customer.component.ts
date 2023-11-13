import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { sha512_256 } from "js-sha512";
import { ContractServerService } from "../_services/contract-server.service";
import { CustomerData, CustomerType } from "../types/data/customerData";

@Component({
    selector: "app-register-new-customer",
    styleUrls: ["./register-new-customer.component.css"],
    templateUrl: "./register-new-customer.component.html",
})
export class RegisterNewCustomerComponent implements OnInit
{
    type: CustomerType;
    types = CustomerType;

    constructor(private router: Router, private service: ContractServerService, private route: ActivatedRoute)
    {
    }

    ngOnInit(): void
    {
        this.type = CustomerType.Private;
    }

    async onSubmit(value: any)
    {
        const { firstName, lastName, currentAddress, password } = value;
        const data: CustomerData = { firstName, lastName, password: sha512_256(password), address: currentAddress, type: CustomerType[this.type] };

        if (this.type === CustomerType.Business)
        {
            const { companyName, ustNumber } = value;

            data.ustNumber = ustNumber;
            data.companyName = companyName;
        }

        if (this.type === CustomerType.Private)
        {
            const { birthDate } = value;
            data.birthDay = birthDate;
        }

        this.service.register(data).subscribe(
            result =>
            {
                this.router.navigate(["/mainPage", result.result.JWT]);
            },
            error => alert(JSON.stringify(error.error)));
    }

    setBusinessCustomer()
    {
        this.type = CustomerType.Business;
    }

    setPrivateCustomer()
    {
        this.type = CustomerType.Private;
    }
}
