import { Error } from "./error";

export interface Result<T = boolean, E = unknown>
{
    result?: T;
    error?: Error<E>;
}
