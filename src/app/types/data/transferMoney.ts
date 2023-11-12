import { Id } from "../id";

export interface TransferMoneyData
{
    amount: number;
    target: { id: Id | string };
}