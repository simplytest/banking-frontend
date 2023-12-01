import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ContractServerService } from "../_services/contract-server.service";
import { Contract } from "../types/contract";
import { RealEstateAccountData } from "../types/data/realEstateData";
import { AccountType } from "../types/account";

@Component({
    selector: "app-create-account",
    templateUrl: "./create-account.component.html",
    styleUrls: ["./create-account.component.css"],
})
export class CreateAccountComponent implements OnInit
{
    token: string;
    contract: Contract;

    constructor(private route: ActivatedRoute, private service: ContractServerService, private router: Router, public dialog: MatDialog)
    {
    }

    ngOnInit(): void
    {
        this.route.params.subscribe(({ id: token }) =>
        {
            this.token = token;
        });
    }

    ngAfterViewInit()
    {
        this.getContracts();
    }

    getContracts()
    {
        this.service.getContract(this.token).subscribe(contract =>
        {
            this.contract = contract;
        });
    }

    setAccountGiro()
    {
        this.service.addAccount(this.token, AccountType.GiroAccount).subscribe(() =>
        {
            this.goToMainPage();
        });
    }

    setAccountFixedRate()
    {
        this.service.addAccount(this.token, AccountType.FixedRateAccount).subscribe(() =>
        {
            this.goToMainPage();
        });
    }

    setAccountOnCall()
    {
        this.service.addAccount(this.token, AccountType.OnCallAccount).subscribe(() =>
        {
            this.goToMainPage();
        });
    }

    openDialogCreateRealEstateAccount()
    {
        const dialogRef = this.dialog.open(DialogCreateRealEstateAccountDialog, {
            data:
            {
                token: this.token,
                contract: this.contract,
            },
            panelClass: "flex-dialog",
        });

        dialogRef.afterClosed().subscribe(() =>
        {
            this.goToMainPage();
        });
    }

    goToMainPage()
    {
        this.router.navigate(["/mainPage", this.token]);
    }
}

@Component({
    selector: "dialog-create-real-estate-account-dialog",
    templateUrl: "dialog-create-real-estate-account-dialog.html",
})
export class DialogCreateRealEstateAccountDialog
{
    public realEstateData: RealEstateAccountData;

    constructor(
        public dialogRef: MatDialogRef<DialogCreateRealEstateAccountDialog>,
        @Inject(MAT_DIALOG_DATA)
        public data: { token: string, contract: Contract },
        private service: ContractServerService,
        private router: Router
    )
    {
        this.realEstateData = { amount: 0, repaymentRate: 0 };
    }

    onNoClick(): void
    {
        this.dialogRef.close();
    }

    setAccountRealEstateFinancing()
    {
        this.service.addRealEstateAccount(this.data.token, this.realEstateData).subscribe(() =>
        {
            this.dialogRef.close();
        });
    }
}
