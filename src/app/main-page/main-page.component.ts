import { Component, Inject, OnInit } from "@angular/core";
import { ErrorStateMatcher } from "@angular/material/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import Cookies from "js-cookie";
import { ContractServerService } from "../_services/contract-server.service";
import { Account } from "../types/account";
import { Contract } from "../types/contract";
import { SendMoneyData } from "../types/data/sendMoney";
import { TransferMoneyData } from "../types/data/transferMoney";
import { Id } from "../types/id";
import { Interface } from "../types/interface";

@Component({
    selector: "app-main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.css"],
})
export class MainPageComponent implements OnInit
{
    token: string;
    contract: Contract;

    amount: number;

    constructor(private service: ContractServerService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog)
    {
    }

    ngOnInit(): void
    {
        this.token = Cookies.get("session");
        this.getContracts();
    }

    getContracts()
    {
        this.service.getContract(this.token).subscribe(contract =>
        {
            this.contract = contract;
            this.contract.id = Id.from(this.contract.id);
        });
    }

    addAccount()
    {
        this.router.navigate(["/createAccount"]);
    }

    closeAccount(account: string)
    {
        this.service.closeAccount(this.token, Id.parse(account).child).subscribe(() =>
        {
            this.getContracts();
        });
    }

    editUserData()
    {
        this.router.navigate(["/registerForm"]);
    }

    deleteContract()
    {
        this.service.dismissContract(this.token).subscribe(() =>
        {
            this.router.navigate(["/"]);
        },
        error =>
        {
            alert(JSON.stringify(error.error));
        });
    }

    openDialogSendMoney(account: string)
    {
        const dialogRef = this.dialog.open(DialogOverviewSendMoneyDialog, {
            data:
            {
                account,
                token: this.token,
            },
            panelClass: "flex-dialog",
        });

        dialogRef.afterClosed().subscribe(() =>
        {
            this.getContracts();
        });
    }

    openDialogTransferMoney(account: string): void
    {
        const accounts = Object.entries(this.contract.accounts);
        const without_self = accounts.filter(x => x[0] !== account);

        const dialogRef = this.dialog.open(DialogOverviewTransferMoneyDialog, {
            data:
            {
                token: this.token,
                current: account,
                accounts: without_self,
            },
            panelClass: "flex-dialog",
        });

        dialogRef.afterClosed().subscribe(() =>
        {
            this.getContracts();
        });
    }

    openDialogReceiveMoney(account: string)
    {
        const dialogRef = this.dialog.open(DialogOverviewReceiveMoneyDialog, {
            data:
            {
                amount: this.amount,
                account,
                token: this.token,
            },
            panelClass: "flex-dialog",
        });

        dialogRef.afterClosed().subscribe(() =>
        {
            this.getContracts();
        });
    }

    openDialogEditGiroAccount()
    {
        const dialogRef = this.dialog.open(DialogOverviewEditGiroAccountDialog, {
            data:
            {
                token: this.token,
            },
            panelClass: "flex-dialog",
        });

        dialogRef.afterClosed().subscribe(() =>
        {
            this.getContracts();
        });
    }
}

@Component({
    selector: "dialog-overview-send-money-dialog",
    templateUrl: "dialog-overview-send-money-dialog.html",
})
export class DialogOverviewSendMoneyDialog
{
    public sendData: SendMoneyData;

    constructor(
      public dialogRef: MatDialogRef<DialogOverviewSendMoneyDialog>,
      @Inject(MAT_DIALOG_DATA)
      public data: { account: string, token: string },
      private service: ContractServerService,
      public dialog: MatDialog
    )
    {
        this.sendData = { amount: 0, target: { iban: undefined } };
    }

    onNoClick()
    {
        this.dialogRef.close();
    }

    sendMoney()
    {
        this.service.sendMoney(this.data.token, Id.parse(this.data.account).child, this.sendData).subscribe(
            () =>
            {

                this.openDialog();
                this.dialogRef.close();
            },
            error => alert(JSON.stringify(error.error))
        );
    }

    openDialog()
    {
        this.dialog.open(MoneySendDialog);
    }
}


export class TransferErrorMatcher implements ErrorStateMatcher 
{
    constructor(private dialog: DialogOverviewTransferMoneyDialog)
    {

    }

    isErrorState(): boolean 
    {
        return !this.dialog.allowed();
    }
  }
  

@Component({
    selector: "dialog-overview-transfer-money-dialog",
    templateUrl: "dialog-overview-transfer-money-dialog.html",
})
export class DialogOverviewTransferMoneyDialog
{
    public transferData: TransferMoneyData;
    public matcher: TransferErrorMatcher;

    constructor(
      public dialogRef: MatDialogRef<DialogOverviewTransferMoneyDialog>,
      @Inject(MAT_DIALOG_DATA)
      public data: { token: string, current: string, accounts: [[string, Interface<Account>]] },
      private service: ContractServerService,
      public dialog: MatDialog
    )
    {
        this.transferData = { amount: 0, target: { id: undefined } };
        this.matcher = new TransferErrorMatcher(this);
    }

    getAccount(id: string | Id)
    {
        const account = this.data.accounts.find(x => x[0] === id);
        return account?.[1]?.data;
    }

    allowed()
    {
        const { target, amount } = this.transferData;
        const account = this.getAccount(target.id);

        if (!account || !account.maxSpecialRepayment)
        {
            return true;
        }

        if (account.balance + amount > 0)
        {
            return false;
        }

        if (amount > account.maxSpecialRepayment)
        {
            return false;
        }

        return true;
    }

    onNoClick()
    {
        this.dialogRef.close();
    }

    transferMoney()
    {
        this.service.transferMoney(this.data.token, Id.parse(this.data.current).child, this.transferData).subscribe(
            () =>
            {
                this.openDialog();
                this.dialogRef.close();
            },
            error =>
            {
                this.openDialogFalse();
            });
    }

    openDialog()
    {
        this.dialog.open(TransferMoneyDialog);
    }

    openDialogFalse()
    {
        this.dialog.open(TransferMoneyFalseDialog);
    }
}

@Component({
    selector: "dialog-overview-receive-money-dialog",
    templateUrl: "dialog-overview-receive-money-dialog.html",
})
export class DialogOverviewReceiveMoneyDialog
{
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewReceiveMoneyDialog>,
      @Inject(MAT_DIALOG_DATA)
      public data: { amount: number, token: string, account: string },
      private service: ContractServerService,
      public dialog: MatDialog
    )
    {
    }

    onNoClick()
    {
        this.dialogRef.close();
    }

    receiveMoney()
    {
        this.service.receiveMoney(this.data.token, Id.parse(this.data.account).child, this.data.amount).subscribe(
            () =>
            {
                this.openDialog();
                this.dialogRef.close();
            },
            error => alert(JSON.stringify(error.error))
        );
    }

    openDialog()
    {
        this.dialog.open(ReceiveMoneyDialog);
    }
}

@Component({
    selector: "dialog-overview-edit-giro-dialog",
    templateUrl: "dialog-overview-edit-giro-dialog.html",
})
export class DialogOverviewEditGiroAccountDialog
{
    public sendLimit: number;
    public dispoLimit: number;

    constructor(
      public dialogRef: MatDialogRef<DialogOverviewEditGiroAccountDialog>,
      @Inject(MAT_DIALOG_DATA) public data: { token: string },
      private service: ContractServerService,
      public dialog: MatDialog
    )
    {
    }

    onNoClick()
    {
        this.dialogRef.close();
    }

    editDispoLimit()
    {
        this.service.changeDispoLimit(this.data.token, this.dispoLimit).subscribe(
            () =>
            {
                this.openDialogChangeDispoLimit();
            }, error => alert(JSON.stringify(error.error))
        );
    }

    openDialogChangeDispoLimit()
    {
        this.dialog.open(ChangeDispoLimitDialog);
    }

    editSendLimit()
    {
        this.service.changeSendLimit(this.data.token, this.sendLimit).subscribe(
            () =>
            {

                this.openDialogChangeSendLimit();
            },
            error => alert(JSON.stringify(error.error))
        );
    }

    openDialogChangeSendLimit()
    {
        this.dialog.open(ChangeSendLimitDialog);
    }
}

@Component({
    selector: "money-send-dialog",
    templateUrl: "money-send-dialog.html",
})
export class MoneySendDialog
{
    constructor(public dialogRef: MatDialogRef<MoneySendDialog>)
    {
    }

    onNoClick()
    {
        this.dialogRef.close();
    }
}

@Component({
    selector: "money-transfered-dialog",
    templateUrl: "money-transfered-dialog.html",
})
export class TransferMoneyDialog
{
    constructor(public dialogRef: MatDialogRef<TransferMoneyDialog>)
    {
    }

    onNoClick()
    {
        this.dialogRef.close();
    }
}

@Component({
    selector: "money-transfered-false-dialog",
    templateUrl: "money-transfered-false-dialog.html",
})
export class TransferMoneyFalseDialog
{
    constructor(public dialogRef: MatDialogRef<TransferMoneyFalseDialog>)
    {
    }

    onNoClick()
    {
        this.dialogRef.close();
    }
}

@Component({
    selector: "money-received-dialog",
    templateUrl: "money-received-dialog.html",
})
export class ReceiveMoneyDialog
{
    constructor(public dialogRef: MatDialogRef<ReceiveMoneyDialog>)
    {
    }

    onNoClick()
    {
        this.dialogRef.close();
    }

}

@Component({
    selector: "dispo-limit-changed-dialog",
    templateUrl: "dispo-limit-changed-dialog.html",
})
export class ChangeDispoLimitDialog
{
    constructor(public dialogRef: MatDialogRef<ChangeDispoLimitDialog>)
    {
    }

    onNoClick()
    {
        this.dialogRef.close();
    }

}

@Component({
    selector: "send-limit-changed-dialog",
    templateUrl: "send-limit-changed-dialog.html",
})
export class ChangeSendLimitDialog
{
    constructor(public dialogRef: MatDialogRef<ChangeSendLimitDialog>)
    {
    }

    onNoClick()
    {
        this.dialogRef.close();
    }
}
