import { Telephone } from "./telephone";
import { Address } from "./address";

export interface Person{
    id: number;
    cpf: number;
    name: string;
    birthDate: Date;
    rg: string;
    telephones?: Telephone[];
    addresses?: Address[];
}