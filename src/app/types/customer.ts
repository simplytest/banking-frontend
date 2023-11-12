import { Address } from "./address";

export interface Customer
{
    address: Address;
    customerID: number;

    lastName: string;
    firstName: string;

    monthlyFree: number;
    transactionFee: number;
}
