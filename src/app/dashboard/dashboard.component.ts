import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ContractServerService } from "../_services/contract-server.service";
import { Contract } from "../types/contract";
import Cookies from "js-cookie";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit
{
    contract: Contract;
    contractId: number;

    constructor(private router: Router, private service: ContractServerService, public dialog: MatDialog)
    {
    }

    ngOnInit()
    {
    }

    async onSubmit(value: any)
    {
        const { contractID, password } = value;

        this.service.login(contractID, password).subscribe(token =>
        {
            if (token.error)
            {
                alert(JSON.stringify(token.error));
                return;
            }

            Cookies.set("session", token.result);
            this.router.navigate(["/mainPage"]);
        },
        () =>
        {
            this.dialog.open(ContractNotFoundDialog);
        });
    }
}

@Component({
    selector: "dialog-contract-not-found",
    templateUrl: "dialog-contract-not-found.html",
})
export class ContractNotFoundDialog
{
    constructor(public dialogRef: MatDialogRef<ContractNotFoundDialog>)
    {
    }

    onNoClick(): void
    {
        this.dialogRef.close();
    }
}
