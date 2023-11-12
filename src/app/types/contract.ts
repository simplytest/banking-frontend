import { Account } from "./account";
import { Customer } from "./customer";
import { Id } from "./id";
import { Interface } from "./interface";

export interface Contract
{
    id: Id;
    customer: Interface<Customer>;

    accounts:
    {
        [key: string]: Interface<Account>;
    }
}