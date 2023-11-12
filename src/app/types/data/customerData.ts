import { Address } from "../address";

export enum CustomerType
{
    Private, Business
}

export interface CustomerData
{
    firstName: string;
    lastName: string;

    password: string;

    type: string;
    address: Address;

    birthDay?: Date;
    ustNumber?: string;
    companyName?: string;
}
