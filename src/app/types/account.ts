export enum AccountType
{
    GiroAccount, FixedRateAccount, OnCallAccount, RealEstateAccount
}

export interface Account
{
    balance: number;
    boundPeriod: number;
    interestRate: number;
}