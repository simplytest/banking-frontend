import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Contract } from "src/app/types/contract";
import { CustomerData, } from "src/app/types/data/customerData";
import { CustomerResult } from "src/app/types/data/customerResult";
import { Result } from "src/app/types/result";
import MockedResultData from "../testData/customer_all_accountTypes.json";
import { TransferMoneyData } from "src/app/types/data/transferMoney";
import { Account, AccountType } from "src/app/types/account";
import { Interface } from "src/app/types/interface";
import { RealEstateAccountData } from "src/app/types/data/realEstateData";
import { SendMoneyData } from "src/app/types/data/sendMoney";
import { Address } from "src/app/types/address";

@Injectable({
    providedIn: "root",
})
export class MockContractServerService
{

    private mockContract: Contract = MockedResultData as unknown as Contract;

    /*  Mockdata */

    private customerDataPrivateAcc : CustomerData = {
        firstName: "Ieyasu",
        lastName: "Tokugawa",
        password: "geheimesPasswort",
        type: "CustomerType.Private",
        address: {
            street: "Pariser Straße",
            house: "17",
            zipCode: "53117",
            city: "Bonn",
            country: "Germany",
            email: "max.mustermann@example.com",
        },
        birthDay: new Date("1985-12-14"),
    };

    private loginData = {
        id: "TestAccount",
        password: "TestPasswort"
    };

    private token = "mockToken";

    private dispoLimit = {
        token: "mockToken",
        amount: "500",
    };

    private sendLimit = {
        token: "mockToken",
        amount: "100",
    };

    // Real Estate erstellen Dialog Input

    private realEstateAccountData: RealEstateAccountData = {
        amount: 100000,
        repaymentRate: 500,
    };

    private accountNumber = 123;
    private amount = 500;

    private sendMoneyData: SendMoneyData = {
        amount: 200,
        target: { iban: "DE02120300000000202051" }, // DEUTSCHE KREDITBANK BERLIN
    };

    private transferMoneyData: TransferMoneyData = {
        amount: 500,
        target: { id: "" },
    };

    private address: Address = {
        street: "Poppelsdorfer Allee",
        house: "74",
        zipCode: "53115",
        city: "Bonn",
        country: "Germany",
        email: "test@example.com",
    };

    /*      Mockfunktionen      */

    register(data: CustomerData) : Observable<Result<CustomerResult>>
    {
        const mockResult: Result<CustomerResult> = {
            result: {
                JWT: "mocked_token",
                id: 1
            },
        };
        return of(mockResult);
    }

    login(id: number, password: string) : Observable<Result<string>>
    {
        const mockResult: Result<string> = {
            result: "mocked_token",
        };
        return of(mockResult);
    }

    getContract(token: string): Observable<Contract>
    {
        const mockContract: Contract = this.mockContract;
        return of(mockContract);

    }

    changeDispoLimit(token: string, amount: number) : Observable<Result<boolean>>
    {
        const mockResult: Result<boolean> = {
            result: true,
        };
        return of(mockResult);
    }

    changeSendLimit(token: string, amount: number) : Observable<Result<boolean>>
    {
        const mockResult: Result<boolean> = {
            result: true,
        };
        return of(mockResult);
    }

    closeAccount(token: string, account: number) : Observable<Result>
    {
        const mockResult: Result<boolean> = {
            result: true,
        };
        return of(mockResult);
    }

    addAccount(token: string, _type: AccountType) : Observable <Interface<Account>>
    {
        const type = AccountType[_type];
        const mockAccount: Interface<Account> = {
            type: type,
            data: {
                balance: 1000,
                boundPeriod: 0,
                interestRate: 0,
            },
        };
        return of(mockAccount);
    }

    // Real Estate Account erstellen
    addRealEstateAccount(token: string, data: RealEstateAccountData) : Observable<Interface<Account>>
    {
        const mockAccount: Interface<Account> = {
            data: {
                balance: 100000,
                boundPeriod: 0,
                interestRate: 0,
            },
            type: "RealEstateAccount"

        };
        return of(mockAccount);
    }

    // Geld von einem fiktiven Konto von außen erhalten
    receiveMoney(token: string, account: number, amount: number) : Observable<Result>
    {

        const mockResult: Result = {
            result: true,
        };
        return of(mockResult);
    }

    // Geld nach außen an ein fiktives Konto versenden
    sendMoney(token: string, account: number, data: SendMoneyData) : Observable<Result>
    {

        const mockResult: Result = {
            result: true,
        };
        return of(mockResult);
    }

    // Geld von einem Konto auf ein anderes Konto eines Accounts transferieren
    transferMoney(token: string, account: number, data: TransferMoneyData) : Observable<Result>
    {
        const amount : number = +data.amount;
        const contractBalance : number = +this.mockContract.accounts[data.target.id as string].data.balance;

        this.mockContract.accounts[data.target.id as string].data.balance = contractBalance + amount;
        this.mockContract.accounts["00001:0000" + account as string].data.balance -= amount;

        const mockResult: Result = {
            result: true,
        };
        return of(mockResult);
    }

    // Adresse des Accounts ändern
    changeAddress(token: string, address: Address) : Observable<Result>
    {
        const mockResult: Result = {
            result: true,
        };
        return of(mockResult);
    }
}