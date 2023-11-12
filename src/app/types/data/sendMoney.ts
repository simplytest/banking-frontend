export type Iban = string;

export interface SendMoneyData
{
    amount: number;
    target: { iban: Iban };
}