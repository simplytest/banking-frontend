import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { sha512_256 } from "js-sha512";
import { Account, AccountType } from "../types/account";
import { Address } from "../types/address";
import { Contract } from "../types/contract";
import { CustomerData } from "../types/data/customerData";
import { CustomerResult } from "../types/data/customerResult";
import { RealEstateAccountData } from "../types/data/realEstateData";
import { SendMoneyData } from "../types/data/sendMoney";
import { TransferMoneyData } from "../types/data/transferMoney";
import { Interface } from "../types/interface";
import { Result } from "../types/result";

const endpoint = "http://localhost:5005/api";

@Injectable({
    providedIn: "root"
})
export class ContractServerService
{
    constructor(private http: HttpClient)
    {}

    /*
        #########################
        #   Contract-Related    #
        #########################
    */

    register(data: CustomerData)
    {
        return this.http.post<Result<CustomerResult>>(`${endpoint}/contracts`, data);
    }

    login(id: number, password: string)
    {
        return this.http.post<Result<string>>(`${endpoint}/contracts/login/${id}`, sha512_256(password));
    }

    getContract(token: string)
    {
        return this.http.get<Contract>(`${endpoint}/contracts`, { headers: { "Authorization": token } });
    }

    dismissContract(token: string)
    {
        return this.http.delete<Result<boolean>>(`${endpoint}/contracts`, { headers: { "Authorization": token } });
    }

    changeDispoLimit(token: string, amount: number)
    {
        return this.http.put<Result<boolean>>(`${endpoint}/contracts/dispo/${amount}`, null, { headers: { "Authorization": token } });
    }

    changeSendLimit(token: string, amount: number)
    {
        return this.http.put<Result<boolean>>(`${endpoint}/contracts/sendLimit/${amount}`, null, { headers: { "Authorization": token } });
    }

    closeAccount(token: string, account: number)
    {
        return this.http.delete<Result>(`${endpoint}/contracts/accounts/${account}`, { headers: { "Authorization": token } });
    }

    addAccount(token: string, _type: AccountType)
    {
        const type = AccountType[_type];
        return this.http.post<Interface<Account>>(`${endpoint}/contracts/accounts/${type}`, null, { headers: { "Authorization": token } });
    }

    addRealEstateAccount(token: string, data: RealEstateAccountData)
    {
        return this.http.post<Interface<Account>>(`${endpoint}/contracts/accounts`, data, { headers: { "Authorization": token } });
    }

    /*
        #########################
        #    Account-Related    #
        #########################
    */

    receiveMoney(token: string, account: number, amount: number)
    {
        const params = new HttpParams().set("amount", amount.toString());
        return this.http.get<Result>(`${endpoint}/accounts/${account}/receive`, { params, headers: { "Authorization": token } });
    }

    sendMoney(token: string, account: number, data: SendMoneyData)
    {
        return this.http.post<Result>(`${endpoint}/accounts/${account}/send`, data, { headers: { "Authorization": token } });
    }

    transferMoney(token: string, account: number, data: TransferMoneyData)
    {
        return this.http.post<Result>(`${endpoint}/accounts/${account}/transfer`, data, { headers: { "Authorization": token } });
    }

    /*
        #########################
        #   Customer-Related    #
        #########################
    */

    changeAddress(token: string, address: Address)
    {
        return this.http.put(`${endpoint}/customers/changeAddress`, address, { headers: { "Authorization": token } });
    }
}
