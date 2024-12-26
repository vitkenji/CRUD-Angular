import { Telephone } from "./telephone";
import { Address } from "cluster";

export interface Person{
    id: number;
    CPF: number;
    name: string;
    birthDate: Date;
    RG: string;
    telephones?: Telephone[];
    addresses?: Address[];
}